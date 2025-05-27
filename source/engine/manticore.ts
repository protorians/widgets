import type {
    IEngine,
    IAttributes,
    IWidgetNode,
    IStateStack,
    IContext,
    IPropStack,
    IChildrenSupported,
    IChildren,
    IGlobalEventMap,
    ICallable,
    IGlobalAttributes,
    IStyleDeclaration,
    IGlobalEventPayload,
    IStringToken,
    IPrimitive,
    ISignalableCallbackMap,
    IWidgetSignalMap,
    IStyleSheetDeclarations, IGlobalEventCallableMap
} from "../types/index.js";
import {ContextWidget, WidgetNode} from "../widget-node.js";
import {Callable, Environment, type ISignalStackCallable, TreatmentQueueStatus, unCamelCase} from "@protorians/core";
import {ToggleOption, ObjectElevation, Displaying} from "../enums.js";
import {WidgetDirectives, WidgetDirectivesType} from "../directive.js";

export class Manticore<E extends HTMLElement, A extends IAttributes> implements IEngine<E, A> {
    get element(): E | undefined {
        return this.widget.element as E;
    }

    constructor(
        readonly widget: IWidgetNode<E, A>
    ) {
    }

    // construct(widget: IWidgetNode<E, A>, callback: ICallable<E, A, undefined>): this {
    //     widget.signal.listen('construct', callback)
    //     return this;
    // }
    //
    // mount(widget: IWidgetNode<E, A>, callback: ICallable<E, A, undefined>): this {
    //     widget.signal.listen('mount', callback)
    //     return this;
    // }
    //
    // unmount(widget: IWidgetNode<E, A>, callback: ICallable<E, A, undefined>): this {
    //     widget.signal.listen('unmount', callback)
    //     return this;
    // }
    //
    // before(widget: IWidgetNode<E, A>, callback: ICallable<E, A, undefined>): this {
    //     widget.signal.listen('before', callback)
    //     return this;
    // }
    //
    // after(widget: IWidgetNode<E, A>, callback: ICallable<E, A, undefined>): this {
    //     widget.signal.listen('after', callback)
    //     return this;
    // }

    clear(widget: IWidgetNode<E, A>,): this {
        if (widget.clientElement) widget.clientElement.innerHTML = ''
        else if (widget.serverElement) widget.serverElement.children('')
        widget.signal.dispatch('clear', {root: this.widget, widget, payload: undefined}, widget.signal);
        return this;
    }

    remove(widget: IWidgetNode<E, A>,): this {
        widget.element.remove();
        widget.signal.dispatch('remove', {root: this.widget, widget, payload: undefined}, widget.signal);
        return this;
    }

    enable(widget: IWidgetNode<E, A>,): this {
        widget.stylesheet.remove('opacity');
        widget.signal.dispatch('enable', {root: this.widget, widget, payload: undefined}, widget.signal);
        return this;
    }

    disable(widget: IWidgetNode<E, A>,): this {
        widget.stylesheet.update('opacity', '.3');
        widget.signal.dispatch('disable', {root: this.widget, widget, payload: undefined}, widget.signal);
        return this;
    }

    lock(widget: IWidgetNode<E, A>,): this {
        widget.locked = true;
        widget.disable();
        widget.signal.dispatch('lock', {root: this.widget, widget, payload: undefined}, widget.signal);
        return this;
    }

    unlock(widget: IWidgetNode<E, A>,): this {
        widget.locked = false;
        widget.enable();
        widget.signal.dispatch('unlock', {root: this.widget, widget, payload: undefined}, widget.signal);
        return this;
    }

    trigger(widget: IWidgetNode<E, A>, type: keyof IGlobalEventMap): this {
        if (widget.locked) return this;
        if (widget.clientElement) {
            requestAnimationFrame(() => {
                if (widget.clientElement && typeof widget.clientElement[type] === 'function') {
                    widget.clientElement[type]();
                    widget.signal.dispatch('trigger', {
                        root: this.widget,
                        widget,
                        payload: {type, event: new Event(type)}
                    }, widget.signal);
                }
            })

        }
        return this;
    }

