import type {
  IAttributes,
  ICallable,
  IChildren,
  IChildrenSupported,
  IContext,
  IGlobalAttributes,
  IGlobalEventMap,
  IGlobalEventPayload,
  IMockup,
  IMockupElement,
  IMockupMeasure,
  INativeProperties,
  IPrimitive,
  IPropStack,
  IRef, IRuntime,
  ISignalStack,
  IStateStack,
  IStringToken,
  IStyle,
  IStyleDeclaration,
  IWidgetNode,
  IWidgetDeclaration, ISignalableMap,
} from "./types";
import {MetricRandom} from "@protorians/core";
import {Mockup} from "./mockup";
import {ToggleOption, WidgetsNativeProperty} from "./enums";
import {SignalHook} from "./hooks";
import {Widgets} from "./widgets";
import {Environment} from "./environment";


export const WidgetNativeProperties = Object.values(WidgetsNativeProperty)

export class ContextWidget<P extends IPropStack, S extends IStateStack> implements IContext<P, S> {

  public root: IWidgetNode<any, any> | undefined;
  public props: P
  public state: S
  public runtime: IRuntime<any, any> | undefined

  constructor(
    public readonly widget: IWidgetNode<any, any>,
    props?: P,
    state?: S,
  ) {
    this.props = props || {} as P
    this.state = state || {} as S
  }

}

export class WidgetNode<E extends HTMLElement, A extends IAttributes> implements IWidgetNode<E, A> {

  protected _fingerprint: string;
  protected _mockup: IMockup<E, A>;
  protected _reference: IRef<E, A> | undefined;
  protected _tag: string = 'div';
  protected _attributes: A = {} as A;
  protected _props: INativeProperties<E, A> = {} as INativeProperties<E, A>;
  protected _signal: ISignalStack<ISignalableMap<E, A>>;
  protected _locked: boolean = false;
  protected _context: IContext<any, any> | undefined = undefined;

  constructor(declaration: IWidgetDeclaration<E, A>) {
    this.extractProperties(declaration);
    this._mockup = new Mockup.Morphic(
      this.tag,
      this._props.children,
      this._attributes,
    )
    this._fingerprint = `${MetricRandom.CreateAlpha(6).join('')}-${MetricRandom.Create(10).join('')}`;
    this._signal = new SignalHook.Stack;
  }

  static get style(): IStyle | undefined {
    return undefined;
  }

  static get attributes(): IAttributes | undefined {
    return undefined;
  }

  static get children(): IWidgetNode<any, any> | undefined {
    return undefined
  }

  static mount<E extends HTMLElement, A extends IAttributes>(
    widget: IWidgetNode<E, A>
  ): IWidgetNode<E, A> | void | undefined {
    return widget
  }

  static unmount<E extends HTMLElement, A extends IAttributes>(
    widget: IWidgetNode<E, A>
  ): IWidgetNode<E, A> | void | undefined {
    return widget
  }

  get tag(): string {
    return this._tag;
  }

  get fingerprint(): string {
    return this._fingerprint;
  }

  get mockup(): IMockup<E, A> | undefined {
    return this._mockup;
  }

  get element(): IMockupElement<E, A> | undefined {
    return this._mockup.instance;
  }

  get children(): IChildren<IChildrenSupported> {
    return this._props.children;
  }

  get attributes(): A {
    return this._attributes;
  }

  get props(): INativeProperties<E, A> {
    return this._props;
  }

  get datasets(): IGlobalAttributes {
    return this._mockup.dataset;
  }

  get reference(): IRef<E, A> | undefined {
    return this._reference || undefined;
  }

  get locked(): boolean {
    return this._locked
  }

  set locked(value: boolean) {
    this._locked = value;
  }

  get signal(): ISignalStack<ISignalableMap<E, A>> {
    return this._signal;
  }

  get measure(): IMockupMeasure {
    return this._mockup.measure;
  }

  get stylesheet(): IStyle | undefined {
    return this._props.style;
  }

  get context(): IContext<any, any> | undefined {
    return this._context;
  }

  useContext(context?: IContext<any, any>): this {
    this._context = context;
    // this._context = this._context || context;
    return this;
  }

  construct(callback: ICallable<E, A, undefined>): this {
    this.context?.runtime?.construct(this, callback);
    return this;
  }

