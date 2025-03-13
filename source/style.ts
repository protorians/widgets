import type {
    IStyleOptions,
    IStyleSettings,
    IStyleSheet,
    IStyleSheetDeclarations, IWidgetNode,
} from "./types/index.js";
import {RelativeUnit} from "./enums.js";
import {RemMetric} from "./metric.js";
import {Environment, unCamelCase} from "@protorians/core";


export class StyleWidget implements IStyleSheet {

    static settings: IStyleSettings = {
        bytes: 4,
        unit: RelativeUnit.Rem,
        spacing: 4,
        corner: 0,
    };

    protected _repository: HTMLStyleElement | undefined = undefined;
    protected _rules: string[] = [];
    protected _selector: string = ':root';
    protected locked: boolean = false;

    public declarations: IStyleSheetDeclarations = {} as IStyleSheetDeclarations;

    static unit(value: string | number): string {
        // const check = (/^-?\d+(\.\d+)?$/).test(value.toString());

        if (typeof value == 'number') {
            return RemMetric.parse(`${parseFloat(value.toString())}${this.settings.unit}`);
        } else return (value.toString())
    }

    constructor(public readonly options: IStyleOptions = {} as IStyleOptions) {
        this.locked = options.lock || false;
    }

    get status(): boolean {
        return this.locked;
    }

    set status(value: boolean) {
        this.locked = value;
        this.sync()
    }

    get repository(): HTMLStyleElement | undefined {
        if (Environment.Client) {
            this._repository = this._repository || document.createElement('style');
            this._repository.setAttribute('widget:stylesheet', this._selector || 'common');
            document.head.append(this._repository);
            return this._repository;
        }
        return undefined;
    }

    get rules(): string {
        return this._rules.join("\n");
    }

    get selector(): string {
        return this._selector;
    }

    clear(): this {
        this._rules = [];
        this.declarations = {};
        return this;
    }

    parseProperty(key: string, value: string | number): string {
        const accumulate: string[] = []
        key = unCamelCase(key);
        value = StyleWidget.unit(value);

        if (key.endsWith('-x')) {
            key = key.substring(0, key.length - 2)
            accumulate.push(`${key}-left:${value}`);
            accumulate.push(`${key}-right:${value}`);
        } else if (key.endsWith('-y')) {
            key = key.substring(0, key.length - 2)
            accumulate.push(`${key}-top:${value}`);
            accumulate.push(`${key}-bottom:${value}`);
        } else {
            accumulate.push(`${key}:${value}`);
        }

        return accumulate.join(';');
    }

    parse(declaration: IStyleSheetDeclarations | IStyleSheet | undefined, selector?: string): string | undefined {

        if (!declaration) return;

        else if ((declaration instanceof StyleWidget)) {
            this.parse(declaration.declarations, selector);
        } else if (typeof declaration == 'object') {

            const cumulate = Object.entries(declaration)
                .map(([key, tree]) =>
                    this.parse(tree as IStyleSheetDeclarations, key))

            selector = typeof selector != 'undefined'
                ? `${selector.replace(/&/gi, this._selector)}`
                : this._selector;

            this._rules.push(`${selector}{${cumulate.join(';')}}`)

        } else if (selector) {
            return `${this.parseProperty(selector, declaration)}`
        }


        return undefined
    }

    merge(declarations: IStyleSheetDeclarations | IStyleSheet | undefined): this {
        this.declarations = {
            ...this.declarations,
            ...(
                (declarations instanceof StyleWidget)
                    ? declarations.declarations
                    : declarations || {}

            )
        }
        return this;
    }

    sync(declarations?: IStyleSheetDeclarations): this {
        if (this.locked) return this;

        this._rules = [];

        const merged = this.merge(declarations || {}).declarations;
        this.parse(merged as IStyleSheetDeclarations, undefined)

        if (this.repository && (this.options.attach === true || typeof this.options.attach === 'undefined')) {
            this.repository.innerHTML = this._rules.join("\n");
        }
        return this;
    }

    bind(widget: IWidgetNode<any, any>): this {
        this._selector = `.${widget.fingerprint}`;
        this.locked = true;

        widget.className(widget.fingerprint);
        widget.signal.listen('mount', () => {
            this.locked = false;
            this.sync();
        })

        return this.merge(widget.props.style).sync();
    }

    remove<K extends keyof IStyleSheetDeclarations>(key: K | K[]): this {
        (!Array.isArray(key) ? `${key}`.split(' ') : key as (keyof IStyleSheetDeclarations)[])
            .forEach(k => this.declarations[k] = undefined)
        return this.sync();
    }

    update<K extends keyof IStyleSheetDeclarations>(key: K, value: IStyleSheetDeclarations[K]): this {
        this.declarations[key] = value;
        return this.sync();
    }
}


export function Style(declaration: IStyleSheetDeclarations) {
    return new StyleWidget({
        attach: true,
    }).merge(declaration)
}