declare module '@protorians/widgets/facades/button' {
  import type { IWidgetProps, IButtonProps } from '@protorians/widgets/types/index';
  import { ButtonWidget } from "@protorians/widgets/supports/index";
  export function buttonWidget(props: string | IWidgetProps<IButtonProps, HTMLButtonElement>): ButtonWidget;

}
declare module '@protorians/widgets/facades/custom' {
  import type { IWidgetProps, IProps, IWidgetElements } from '@protorians/widgets/types/index';
  import { Widget } from '@protorians/widgets/supports/index';
  export function customWidget<P extends IProps, E extends IWidgetElements>(props: IWidgetProps<P, E>): Widget<P, E>;

}
declare module '@protorians/widgets/facades/elements' {
  import { IProps, IWidget, IWidgetElements } from '@protorians/widgets/types/index';
  import { WidgetElementMetrics } from '@protorians/widgets/foundation/index';
  export function getMetrics<P extends IProps, E extends IWidgetElements>(widget: IWidget<P, E>): WidgetElementMetrics<P, E>;

}
declare module '@protorians/widgets/facades/index' {
  export * from "@protorians/widgets/facades/widget";
  export * from "@protorians/widgets/facades/text";
  export * from "@protorians/widgets/facades/custom";
  export * from "@protorians/widgets/facades/button";
  export * from "@protorians/widgets/facades/ref";
  export * from "@protorians/widgets/facades/state";

}
declare module '@protorians/widgets/facades/ref' {
  import { ReferenceWidget } from '@protorians/widgets/foundation/index';
  import type { IProps, IWidgetElements } from '@protorians/widgets/types/index';
  export function takeRef<P extends IProps, E extends IWidgetElements>(): ReferenceWidget<P, E>;

}
declare module '@protorians/widgets/facades/state' {
  import { ISupportableValue } from '@protorians/widgets/types/index';
  import { WidgetState } from '@protorians/widgets/foundation/index';
  export function takeState<S extends ISupportableValue>(initial: S): WidgetState<S>;

}
declare module '@protorians/widgets/facades/text' {
  import type { ICommonProps, IWidgetProps } from '@protorians/widgets/types/index';
  import { TextWidget } from '@protorians/widgets/supports/index';
  export function textWidget(props: string | IWidgetProps<ICommonProps, HTMLSpanElement>): TextWidget;

}
declare module '@protorians/widgets/facades/widget' {
  import type { ICommonProps, IWidgetProps } from '@protorians/widgets/types/index';
  import { Widget } from '@protorians/widgets/supports/index';
  export function widget(props: IWidgetProps<ICommonProps, HTMLElement>): Widget<ICommonProps, HTMLElement>;

}
declare module '@protorians/widgets/foundation/component' {
  import type { IComponent, IComponentConstruct, IObject, IProps, IWidget, IWidgetElements } from '@protorians/widgets/types/index';
  export class WidgetComponent<P extends IObject> implements IComponent<P> {
      #private;
      constructor(props: P);
      get props(): P | undefined;
      set widget(widget: IWidget<IProps, IWidgetElements>);
      get widget(): (IWidget<IProps, IWidgetElements>) | undefined;
  }
  export function component<Props extends IObject>(component: IComponentConstruct<Props>): (props: Props) => IWidget<IProps, IWidgetElements>;

}
declare module '@protorians/widgets/foundation/constants' {
  export const WIDGET_NATIVE_PROPS: string[];

}
declare module '@protorians/widgets/foundation/context' {
  import type { IContext, IContextuable, IProps, IWidgetElements } from '@protorians/widgets/types/index';
  export function createContext<P extends IProps, E extends IWidgetElements>(context: IContextuable<P, E>): Partial<IContext<P, E>>;

}
declare module '@protorians/widgets/foundation/elements' {
  import { IComponentConstruct, IElement, IElementMetrics, IElementSignal, IObject, IProps, IWidget, IWidgetElements } from '@protorians/widgets/types/index';
  import { ISignalables } from '@protorians/signalable/types';
  export class WidgetElement<Props extends IObject> extends HTMLElement implements IElement<Props> {
      #private;
      use: IComponentConstruct<Props> | undefined;
      constructor();
      get props(): Props;
      get component(): IComponentConstruct<Props> | undefined;
      get signal(): Readonly<ISignalables<Props, IElementSignal<Props>>>;
      mounted(): void;
      unmounted(): void;
      adopted(): void;
      initialize(): this;
      sync(): this;
      mount(component: IComponentConstruct<Props>): this;
      connectedCallback(): void;
      disconnectedCallback(): void;
      adoptedCallback(): void;
  }
  export class WidgetElementMetrics<P extends IProps, E extends IWidgetElements> implements IElementMetrics<P, E> {
      widget: Readonly<IWidget<P, E>>;
      width?: Readonly<number>;
      height?: Readonly<number>;
      x?: Readonly<number>;
      y?: Readonly<number>;
      top?: Readonly<number>;
      right?: Readonly<number>;
      bottom?: Readonly<number>;
      left?: Readonly<number>;
      json?: Readonly<string>;
      constructor(widget: Readonly<IWidget<P, E>>);
  }

}
declare module '@protorians/widgets/foundation/index' {
  export * from '@protorians/widgets/foundation/context';
  export * from '@protorians/widgets/foundation/component';
  export * from '@protorians/widgets/foundation/register';
  export * from '@protorians/widgets/foundation/state';
  export * from '@protorians/widgets/foundation/pointer';
  export * from '@protorians/widgets/foundation/elements';
  export * from '@protorians/widgets/foundation/constants';
  export * from '@protorians/widgets/foundation/refs';

}
declare module '@protorians/widgets/foundation/pointer' {
  import { IChildCallback, IPointer, IPointerRendering, IPointerSignals, IProps, IWidget, IWidgetElements } from '@protorians/widgets/types/index';
  import { type ISignalables } from '@protorians/signalable';
  export class PointerWidget<P extends IProps, E extends IWidgetElements> implements IPointer<P, E> {
      #private;
      callback: IChildCallback<P, E> | undefined;
      constructor(callback: IChildCallback<P, E> | undefined);
      get parent(): IWidget<IProps, IWidgetElements> | undefined;
      get marker(): IPointerRendering;
      get signal(): Readonly<ISignalables<IChildCallback<P, E> | undefined, IPointerSignals<P, E>>>;
      call(): string | number | true | object | undefined;
      use(callback: IChildCallback<P, E>): this;
      render(): IPointerRendering;
      refresh(): this;
      destroy(): this;
      bind(widget: IWidget<IProps, IWidgetElements>): this;
  }

}
declare module '@protorians/widgets/foundation/refs' {
  import { IProps, IReference, IWidget, IWidgetElements } from '@protorians/widgets/types/index';
  import { WidgetElementMetrics } from '@protorians/widgets/foundation/elements';
  export class ReferenceWidget<P extends IProps, E extends IWidgetElements> implements IReference<P, E> {
      #private;
      get widget(): IWidget<P, E> | undefined;
      use(widget: IWidget<P, E>): this;
      metrics(): WidgetElementMetrics<P, E> | undefined;
  }

}
declare module '@protorians/widgets/foundation/register' {
  import type { IComponentConstruct, IObject } from '@protorians/widgets/types/index';
  export function register<Props extends IObject>(name: string, component: IComponentConstruct<Props>): IComponentConstruct<Props>;

}
declare module '@protorians/widgets/foundation/state' {
  import type { IState, ISupportableValue, IChildCallback, IProps, IWidgetElements, IStateSignals, IPointer } from '@protorians/widgets/types/index';
  import { PointerWidget } from '@protorians/widgets/foundation/pointer';
  import { type ISignalables } from '@protorians/signalable';
  export class WidgetState<V extends ISupportableValue> implements IState<V> {
      #private;
      constructor(value?: V);
      get value(): V | undefined;
      get initial(): V | undefined;
      get signal(): Readonly<ISignalables<V | undefined, IStateSignals<V>>>;
      get pointers(): IPointer<any, any>[];
      updatePointers(): this;
      set(value: V): this;
      unset(): this;
      use<P extends IProps, E extends IWidgetElements>(callback: IChildCallback<P, E>): PointerWidget<P, E>;
      increment(value?: number): this;
      decrement(value?: number): this;
      multiply(value?: number): this;
      divide(value?: number): this;
  }

}
declare module '@protorians/widgets/index' {
  export * from "@protorians/widgets/types/index";
  export * from "@protorians/widgets/supports/index";
  export * from "@protorians/widgets/facades/index";
  export * from "@protorians/widgets/foundation/index";

}
declare module '@protorians/widgets/supports/anchor' {
  import type { IAnchorProps, IWidget } from '@protorians/widgets/types/index';
  import { Widget } from '@protorians/widgets/supports/widget';
  export class AnchorWidget extends Widget<IAnchorProps, HTMLAnchorElement> implements IWidget<IAnchorProps, HTMLAnchorElement> {
      get tag(): string;
  }

}
declare module '@protorians/widgets/supports/button' {
  import type { IButtonProps, IWidget } from "@protorians/widgets/types/index";
  import { Widget } from "@protorians/widgets/supports/widget";
  export class ButtonWidget extends Widget<IButtonProps, HTMLButtonElement> implements IWidget<IButtonProps, HTMLButtonElement> {
      get tag(): string;
  }

}
declare module '@protorians/widgets/supports/form' {
  import type { IFormProps, IWidget } from '@protorians/widgets/types/index';
  import { Widget } from '@protorians/widgets/supports/widget';
  export class FormWidget extends Widget<IFormProps, HTMLFormElement> implements IWidget<IFormProps, HTMLFormElement> {
      get tag(): string;
  }

}
declare module '@protorians/widgets/supports/iframe' {
  import { IIFrameProps, IWidget } from '@protorians/widgets/types/index';
  import { Widget } from '@protorians/widgets/supports/widget';
  export class IFrameWidget extends Widget<IIFrameProps, HTMLIFrameElement> implements IWidget<IIFrameProps, HTMLIFrameElement> {
      get tag(): string;
  }

}
declare module '@protorians/widgets/supports/index' {
  export * from '@protorians/widgets/foundation/context';
  export * from '@protorians/widgets/supports/form';
  export * from '@protorians/widgets/supports/iframe';
  export * from '@protorians/widgets/supports/input';
  export * from '@protorians/widgets/supports/picture';
  export * from '@protorians/widgets/supports/select';
  export * from '@protorians/widgets/supports/table';
  export * from '@protorians/widgets/supports/text';
  export * from '@protorians/widgets/supports/textarea';
  export * from '@protorians/widgets/supports/widget';
  export * from '@protorians/widgets/supports/anchor';
  export * from '@protorians/widgets/supports/button';

}
declare module '@protorians/widgets/supports/input' {
  import type { IInputableProps, IWidget } from '@protorians/widgets/types/index';
  import { Widget } from '@protorians/widgets/supports/widget';
  export class InputWidget extends Widget<IInputableProps, HTMLInputElement> implements IWidget<IInputableProps, HTMLInputElement> {
      get tag(): string;
  }

}
declare module '@protorians/widgets/supports/picture' {
  import type { IPictureProps, IPictureSourceProps, IWidget } from '@protorians/widgets/types/index';
  import { Widget } from '@protorians/widgets/supports/widget';
  export class PictureSourceWidget extends Widget<IPictureSourceProps, HTMLSourceElement> implements IWidget<IPictureSourceProps, HTMLSourceElement> {
      get tag(): string;
  }
  export default class PictureWidget extends Widget<IPictureProps, HTMLSourceElement> implements IWidget<IPictureProps, HTMLSourceElement> {
      get tag(): string;
  }

}
declare module '@protorians/widgets/supports/select' {
  import type { IOptionGroupProps, IOptionProps, ISelectProps, IWidget } from '@protorians/widgets/types/index';
  import { Widget } from '@protorians/widgets/supports/widget';
  export class OptionGroupWidget extends Widget<IOptionGroupProps, HTMLOptGroupElement> implements IWidget<IOptionGroupProps, HTMLOptGroupElement> {
      get tag(): string;
  }
  export class OptionWidget extends Widget<IOptionProps, HTMLOptionElement> implements IWidget<IOptionProps, HTMLOptionElement> {
      get tag(): string;
  }
  export class SelectWidget extends Widget<ISelectProps, HTMLSelectElement> implements IWidget<ISelectProps, HTMLSelectElement> {
      get tag(): string;
  }

}
declare module '@protorians/widgets/supports/table' {
  import type { ICommonProps, IWidget } from '@protorians/widgets/types/index';
  import { Widget } from '@protorians/widgets/supports/widget';
  export class TableCaptionWidget extends Widget<ICommonProps, HTMLTableCaptionElement> implements IWidget<ICommonProps, HTMLTableCaptionElement> {
      get tag(): string;
  }
  export class TableHeadWidget extends Widget<ICommonProps, HTMLTableCellElement> implements IWidget<ICommonProps, HTMLTableCellElement> {
      get tag(): string;
  }
  export class TableBodyWidget extends Widget<ICommonProps, HTMLTableSectionElement> implements IWidget<ICommonProps, HTMLTableSectionElement> {
      get tag(): string;
  }
  export class TableFootWidget extends Widget<ICommonProps, HTMLTableSectionElement> implements IWidget<ICommonProps, HTMLTableSectionElement> {
      get tag(): string;
  }
  export class TableRowWidget extends Widget<ICommonProps, HTMLTableRowElement> implements IWidget<ICommonProps, HTMLTableRowElement> {
      get tag(): string;
  }
  export class TableCellWidget extends Widget<ICommonProps, HTMLTableCellElement> implements IWidget<ICommonProps, HTMLTableCellElement> {
      get tag(): string;
  }
  export default class TableWidget extends Widget<ICommonProps, HTMLTableElement> implements IWidget<ICommonProps, HTMLTableElement> {
      get tag(): string;
  }

}
declare module '@protorians/widgets/supports/text' {
  import type { ICommonProps, IWidget } from '@protorians/widgets/types/index';
  import { Widget } from '@protorians/widgets/supports/widget';
  export class TextWidget extends Widget<ICommonProps, HTMLSpanElement> implements IWidget<ICommonProps, HTMLSpanElement> {
      get tag(): string;
  }

}
declare module '@protorians/widgets/supports/textarea' {
  import type { ITextareaProps, IWidget } from '@protorians/widgets/types/index';
  import { Widget } from '@protorians/widgets/supports/widget';
  export class TextareaWidget extends Widget<ITextareaProps, HTMLTextAreaElement> implements IWidget<ITextareaProps, HTMLTextAreaElement> {
      get tag(): string;
  }

}
declare module '@protorians/widgets/supports/widget' {
  import type { IChildren, IProps, IWidget, IWidgetElements, IWidgetProps, IStyle, IClassNames, IPropsExtended, IDataValue, IComponent, IObject } from '@protorians/widgets/types/index';
  import { IActions } from '@protorians/widgets/types/actions';
  export class Widget<P extends IProps, E extends IWidgetElements> implements IWidget<P, E> {
      #private;
      props: IWidgetProps<P, E>;
      constructor(props: IWidgetProps<P, E>);
      get tag(): string;
      get element(): E;
      get component(): IComponent<IObject> | undefined;
      initialize(): this;
      useComponent<Props extends IObject>(component: IComponent<Props> | undefined): this;
      child(value?: IChildren<IProps, IWidgetElements>): this;
      style(value?: IStyle): this;
      className(values?: IClassNames): this;
      data(data?: IPropsExtended): this;
      ns(ns?: IPropsExtended): this;
      attrib(name: keyof P, value: P[keyof P] | IDataValue): this;
      actions(actions: IActions<P, E>): this;
      render(): this;
  }

}
declare module '@protorians/widgets/types/actions' {
  import { IChildCallback } from "@protorians/widgets/types/children";
  import { IProps } from '@protorians/widgets/types/props';
  import { IWidgetElements } from '@protorians/widgets/types/widget';
  export type IActions<P extends IProps, E extends IWidgetElements> = {
      [K in keyof HTMLElementEventMap]?: IChildCallback<P, E>;
  };

}
declare module '@protorians/widgets/types/children' {
  import type { IProps } from "@protorians/widgets/types/props";
  import { IDataValue } from "@protorians/widgets/types/values";
  import type { IWidget, IWidgetElements } from "@protorians/widgets/types/widget";
  import { IContext } from '@protorians/widgets/types/context';
  import { IPointer } from '@protorians/widgets/types/pointer';
  export type IChildCallback<P extends IProps, E extends IWidgetElements> = (context: Partial<IContext<P, E>>) => void | IChild<P, E>;
  export type IChild<P extends IProps, E extends IWidgetElements> = IDataValue | IWidget<P, E> | IChildCallback<P, E> | IPointer<P, E>;
  export type IChildOnly<P extends IProps, E extends IWidgetElements> = IDataValue | IWidget<P, E>;
  export type IChildren<P extends IProps, E extends IWidgetElements> = IChild<P, E> | IChild<P, E>[] | Promise<IChild<P, E>>;

}
declare module '@protorians/widgets/types/component' {
  import { IProps } from '@protorians/widgets/types/props';
  import { IWidget, IWidgetElements } from '@protorians/widgets/types/widget';
  import { IObject } from '@protorians/widgets/types/values';
  export type IComponentConstruct<Props extends IObject> = (props: Props) => IWidget<IProps, IWidgetElements>;
  export interface IComponent<Props extends IObject> {
      get props(): Props | undefined;
      set widget(widget: IWidget<IProps, IWidgetElements>);
      get widget(): (IWidget<IProps, IWidgetElements>) | undefined;
  }

}
declare module '@protorians/widgets/types/contents' {
  import type { ICommonProps, IProps } from "@protorians/widgets/types/props";
  export type ITextualable = string | ICommonProps;
  export type IContenable = IProps;

}
declare module '@protorians/widgets/types/context' {
  import type { IProps } from '@protorians/widgets/types/props';
  import type { IWidget, IWidgetElements } from '@protorians/widgets/types/widget';
  import { IObject } from '@protorians/widgets/types/values';
  import { IComponent } from '@protorians/widgets/types/component';
  export type IContext<P extends IProps, E extends IWidgetElements> = {
      widget: IWidget<P, E>;
      event?: Event;
      component?: IComponent<IObject>;
  };
  export type IContextuable<P extends IProps, E extends IWidgetElements> = IContext<P, E>;

}
declare module '@protorians/widgets/types/element' {
  import { IObject } from '@protorians/widgets/types/values';
  import { IComponentConstruct } from '@protorians/widgets/types/component';
  import { ISignalables } from '@protorians/signalable/types';
  import { IProps } from '@protorians/widgets/types/props';
  import { IWidget, IWidgetElements } from '@protorians/widgets/types/widget';
  export type IElementSignal<Props extends IObject> = {
      connected: IElement<Props>;
      disconnected: IElement<Props>;
      adopted: IElement<Props>;
      synchronized: Props;
      mounted: IElement<Props>;
  };
  export interface IElement<Props extends IObject> extends HTMLElement {
      get props(): Props;
      get component(): IComponentConstruct<Props> | undefined;
      get signal(): Readonly<ISignalables<Props, IElementSignal<Props>>>;
      use: IComponentConstruct<Props> | undefined;
      initialize(): this;
      sync(): this;
      mount(component: IComponentConstruct<Props>): this;
      mounted(): void;
      unmounted(): void;
      adopted(): void;
  }
  export interface IElementMetrics<P extends IProps, E extends IWidgetElements> {
      widget: Readonly<IWidget<P, E>>;
      width?: Readonly<number>;
      height?: Readonly<number>;
      x?: Readonly<number>;
      y?: Readonly<number>;
      top?: Readonly<number>;
      right?: Readonly<number>;
      bottom?: Readonly<number>;
      left?: Readonly<number>;
      json?: Readonly<string>;
  }
  export type IStyleExtended = {
      marginVertical?: string | number;
      marginHorizontal?: string | number;
      paddingVertical?: string | number;
      paddingHorizontal?: string | number;
      borderVertical?: string | number;
      borderHorizontal?: string | number;
  };
  export type IStyle = IStyleExtended | {
      [K in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[K];
  };
  export type IStyles = IStyle[];
  export type IClassName = string;
  export type IClassNames = IClassName | IClassName[];

}
declare module '@protorians/widgets/types/index' {
  export * from "@protorians/widgets/types/children";
  export * from "@protorians/widgets/types/props";
  export * from "@protorians/widgets/types/reference";
  export * from "@protorians/widgets/types/state";
  export * from "@protorians/widgets/types/widget";
  export * from "@protorians/widgets/types/element";
  export * from "@protorians/widgets/types/contents";
  export * from "@protorians/widgets/types/values";
  export * from "@protorians/widgets/types/context";
  export * from "@protorians/widgets/types/component";
  export * from "@protorians/widgets/types/pointer";

}
declare module '@protorians/widgets/types/pointer' {
  import { IChildCallback, IChildOnly } from '@protorians/widgets/types/children';
  import { IProps } from '@protorians/widgets/types/props';
  import { IWidget, IWidgetElements } from '@protorians/widgets/types/widget';
  import { ISignalables } from '@protorians/signalable/types';
  export type IPointerSignals<P extends IProps, E extends IWidgetElements> = {
      defined: IChildCallback<P, E> | undefined;
      refresh: IPointerRendering;
      destroyed: undefined;
      bound: IWidget<IProps, IWidgetElements> | undefined;
  };
  export type IPointerRendering = HTMLElement | DocumentFragment | Text | undefined;
  export interface IPointer<P extends IProps, E extends IWidgetElements> {
      get parent(): IWidget<IProps, IWidgetElements> | undefined;
      get marker(): IPointerRendering;
      get signal(): Readonly<ISignalables<IChildCallback<P, E> | undefined, IPointerSignals<P, E>>>;
      callback: IChildCallback<P, E> | undefined;
      call(): IChildOnly<P, E> | undefined;
      use(callback: IChildCallback<P, E>): this;
      refresh(): this;
      destroy(): this;
      bind(widget: IWidget<IProps, IWidgetElements>): this;
      render(): IPointerRendering;
  }

}
declare module '@protorians/widgets/types/props' {
  import type { ICallableValue, IChildren, IWidgetElements } from '@protorians/widgets/types/index';
  import type { IBoolean, IDataValue, IFormRelationship, ILoading, IOnOff, IReferrerPolicy, ISandbox, ITarget, IYesNo } from '@protorians/widgets/types/values';
  export type IPropsExtended = {
      [K: string]: IDataValue;
  };
  export type IProps = Partial<ICommonProps | IVideoProps | IPictureSourceProps | IPictureProps | IAudioProps | IIFrameProps>;
  export type IOperatingProps<T> = {
      [K in keyof T]: T[keyof T] | ICallableValue;
  };
  export interface ICommonProps {
      accesskey?: string;
      contenteditable?: string;
      dir?: string;
      id?: string;
      lang?: string;
      title?: string;
      tabindex?: number;
      spellcheck?: boolean;
      draggable?: boolean;
      hidden?: boolean;
      translate?: IYesNo;
      rel?: string;
  }
  export interface IAnchorProps extends ICommonProps {
      href: string;
      hreflang?: string;
      ping?: string;
      referrerpolicy?: IReferrerPolicy;
      target?: ITarget;
      type?: string;
      download?: string;
      media?: string;
  }
  export type IInputableType = 'text' | 'button' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'time' | 'url' | 'week' | 'checkbox';
  export type IInputableCommonProps = {
      form?: string;
      formAction?: string;
      formEnctype?: string;
      formMethod?: 'get' | 'post';
      formNovalidate?: boolean;
      formTarget?: ITarget;
  };
  export type IButtonType = 'button' | 'reset' | 'submit' | 'menu';
  export interface IButtonProps extends IInputableProps {
      popoverTarget?: string;
      popoverTargetAction?: string;
      type?: IButtonType;
  }
  export interface IInputProps extends IInputableProps {
      type?: IInputableType;
  }
  export interface IOptionGroupProps extends ICommonProps {
      disabled?: boolean;
      label: string;
  }
  export interface IOptionProps extends ICommonProps {
      disabled?: boolean;
      selected?: boolean;
      label: string;
      value?: string | number;
  }
  export interface ISelectProps extends IInputableProps {
  }
  export interface ITextareaProps extends IInputableProps {
  }
  export interface IInputableProps extends ICommonProps, IInputableCommonProps {
      name?: string;
      alt?: string;
      autocomplete?: IOnOff;
      autofocus?: boolean;
      checked?: boolean;
      dirname?: string;
      disabled?: boolean;
      list?: string;
      max?: number | string;
      min?: number | string;
      maxlength?: number;
      minlength?: number;
      multiple?: boolean;
      pattern?: RegExp;
      placeholder?: string;
      readonly?: boolean;
      required?: boolean;
      size?: number;
      step?: number;
      value?: string;
  }
  export interface IFormProps extends ICommonProps {
      acceptCharset?: string;
      action?: string;
      autocomplete?: 'on' | 'off';
      enctype?: string;
      method?: 'get' | 'post';
      name?: string;
      novalidate?: boolean;
      rel?: IFormRelationship;
      target?: ITarget;
      child: IChildren<IProps, IWidgetElements>;
  }
  export interface IVideoProps extends ICommonProps {
      autoplay?: boolean;
      controls?: boolean;
      loop?: boolean;
      muted?: boolean;
      width?: string;
      height?: string;
      poster?: string;
      preload?: 'auto' | 'metadata' | 'none';
      src?: string;
  }
  export interface IPictureSourceProps extends ICommonProps {
      srcset?: string;
      media?: string;
      src?: string;
  }
  export interface IPictureProps extends ICommonProps {
      source?: IPictureSourceProps | IPictureSourceProps[];
      src?: string;
      alt?: string;
  }
  export interface IAudioProps extends ICommonProps {
      autoplay?: boolean;
      controls?: boolean;
      loop?: boolean;
      muted?: boolean;
      preload?: boolean;
      src: string;
  }
  export interface IIFrameProps extends ICommonProps {
      allow?: string;
      allowfullscreen?: IBoolean;
      allowpaymentrequest?: IBoolean;
      loading?: ILoading;
      name?: string;
      referrerpolicy?: IReferrerPolicy;
      sandbox?: ISandbox;
      src: string;
  }

}
declare module '@protorians/widgets/types/reference' {
  import type { IProps } from "@protorians/widgets/types/props";
  import type { IWidget, IWidgetElements } from "@protorians/widgets/types/widget";
  import type { IElementMetrics } from '@protorians/widgets/types/element';
  export interface IReference<P extends IProps, E extends IWidgetElements> {
      get widget(): IWidget<P, E> | undefined;
      use(widget: IWidget<P, E>): this;
      metrics(): IElementMetrics<P, E> | undefined;
  }
  export type IReferenceCallback<P extends IProps, E extends IWidgetElements> = (widget: IWidget<P, E>) => IReference<P, E>;

}
declare module '@protorians/widgets/types/state' {
  import type { ISupportableValue } from "@protorians/widgets/types/values";
  import { ISignalables } from '@protorians/signalable/types';
  import { IPointer } from '@protorians/widgets/types/pointer';
  import { IProps } from '@protorians/widgets/types/props';
  import { IWidgetElements } from '@protorians/widgets/types/widget';
  import { IChildCallback } from '@protorians/widgets/types/children';
  export type IStateSignals<V extends ISupportableValue> = {
      'pointer:updated': IPointer<any, any>;
      'pointers:updated': IPointer<any, any>[];
      updated: V;
      destroy: IState<V>;
      used: IPointer<any, any>;
  };
  export interface IState<V extends ISupportableValue> {
      get value(): V | undefined;
      get initial(): V | undefined;
      get signal(): Readonly<ISignalables<V | undefined, IStateSignals<V>>>;
      set(value: V): this;
      unset(): this;
      use<P extends IProps, E extends IWidgetElements>(callback: IChildCallback<P, E>): IPointer<P, E>;
  }

}
declare module '@protorians/widgets/types/values' {
  import type { IContext, IProps, IWidget, IWidgetElements } from '@protorians/widgets/types/index';
  export type IDataValue = string | number | object | boolean | null | undefined;
  export type ICallableValue = (context: Partial<IContext<IProps, IWidgetElements>>) => IDataValue;
  export type IObject = {
      [A: string]: IDataValue;
  };
  export type ISupportableValue = IDataValue | IWidget<IProps, IWidgetElements>;
  export type IOnOff = 'on' | 'off';
  export type IYesNo = 'yes' | 'no';
  export type IBoolean = 'true' | 'false';
  export type ILoading = 'eager' | 'lazy';
  export type ISandbox = 'allow-forms' | 'allow-pointer-lock' | 'allow-popups' | 'allow-same-origin' | 'allow-scripts' | 'allow-top-navigation';
  export type IReferrerPolicy = 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | ' origin-when-cross-origin' | 'unsafe-url';
  export type ITarget = '_blank' | '_self' | '_parent' | '_top' | string;
  export type IFormRelationship = 'external' | 'license' | 'next' | 'nofollow' | 'noopener' | 'noreferrer' | 'opener' | 'prev' | 'search' | 'help';

}
declare module '@protorians/widgets/types/widget' {
  import { IActions } from '@protorians/widgets/types/actions';
  import type { IStyle, IChildren, IPropsExtended, IProps, IClassNames, IDataValue, IComponent, IReference, IObject } from '@protorians/widgets/types/index';
  export type IWidgetElements = HTMLElement | DocumentFragment;
  export type IWidgetPrimitiveProps<P extends IProps, E extends IWidgetElements> = {
      ref?: IReference<P, E> | undefined;
      child: IChildren<P, E> | undefined;
      style?: IStyle;
      className?: IClassNames;
      data?: IPropsExtended;
      ns?: IPropsExtended;
      actions?: IActions<P, E>;
  };
  export type IWidgetProps<P extends IProps, E extends IWidgetElements> = P & IWidgetPrimitiveProps<P, E>;
  export interface IWidget<P extends IProps, E extends IWidgetElements> {
      props: Partial<IWidgetProps<P, E>>;
      get tag(): string;
      get element(): E;
      get component(): IComponent<IObject> | undefined;
      useComponent<Props extends IObject>(component: IComponent<Props> | undefined): this;
      initialize(): this;
      child(value: IChildren<P, E>): this;
      style(value?: IStyle): this;
      className(value?: IClassNames): this;
      data(value?: IPropsExtended): this;
      ns(value?: IPropsExtended): this;
      attrib(name: keyof P, value: P[keyof P] | IDataValue): this;
      render(): this;
  }

}
declare module '@protorians/widgets/utilities/attributionable' {
  import { IObject } from '@protorians/widgets/types/index';
  export function attribution<T extends IObject>(attributes: object, ns?: string | undefined, separator?: string | undefined): T;

}
declare module '@protorians/widgets/utilities/camelization' {
  export function decamelize(value: string, separator?: string): string;
  export function camelize(value: string): string;

}
declare module '@protorians/widgets' {
  import main = require('@protorians/widgets/index');
  export = main;
}