    computedStyle(widget: IWidgetNode<E, A>, token: keyof IStyleDeclaration): string | undefined {
        return widget.clientElement ?
            (widget.clientElement.style[token] ||
                getComputedStyle(widget.clientElement).getPropertyValue(token as string)
                || undefined)
            : undefined
    }

    hide(widget: IWidgetNode<E, A>,): this {
        if (widget.locked) return this;
        widget.style({display: 'none',})
        this.attributeLess(widget, {ariaHidden: "true",})
        widget.signal.dispatch('hide', {root: this.widget, widget, payload: undefined}, widget.signal);
        return this;
    }

    show(widget: IWidgetNode<E, A>, display?: Displaying): this {
        if (widget.locked) return this;
        widget.style({display: display || 'block',})
        this.attributeLess(widget, {ariaHidden: undefined,})
        widget.signal.dispatch('show', {root: this.widget, widget, payload: undefined}, widget.signal);
        return this;
    }

    focus(widget: IWidgetNode<E, A>): this {
        widget.clientElement?.focus();
        widget.signal.dispatch('focus', {root: this.widget, widget, payload: undefined}, widget.signal);
        return this;
    }

    blur(widget: IWidgetNode<E, A>): this {
        widget.clientElement?.blur();
        widget.signal.dispatch('blur', {root: this.widget, widget, payload: undefined}, widget.signal);
        return this;
    }

    toggle(widget: IWidgetNode<E, A>, option?: ToggleOption): this {
        if (widget.locked) return this;

        switch (option) {

            case ToggleOption.Visibility:
                if (widget.locked) widget.unlock();
                else widget.lock();
                break;

            case ToggleOption.Activity:
                break;

            case ToggleOption.Interactivity:
                widget.locked = !widget.locked;
                break;

            case ToggleOption.Stase:
                this.attributeLess(widget, {
                    inert: true,
                })
                break;

            default:
                const display = widget.computedStyle('display')
                if (display?.toLowerCase() == 'none') widget.show()
                else widget.hide()
                break;

        }

        widget.signal.dispatch('toggle', {root: this.widget, widget, payload: option}, widget.signal);
        return this
    }

    data(widget: IWidgetNode<E, A>, dataset: IGlobalAttributes): this {
        if (widget.locked) return this;
        if (widget.element)
            Object.keys(dataset || {})
                .forEach(key => {
                    widget.element.dataset
                        ? (widget.element.dataset[key] = typeof dataset[key] !== 'object' ? `${dataset[key]}`
                            : undefined)
                        : void (0)
                })

        widget.signal.dispatch('data', {root: this.widget, widget, payload: dataset}, widget);
        return this;
    }

    attribute(widget: IWidgetNode<E, A>, attributes: Partial<A>): this {
        if (widget.locked) return this;
        this.attributeLess(widget, attributes as IGlobalAttributes);
        return this;
    }

    attributeLess(widget: IWidgetNode<E, A>, attributes: IGlobalAttributes): this {
        if (widget.locked) return this;

        if (widget.clientElement) {
            Object.keys(attributes || {}).forEach(
                key => {
                    key = unCamelCase(key);
                    if (attributes[key] === undefined || typeof attributes[key] === null || (typeof attributes[key] === 'boolean' && !attributes[key])) {
                        widget.clientElement?.removeAttribute(key)
                    } else widget.clientElement?.setAttribute(key, `${attributes[key]?.toString()}`)
                }
            )
        }

        if (widget.serverElement) {
            Object.keys(attributes || {}).forEach(key => {
                const attrib = {};
                attrib[unCamelCase(key)] = attributes[key];
                widget.serverElement?.attribute(attrib)
            })
        }

        widget.signal.dispatch('attribute', {root: this.widget, widget, payload: attributes}, widget.signal);
        return this;
    }

    content(widget: IWidgetNode<E, A>, children: IChildren<IChildrenSupported>): this {
        if (typeof children !== 'undefined') {
            if (Array.isArray(children)) {
                children.forEach(child => this.content(widget, child));
            } else if (children instanceof WidgetNode) {
                this.render(children, this.widget.context || new ContextWidget(widget))
                widget.element.append(children.element);
                children.useContext(this.widget.context || widget.context);
                Callable.safe(() => {
                    children.signal.dispatch('mount', {
                        root: this.widget,
                        widget: children,
                        payload: widget
                    }, children.signal);
                })

            } else if (typeof children === 'string' || typeof children === 'number') {
                if (Environment.Client) {
                    widget.clientElement?.append(document.createTextNode(`${children}`))
                } else {
                    widget.serverElement?.append(children)
                }
            } else {
                WidgetDirectives.process(children, WidgetDirectivesType.EngineContent, {engine: this, widget,})
            }
        }
        return this;
    }

