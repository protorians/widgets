import type {
  IMockupSheet,
  IStyle,
  IStyleCascadeCallable,
  IStyleCascades,
  IStyleCascadesAttaches,
  IStyleCascadesComputed,
  IStyleCascadesDeclarations,
  IStyleDeclaration,
  IStyleOptions,
  IStyleSettings,
  IStyleSupportedValue,
  IWidgetNode,
} from "./types";
import {SignalHook, StateWidget} from "./hooks";
import {WidgetException} from "./errors";
import {quadrilateral} from "./helpers";
import {Environment} from "./environment";
import {unCamelCase} from "@protorians/core";
import {RelativeUnit} from "./enums";
import {RemMetric} from "./metric";


export class WidgetStyleCascade {

  protected static _cascades: IStyleCascades = {} as IStyleCascades;
  protected static _computed: IStyleCascadesComputed = {} as IStyleCascadesComputed;
  protected static _attaches: IStyleCascadesAttaches = {} as IStyleCascadesAttaches;
  protected static declarations: IStyleCascadesDeclarations = {} as IStyleCascadesDeclarations;

  static deposit(fingerprint: string, data: string | undefined): HTMLStyleElement | null {
    if (Environment.Client) {
      const repository = this.repository(fingerprint);

      if (repository instanceof HTMLStyleElement) {
        repository.innerHTML = data || '';
        return repository;
      } else if (typeof repository === 'object') {

      } else {
        const e = document.createElement('style')
        e.setAttribute('widget:style', `collection`)
        e.setAttribute('style:fingerprint', `${fingerprint}`)
        e.innerHTML = data || '';

        this._attaches[fingerprint] = e;
        return e
      }
    }

    this._computed[fingerprint] = data || ''
    return null;
  }

  static repository(fingerprint: string): Partial<IStyleDeclaration> | HTMLStyleElement | undefined {
    if (Environment.Client) {
      return document.querySelector<HTMLStyleElement>(`[widget\\:style="collection"][style\\:fingerprint="${fingerprint}"]`) || undefined;
    }
    return this._cascades[fingerprint] ? (this._cascades[fingerprint].current || undefined) : undefined;
  }

  static repositories(): IStyleCascades | HTMLStyleElement[] {
    if (Environment.Client) {
      return [...document.querySelectorAll<HTMLStyleElement>(`[widget\\:style="collection"]`)];
    }
    return this._cascades;
  }

  static get cascades(): IStyleCascades {
    return this._cascades;
  }

  static get attaches() {
    return this._attaches;
  }

  static commit(fingerprint: string, declaration: Partial<IStyleDeclaration>): typeof this {
    this.declarations[fingerprint] = (typeof this._cascades[fingerprint]?.current !== 'undefined')
      ? {...this._cascades[fingerprint]?.current, ...(declaration || {})}
      : declaration;
    this._cascades[fingerprint] = this._cascades[fingerprint] || new SignalHook.Controller(declaration)
    this._cascades[fingerprint]?.update({...this.declarations[fingerprint]});
    return this;
  }

  static push(fingerprint?: string): typeof this {
    this.compute((_fingerprint, computed) => this.deposit(_fingerprint, computed), fingerprint, true);
    return this;
  }

  static updateProperty(fingerprint: string, property: string, value: IStyleSupportedValue, enforce: boolean = false): typeof this {
    if (this._cascades[fingerprint]) {
      this.declarations[fingerprint] = {...this._cascades[fingerprint]?.current || {}}
      this._cascades[fingerprint].update(this.declarations[fingerprint])
      this._cascades[fingerprint].current[property] = value;
      this.compute((fp, cp) => this.deposit(fp, cp), fingerprint, enforce);
    }
    return this;
  }

  static update(fingerprint: string, declaration: Partial<IStyleDeclaration>, enforce: boolean = false): typeof this {
    this._cascades[fingerprint]?.update(declaration);
    this.compute((fp, computed) => this.deposit(fp, computed), fingerprint, enforce);
    return this;
  }

  static removeProperty(fingerprint: string, properties: (keyof IStyleDeclaration)[]): typeof this {

    const cascade: Partial<IStyleDeclaration> | undefined = this._cascades[fingerprint]?.current || undefined;

    if (cascade) {
      const refactor: IStyleDeclaration = {} as IStyleDeclaration;

      Object.keys(cascade).forEach((k) => {
        if (!properties.includes(k as keyof IStyleDeclaration)) refactor[k] = cascade[k]
      })

      this._cascades[fingerprint]?.reset(refactor);
      this.declarations[fingerprint] = {}
    }

    return this;
  }