  mount(callback: ICallable<E, A, undefined>): this {
    this.context?.runtime?.mount(this, callback);
    return this;
  }

  unmount(callback: ICallable<E, A, undefined>): this {
    this.context?.runtime?.unmount(this, callback);
    return this;
  }

  before(callback: ICallable<E, A, undefined>): this {
    this.context?.runtime?.before(this, callback);
    return this;
  }

  after(callback: ICallable<E, A, undefined>): this {
    this.context?.runtime?.after(this, callback);
    return this;
  }

  clear(): this {
    this.context?.runtime?.clear(this);
    return this;
  }

  remove(): this {
    this.context?.runtime?.remove(this);
    return this;
  }

  enable(): this {
    this.context?.runtime?.enable(this);
    return this;
  }

  disable(): this {
    this.context?.runtime?.disable(this);
    return this;
  }

  lock(): this {
    this.context?.runtime?.lock(this);
    return this;
  }

  unlock(): this {
    this.context?.runtime?.unlock(this);
    return this;
  }

  trigger(type: keyof IGlobalEventMap): this {
    this.context?.runtime?.trigger(this, type);
    return this;
  }

  stase(state: boolean): this{
    this.context?.runtime?.stase(this, state)
    return this;
  }

  computedStyle(token: keyof IStyleDeclaration): string | undefined {
    return this.context?.runtime?.computedStyle(this, token);
  }

  hide(): this {
    console.log('Hide', this)
    this.context?.runtime?.hide(this);
    return this;
  }

  show(): this {
    this.context?.runtime?.show(this);
    return this;
  }

  toggle(option?: ToggleOption): this {
    this.context?.runtime?.toggle(this, option);
    return this
  }

  data(dataset: IGlobalAttributes): this {
    this.context?.runtime?.data(this, dataset);
    return this;
  }

  attribute(attributes: Partial<A>): this {
    this.context?.runtime?.attribute(this, attributes);
    return this;
  }

  attributeLess(attributes: IGlobalAttributes): this {
    this.context?.runtime?.attributeLess(this, attributes);
    return this;
  }

  style(declaration: Partial<IStyleDeclaration>): this {
    this.context?.runtime?.style(this, declaration);
    return this;
  }

  className(token: IStringToken): this {
    this.context?.runtime?.className(this, token);
    return this;
  }

  value(data: IPrimitive): this {
    this.context?.runtime?.value(this, data);
    return this;
  }

  html(data: string): this {
    this.context?.runtime?.html(this, data);
    return this;
  }

  content(children: IChildren<IChildrenSupported>): this {
    this.context?.runtime?.content(this, children);
    return this;
  }

  listen<T extends keyof IGlobalEventMap>(
    type: T,
    callback: ICallable<E, A, IGlobalEventPayload<T>>,
    options: boolean | AddEventListenerOptions = false,
  ): this {
    this.context?.runtime?.listen(this, type, callback, options);
    return this;
  }

  on<T extends keyof IGlobalEventMap>(type: T, callback: ICallable<E, A, IGlobalEventPayload<T>> | null): this {
    this.context?.runtime?.on(this, type, callback)
    return this;
  }

  protected extractProperties(properties: IWidgetDeclaration<E, A>): this {
    properties = properties || this._props || {};

    const _attributes = {} as A;
    const _props: INativeProperties<E, A> = {} as INativeProperties<E, A>;

    properties.children = properties.children || (this.constructor as typeof WidgetNode<E, A>).children;

    Object.keys(properties)
      .forEach((key) => {
        if (!(WidgetNativeProperties as string[]).includes(key)) _attributes[key] = properties[key];
        else _props[key] = properties[key];
      })

    this._attributes = {...((this.constructor as typeof WidgetNode<E, A>).attributes || {}), ..._attributes};
    this._props = _props;
    return this;
  }

}

export function WidgetBuilder<E extends HTMLElement, A extends IAttributes, P extends IPropStack, S extends IStateStack>(
  widget: IWidgetNode<E, A>,
  context: IContext<P, S>,
): string | E | undefined {
  const runtime = ((Environment.Client) ? Widgets.Runtime.client(widget) : Widgets.Runtime.server(widget));
  context.runtime = runtime;
  return runtime.render<P, S>(widget, context);
}