    style(widget: IWidgetNode<E, A>, declaration: IStyleSheetDeclarations): this {
        if (widget.locked) return this;
        Object.keys(declaration || {}).forEach(key => widget.stylesheet.update(key as keyof IStyleSheetDeclarations, declaration[key]));
        widget.stylesheet.sync()
        widget.signal.dispatch('style', {root: this.widget, widget, payload: declaration}, widget.signal);
        return this;
    }

    className(widget: IWidgetNode<E, A>, token: IStringToken): this {
        if (widget.locked) return this;
        (Array.isArray(token) ? token : token.split(' '))
            .forEach((t) => {
                if (t.trim().length > 0) {
                    if (Environment.Client) widget.clientElement?.classList.add(t);
                    else widget.serverElement?.blueprint.classList.add(t);
                }
            });
        widget.signal.dispatch('className', {root: this.widget, widget, payload: token}, widget.signal);
        return this;
    }

    removeClassName(widget: IWidgetNode<E, A>, token: IStringToken): this {
        if (widget.locked) return this;
        (Array.isArray(token) ? token : token.split(' '))
            .forEach((t) => {
                if (t.trim().length > 0) {
                    if (Environment.Client) widget.clientElement?.classList.remove(t);
                    else widget.serverElement?.blueprint.classList.delete(t);
                }
            });
        widget.signal.dispatch('className', {root: this.widget, widget, payload: token}, widget.signal);
        return this;
    }

    clearClassName(widget: IWidgetNode<E, A>): this {
        if (widget.locked) return this;
        if (Environment.Client && widget.clientElement) widget.clientElement.className = '';
        else if (!Environment.Client) widget.serverElement?.blueprint.classList.clear();
        this.className(widget, widget.fingerprint)
        return this;
    }

    replaceClassName(widget: IWidgetNode<E, A>, oldToken: IStringToken, token: IStringToken): this {
        if (widget.locked) return this;

        const oldTokens = Array.isArray(oldToken) ? oldToken : oldToken.split(' ');
        const tokens = Array.isArray(token) ? token : token.split(' ');

        tokens.map((token, index) => {
            if (Environment.Client && widget.clientElement) widget.clientElement.classList.replace(oldTokens[index], token);
            else if (!Environment.Client) {
                widget.serverElement?.blueprint.classList.delete(oldTokens[index]);
                widget.serverElement?.blueprint.classList.add(token);
            }
        })

        return this;
    }

    value(widget: IWidgetNode<E, A>, data: IPrimitive): this {
        if (widget.locked) return this;
        if ('value' in widget.element) {
            widget.element.value = `${data || ''}`;
            widget.signal.dispatch('value', {root: this.widget, widget, payload: data}, widget.signal);
        }
        return this;
    }

    html(widget: IWidgetNode<E, A>, data: string): this {
        if (widget.locked) return this;
        if (widget.clientElement) widget.clientElement.innerHTML = data;
        if (widget.serverElement) widget.serverElement.children(data)
        widget.signal.dispatch('html', {root: this.widget, widget, payload: data}, widget);
        return this;
    }

    listens(
        widget: IWidgetNode<E, A>,
        listeners: Partial<IGlobalEventCallableMap<E, A>>
    ): this {
        if (widget.locked) return this;
        Object.entries(listeners)
            .forEach(([type, callable]) =>
                this.listen<keyof IGlobalEventMap>(widget, type as keyof IGlobalEventMap, callable))
        return this;
    }