  static clear(fingerprint: string): typeof this {
    this._cascades[fingerprint]?.reset({});
    this.declarations[fingerprint] = {}
    return this;
  }

  static detach(fingerprint: string): typeof this {
    const repository = this.repository(fingerprint);
    if (Environment.Client) {
      if (repository instanceof HTMLStyleElement) {
        repository.remove();
      }
    }
    this.declarations[fingerprint] = undefined;
    this._cascades[fingerprint] = undefined;
    return this;
  }


  static sync(fingerprint: string, declaration: Partial<IStyleDeclaration>, enforce: boolean = true) {
    this.computeDeclaration(fingerprint, declaration, undefined, enforce);
    const repository = this.repository(fingerprint);

    const parsed = Object.entries(this.declarations[fingerprint] || {})
      .sort()
      .map(([key, value]) => {
        return `${this.parse(fingerprint, key, value as IStyleSupportedValue, enforce)};`
      })
    if (Environment.Client) {
      if (repository instanceof HTMLStyleElement) {
        repository.innerHTML = `.${fingerprint}{ ${parsed.join(' ')} }`;
      }
    }

    return this;
  }


  static parse(fingerprint: string, property: string, value: IStyleSupportedValue, enforce: boolean = true): string | undefined {
    property = unCamelCase(property)
    let computed: string | undefined = undefined;
    let declarations: Partial<IStyleDeclaration> = {}

    if (!value) {
    } else if (Array.isArray(value)) {

      const accumulate: string[] = []

      Object.entries(quadrilateral<string | number>(value))
        .forEach(([key, value]) => {
          declarations[`${property}-${key}`] = StyleWidget.unit(value.toString());
          accumulate[accumulate.length] = `${key}-${key}: ${declarations[`${property}-${key}`]}`
        })

      computed = accumulate.join('\n');

    } else if (value instanceof StateWidget && enforce) {
      value.effect((value) => {
        this.updateProperty(fingerprint, property, value, false)
      })
      declarations[property] = StyleWidget.unit(value.value.toString());
      computed = `${property}: ${declarations[property]}`
    } else if (property.endsWith('-x')) {
      const key = property.substring(0, property.length - 2);
      const val = StyleWidget.unit(value.toString())
      declarations[`${key}-right`] = StyleWidget.unit(val);
      declarations[`${key}-left`] = StyleWidget.unit(val);
      computed = [
        `${key}-right: ${declarations[`${key}-left`]}`,
        `${key}-left: ${declarations[`${key}-left`]}`
      ].join('\n');
    } else if (property.endsWith('-y')) {
      const key = property.substring(0, property.length - 2);
      const val = StyleWidget.unit(value.toString())
      declarations[`${key}-top`] = StyleWidget.unit(val);
      declarations[`${key}-bottom`] = StyleWidget.unit(val);
      computed = [
        `${key}-top: ${declarations[`${key}-top`]}`,
        `${key}-bottom: ${declarations[`${key}-top`]}`
      ].join('\n')
    } else {
      if (typeof value !== 'object' && typeof value !== 'function') {
        property = unCamelCase(property)
        declarations[property] = StyleWidget.unit(value.toString());
        computed = `${property}: ${declarations[property]}`
      }
    }

    if (computed) this.declarations[fingerprint] = {...this.declarations[fingerprint] || {}, ...declarations}
    return computed
  }

  static computeDeclaration(fingerprint: string, declaration: Partial<IStyleDeclaration>, callable?: IStyleCascadeCallable, enforce: boolean = true) {
    const accumulate: IStyleSupportedValue[] = []

    Object.entries(declaration)
      .forEach(([property, value]) => {
        const parsed = this.parse(fingerprint, property, value as IStyleSupportedValue, enforce);
        if (parsed) accumulate[accumulate.length] = parsed
      })

    const computed = `.${fingerprint} {${accumulate.join('; ')}}`;
    if (callable) callable(fingerprint, computed)
    return computed;
  }

  static computeCascade(cascades: IStyleCascades, callable?: IStyleCascadeCallable, enforce: boolean = true) {

    return Object.entries(cascades)
      .map(([_fingerprint, _declaration]) => {
        if (!_declaration || !_declaration.current) return '';
        return this.computeDeclaration(_fingerprint, _declaration.current, callable, enforce);
      })
  }

