import type {
    IAttributes,
    IComponent,
    IComponentConstruct,
    IComponentFunction,
    IComponentRecord,
    IComponentRecords,
    IElementSignal,
    IParameters,
    IWidget,
    IWidgetElements,
} from '../types';
import {decamelize} from '../utilities';
import {type ISignalables, Signalables} from '@protorians/signalable';
import {SchemeValidator} from './scheme-validator';
import {WidgetComposite} from './composite';
import {createContext} from "./context";

export class Components {

    protected static _records: IComponentRecords = {};


    public static get records() {
        return this._records;
    }

    public static push<T extends IParameters>(
        alias: string,
        component: IComponentConstruct<T>,
        element: typeof HTMLElement,
    ) {
        this._records[alias] = this._records[alias] || {component, element};
        return this;
    }

    public static element(alias: string): CustomElementConstructor | undefined {
        return this._records[alias]?.element;
    }

    public static construct<T extends IParameters>(alias: string): IComponentConstruct<T> | undefined {
        return this._records[alias]?.component;
    }

    public static record<T extends IParameters>(alias: string): IComponentRecord<T> | undefined {
        return this._records[alias] || undefined;
    }

}


export class WidgetComponent<T extends IParameters> implements IComponent<T> {

    protected _parameters: T = {} as T;

    protected _widget: IWidget<IAttributes, IWidgetElements> | undefined;

    constructor(
        public readonly alias: string,
        public readonly component: IComponentConstruct<T>,
    ) {
    }

    get parameters(): T {
        return this._parameters;
    }

    set widget(widget: IWidget<IAttributes, IWidgetElements>) {
        this._widget = this._widget || widget || undefined;
    }

    get widget(): (IWidget<IAttributes, IWidgetElements>) | undefined {
        return this._widget || undefined;
    }

    render(props: T) {
        this._parameters = props;
        this._widget = this.component(props)
            .useComposite(new WidgetComposite(props))
            .render();
        return this._widget;
    }

}

export class WidgetComponentElement<T extends IParameters> extends HTMLElement {

    protected parameterScheme: T = {} as T;
    protected _parameters: T = {} as T;
    protected alias: string | undefined = undefined;
    protected component: IComponentConstruct<T> | undefined = undefined;

    public signal: Readonly<ISignalables<T, IElementSignal<T>>>;

    constructor() {
        super();
        this.signal = new Signalables(this._parameters);
    }

    get parameters(): T {
        return this._parameters;
    }

    set parameters(parameters: T) {
        this._parameters = parameters;
    }

    protected sync() {
        const hasScheme = Object.entries(this.parameterScheme);

        if (hasScheme.length) {
            Object.values(this.attributes).forEach((attrib) =>
                (SchemeValidator.relative(attrib.value, this.parameterScheme[attrib.name])) ? this._parameters[attrib.name as keyof T] = this._parameters[attrib.name as keyof T] || attrib.value as T[ keyof T] : void (0),
            );
        } else {
            Object.values(this.attributes).forEach((attrib) =>
                this._parameters[attrib.name as keyof T] = this._parameters[attrib.name as keyof T] || attrib.value as T[ keyof T],
            );
        }

        return this;
    }

    protected mount(): void {
        if (this.alias && this.component) {
            this.sync();
            const render = (new WidgetComponent<T>(this.alias, this.component)).render(this._parameters);
            if (render.element instanceof HTMLElement) {
                this.replaceWith(render.element);
                render.signal.dispatch('mount', createContext({
                    payload: render.parent as IWidget<any, any>,
                    widget: render as IWidget<any, any>,
                    composite: render.composite,
                    event: undefined
                }))
            }
        }
    }

    connectedCallback() {
        this.mount();
    }

    adoptedCallback() {
        this.sync();
    }
}

export function Component<T extends IParameters>(
    alias: string,
    component: IComponentConstruct<T>,
    parameters: T | object = {},
): IComponentFunction<T> {

    const name = decamelize(alias, '-');

    if (!name.includes('-')) {
        throw new Error('[WidgetComponent] Alias not supported. Use two(2) uppercases minimum.\n-> Example : "MyComponent" ');
    }

    if (typeof HTMLElement !== 'undefined') {

        if (!customElements.get(name)) {
            Components.push<T>(alias, component, class extends WidgetComponentElement<T> {
                    protected parameterScheme: T = parameters as T;
                    protected alias: string | undefined = alias;
                    protected component: IComponentConstruct<T> | undefined = component;
                },
            );
            const handler = Components.element(alias);
            if (handler) customElements.define(name, handler);
        }

        return Components.record<T>(alias);
    } else {
        return (new WidgetComponent<T>(alias, component));
    }

}

globalThis.WidgetComponents = typeof globalThis.Components !== 'undefined' ? globalThis.Components : Components;

export const WidgetComponents = globalThis.WidgetComponents;