    listen<T extends keyof IGlobalEventMap>(
        widget: IWidgetNode<E, A>,
        type: T,
        callback: ICallable<E, A, IGlobalEventPayload<T>>,
        options?: boolean | AddEventListenerOptions,
    ): this {
        if (widget.locked) return this;
        if (Environment.Client) {
            (widget.element as HTMLElement)?.addEventListener(type, ev => {
                if (widget.locked) return;
                const payload: IGlobalEventPayload<T> = {type, event: ev};
                if (typeof callback !== 'function') return;
                const r = callback({root: this.widget, widget, payload})
                widget.signal.dispatch('listen', {root: this.widget, widget, payload}, widget.signal);
                if (r === TreatmentQueueStatus.Cancel) ev.preventDefault()
                if (r === TreatmentQueueStatus.Exit) ev.stopPropagation()
                if (r === TreatmentQueueStatus.SnapOut) ev.stopImmediatePropagation()
            }, options)
        }
        return this;
    }


    ons(
        widget: IWidgetNode<E, A>,
        listeners: Partial<IGlobalEventCallableMap<E, A>>
    ): this {
        if (widget.locked) return this;
        Object.entries(listeners)
            .forEach(([type, callable]) =>
                this.on(widget, type as keyof IGlobalEventMap, callable))

        return this;
    }

    on<T extends keyof IGlobalEventMap>(
        widget: IWidgetNode<E, A>,
        type: T,
        callback: ICallable<E, A, IGlobalEventPayload<T>> | null
    ): this {
        if (Environment.Client && widget.element) {
            widget.element['on' + type] = callback ? ev => {
                if (widget.locked) return;
                const payload = {type, event: ev};
                const returned = callback({root: this.widget, widget, payload})
                widget.signal.dispatch('on', {root: this.widget, widget, payload}, widget.signal);
                if (returned === TreatmentQueueStatus.Cancel) ev.stopPropagation()
                if (returned === TreatmentQueueStatus.Exit) ev.stopImmediatePropagation()
            } : null;
        }
        return this;
    }

    signals(widget: IWidgetNode<E, A>, signals: Partial<ISignalableCallbackMap<E, A>>): this {
        Object.entries(signals)
            .forEach(([key, callable]) =>
                widget.signal.listen(key as keyof IWidgetSignalMap<E, A>, callable as ISignalStackCallable<any>)
            )
        return this;
    }

    stase(widget: IWidgetNode<E, A>, state: boolean): this {
        this.attributeLess(widget, {inert: state,})
        return this
    }

    elevate(widget: IWidgetNode<E, A>, elevation: ObjectElevation): this {
        widget.elevate(elevation);
        return this
    }

    render<P extends IPropStack, S extends IStateStack>(widget: IWidgetNode<E, A>, context: IContext<P, S>): E | undefined {
        if (widget.isConnected) return undefined;

        context.root = this.widget.context?.root || context.root || widget;
        widget
            .useContext(context)

        widget.signal.dispatch('construct', {root: context.root || widget, widget, payload: undefined}, widget.signal)

        widget
            .stylesheet
            .merge((widget.constructor as typeof WidgetNode<E, A>).style || {})

        widget.signal
            .listen('mount', () => {
                if (widget.clientElement) {
                    widget.clientElement.style.removeProperty('visibility')
                }
                (widget.constructor as typeof WidgetNode<E, A>).mount(widget);
            })
            .listen('unmount', () => {
                (widget.constructor as typeof WidgetNode<E, A>).unmount(widget);
            })

        widget.signal.dispatch('before', {root: context.root || widget, widget, payload: undefined}, widget.signal)

        if (widget.props.signal) this.signals(widget, widget.props.signal)

        if (widget.props.ref) widget.props.ref.attach(widget)

        if (widget.props.style) widget.stylesheet.bind(widget);

        if (widget.children) this.content(widget, widget.children);

        if (widget.attributes) this.attribute(widget, widget.attributes)

        if (widget.props.className) this.className(widget, widget.props.className);

        if (widget.props.listen) this.listens(widget, widget.props.listen);

        if (widget.props.on) this.ons(widget, widget.props.on)

        if (widget.props.data) this.data(widget, widget.props.data)

        if (widget.props.stase) this.stase(widget, widget.props.stase)

        if (widget.props.elevate) this.elevate(widget, widget.props.elevate)

        widget.signal.dispatch('after', {root: context.root || widget, widget, payload: undefined}, widget.signal)

        return this.element;
    }
}