  static compute(callable?: IStyleCascadeCallable, fingerprint?: string, enforce: boolean = true): string[] {
    let cascades: IStyleCascades = {};

    if (fingerprint) cascades[fingerprint] = this._cascades[fingerprint];
    else cascades = this._cascades;

    return this.computeCascade(cascades, callable, enforce);
  }
}

export class StyleWidget implements IStyle {

  protected _fingerprint: string | undefined

  get fingerprint(): string | undefined {
    return this._fingerprint;
  }

  get options(): IStyleOptions {
    return this._options || ({
      attach: true,
    } as IStyleOptions)
  }

  get declaration(): Partial<IStyleDeclaration> {
    if (this._fingerprint) return WidgetStyleCascade.cascades[this._fingerprint]?.current || this._declaration
    return this._declaration;
  }

  static settings: IStyleSettings = {
    bytes: 4,
    unit: RelativeUnit.Rem,
    spacing: 4,
    corner: 0,
  };

  static unit(value: string | number): string {
    const check = (/^-?\d+(\.\d+)?$/).test(value.toString());

    if (check) {
      return RemMetric.parse(`${parseFloat(value.toString())}${this.settings.unit}`);
    } else return RemMetric.parse(value.toString())
  }

  protected _declaration: Partial<IStyleDeclaration>;

  constructor(
    _declaration: Partial<IStyleDeclaration>,
    protected _options?: IStyleOptions,
  ) {
    const declaration = {} as Partial<IStyleDeclaration>;
    for (const key in _declaration) declaration[unCamelCase(key)] = _declaration[key];
    this._declaration = declaration;
  }

  remove(properties: (keyof IStyleDeclaration)[]): this {
    if (!this._fingerprint) throw ((new WidgetException(`No widget fingerprints linked`)).show()).show()
    else WidgetStyleCascade.removeProperty(this._fingerprint, properties)
    return this;
  }

  clear(): this {
    if (!this._fingerprint) throw (new WidgetException(`No widget fingerprints linked`)).show()
    else WidgetStyleCascade.clear(this._fingerprint)
    return this;
  }

  detach() {
    if (!this._fingerprint) throw (new WidgetException(`No widget fingerprints linked`)).show()
    else WidgetStyleCascade.detach(this._fingerprint)
  }

  upgrade(): this {
    if (!this._fingerprint) throw (new WidgetException(`No widget fingerprints linked`)).show()
    else WidgetStyleCascade.update(this._fingerprint, this._declaration)
    return this;
  }

  update(property: keyof IStyleDeclaration, value: IStyleSupportedValue): this {
    this._declaration[property] = value;
    this.upgrade();
    return this;
  }

  merge(style: IStyle, enforce: boolean = false): this {
    if (!this._fingerprint) throw (new WidgetException(`No widget fingerprints linked`)).show();
    WidgetStyleCascade.sync(this._fingerprint, {...this.declaration, ...style.declaration}, enforce)
    return this;
  }

  bind(widget: IWidgetNode<any, any>): Partial<IStyleDeclaration> | HTMLStyleElement | undefined {
    this._fingerprint = widget.fingerprint;

    WidgetStyleCascade
      .commit(this._fingerprint, this._declaration)
      .push(this._fingerprint)

    const fingerprint = this._fingerprint
    const cascade = WidgetStyleCascade.cascades[this._fingerprint]
    const blender = (enforce: boolean) => {

      if (this.options.attach) {
        const attached: HTMLStyleElement | undefined = WidgetStyleCascade.attaches[fingerprint] || undefined;

        if (Environment.Client) {
          if (attached instanceof HTMLStyleElement) {
            document.head.append(attached);
            (widget.element as HTMLElement).classList.add(fingerprint)
            return attached;
          }
        }
      }

      if (!this.options.attach && WidgetStyleCascade.cascades[fingerprint] && enforce) {
        WidgetStyleCascade.cascades[fingerprint]?.effect(({name, value}) => {
          (widget.element as IMockupSheet<any>).style[name] = value;
        })
      }

      return WidgetStyleCascade.cascades[fingerprint]?.current || undefined;
    }

    cascade?.effect(({name, value}) => {
      value = StyleWidget.allowValue(value)

      if (value) {
        const updating = {};
        updating[name] = value;
        // WidgetStyleCascade.sync(fingerprint, updating, false)
      }
    })

    return blender(true);
  }

  static allowValue(value: IStyleSupportedValue) {
    return (typeof value !== 'object' && typeof value !== 'function') ? value : undefined;
  }

}

export function Style(declaration: Partial<IStyleDeclaration>) {
  return new StyleWidget(declaration)
}