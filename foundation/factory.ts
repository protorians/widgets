import type {
  IChildCallback,
  IChildren,
  IClassNames,
  IDataValue, IEventListeners, IEventStaticListenerPayload, IEventStaticListeners,
  IPointer,
  IProps, IPropsExtended,
  IStyle,
  IWidget,
  IWidgetAttributesMap,
  IWidgetElements, IWidgetListenerMap,
} from '../types';
import {PointerWidget} from './pointer';
import {createContext} from './context';
import {WidgetNode} from '../supports';
import {allowEditableElement, attribution, createWidgetSignalableDispatcher, decamelize} from '../utilities';
import {WIDGET_NATIVE_PROPS} from './constants';


export class WidgetFactory {

  static setChildren<P extends IProps, E extends IWidgetElements>(
    widget: IWidget<P, E>,
    value?: IChildren<IProps, IWidgetElements>,
  ): IWidget<P, E> {

    if (value) {

      if (value instanceof PointerWidget) {

        const r = (value as IPointer<P, E>).bind(widget).render().marker;

        if (r && r.current) widget.element.append(r.current);

      } else if (typeof value == 'object' && Array.isArray(value)) {

        value.forEach(c => widget.child(c));

      } else if (typeof value == 'function') {

        widget.child(value(createContext<IProps, IWidgetElements>({
          widget: widget as IWidget<any, any>,
          component: widget.component,
        })));

      } else if (value instanceof Promise) {

        value.then(c => widget.child(c));

      } else if (value instanceof WidgetNode) {

        widget.element.append(value.useComponent(widget.component).render().element);

      } else if (value instanceof HTMLElement || value instanceof DocumentFragment) {

        widget.element.append(value);

      } else if (typeof value == 'string') {

        widget.element.append(document.createTextNode(value));

      } else {

        widget.element.append(document.createTextNode(`${value}`));
      }

      widget.signal.dispatch(
        'child',
        createWidgetSignalableDispatcher<IChildren<IProps, IWidgetElements>, P, E>(widget, value),
      );

    }

    return widget;

  }


  static setListen<P extends IProps, E extends IWidgetElements>(
    widget: IWidget<P, E>,
    type: keyof HTMLElementEventMap,
    listener: IChildCallback<P, E>,
    options?: boolean | AddEventListenerOptions,
  ): IWidget<P, E> {

    if (widget.element instanceof HTMLElement) {

      widget.element.addEventListener(type, event => listener(
        createContext<P, E>({
          widget: widget,
          component: widget.component,
          event,
        }),
      ), options);

      widget.signal.dispatch(
        'listen',
        createWidgetSignalableDispatcher<IWidgetListenerMap<P, E>, P, E>(widget, {
          type,
          listener,
          options,
        }),
      );

    }

    return widget;
  }


  static setListens<P extends IProps, E extends IWidgetElements>(
    widget: IWidget<P, E>,
    listeners: IEventListeners<P, E>,
  ): IWidget<P, E> {

    Object.entries(listeners)
      .forEach(({0: type, 1: callback}) => {

        if (typeof callback == 'function') {
          widget.listen(type as keyof HTMLElementEventMap, callback, false);
        } else if (typeof callback == 'object') {
          widget.listen(type as keyof HTMLElementEventMap, callback.call, callback.options);
        }

      });

    return widget;
  }

  static setOns<P extends IProps, E extends IWidgetElements>(
    widget: IWidget<P, E>,
    listeners: IEventStaticListeners<P, E>,
  ): IWidget<P, E> {

    Object.entries(listeners)
      .forEach(({0: type, 1: callback}) =>
        this.setOn(
          widget,
          type as keyof IEventStaticListeners<P, E>,
          callback as IEventStaticListeners<P, E>[ keyof IEventStaticListeners<P, E> ],
        ),
      );

    return widget;
  }

  static setOn<P extends IProps, E extends IWidgetElements, V extends keyof IEventStaticListeners<P, E>>(
    widget: IWidget<P, E>,
    type: V,
    listener: IEventStaticListeners<P, E>[V],
  ): IWidget<P, E> {

    if (widget.element instanceof HTMLElement) {
      // @ts-ignore
      widget.element[`on${type.toLowerCase()}`] = (e: Event) => {

        if (typeof listener == 'undefined') e.preventDefault();

        else if (listener === null) {
          // @ts-ignore
          widget.element[`on${type.toLowerCase()}`] = null;
        } else if (typeof listener == 'boolean') {
          return listener;
        } else if (typeof listener == 'function') {
          return listener(
            createContext<P, E>({
              widget: widget,
              event: e,
              component: widget.component,
            }),
          );
        }

      };

      widget.signal.dispatch(
        'on',
        createWidgetSignalableDispatcher<IEventStaticListenerPayload<V, P, E>, P, E>(widget, {
          type,
          listener,
        }),
      );

    }

    return widget;
  }


  static setData<P extends IProps, E extends IWidgetElements>(
    widget: IWidget<P, E>,
    data?: IPropsExtended,
  ): IWidget<P, E> {

    if (data && widget.element instanceof HTMLElement) {
      Object.entries(data).forEach(
        ({0: name, 1: value}) =>
          (widget.element instanceof HTMLElement)
            ? widget.element.dataset[decamelize(name, '-')] = `${value}`
            : undefined,
      );

      widget.signal.dispatch(
        'data',
        createWidgetSignalableDispatcher<IPropsExtended, P, E>(widget, data),
      );

    }

    return widget;
  }

  static attribution<P extends IProps, E extends IWidgetElements>(
    widget: IWidget<P, E>,
    ns?: IPropsExtended,
  ): IWidget<P, E> {

    if (ns && widget.element instanceof HTMLElement) {
      Object.entries(attribution(ns)).forEach(
        ({0: name, 1: value}) =>
          (widget.element instanceof HTMLElement)
            ? widget.element.setAttribute(`${name}`, `${value}`)
            : undefined,
      );

      widget.signal.dispatch(
        'ns',
        createWidgetSignalableDispatcher<IPropsExtended, P, E>(widget, ns),
      );

    }

    return widget;
  }

  static setStyle<P extends IProps, E extends IWidgetElements>(
    widget: IWidget<P, E>,
    value?: IStyle<P, E>,
  ): IWidget<P, E> {

    if (value && widget.element instanceof HTMLElement) {
      Object.entries(value).forEach(({0: property, 1: value}) =>

        // @ts-ignore
        widget.element.style[property] = (typeof value == 'string')

          ? value as CSSStyleDeclaration[ keyof CSSStyleDeclaration ]

          : (
            typeof value == 'function'

              // @ts-ignore
              ? value<P, E>(
                createContext({
                  widget: widget,
                  component: widget.component,
                }) || '',
              )
              : ''
          ),
      );

      widget.signal.dispatch(
        'style',
        createWidgetSignalableDispatcher<IStyle<P, E>, P, E>(widget, value),
      );

    }

    return widget;
  }


  static setClassName<P extends IProps, E extends IWidgetElements>(
    widget: IWidget<P, E>,
    values?: IClassNames<P, E>,
  ): IWidget<P, E> {

    if (values && widget.element instanceof HTMLElement) {

      switch (typeof values) {

        case 'string':

          values.split(' ').forEach(value => (widget.element instanceof HTMLElement)
            ? widget.element.classList.add(value)
            : undefined);

          break;

        case 'function':

          this.setClassName(widget, values(
            createContext({
              widget: widget,
              component: widget.component,
            })),
          );

          break;

        default:

          if (Array.isArray(values)) values.map(value => this.setClassName(widget, value));

          break;

      }

      widget.signal.dispatch('className', createWidgetSignalableDispatcher<IClassNames<P, E>, P, E>(widget, values));

    }

    return widget;
  }


  static setValue<P extends IProps, E extends IWidgetElements>(
    widget: IWidget<P, E>,
    value?: string,
  ) {

    const element = allowEditableElement(widget.element);

    value = value || '';

    if (element) element.value = value;

    else if (widget.element instanceof HTMLElement) widget.element.innerHTML = value;

    else widget.element.append(document.createTextNode(value));

    widget.signal.dispatch(
      'value',
      createWidgetSignalableDispatcher<string | undefined, P, E>(widget, value),
    );

    return widget;

  }


  static setHtml<P extends IProps, E extends IWidgetElements>(
    widget: IWidget<P, E>,
    value?: string,
  ): IWidget<P, E> {

    if (widget.element instanceof HTMLElement) widget.element.innerHTML = `${value}`;

    else if (widget.element instanceof DocumentFragment) widget.element.textContent = `${value}`;

    widget.signal.dispatch(
      'html',
      createWidgetSignalableDispatcher<string | undefined, P, E>(widget, value),
    );

    return widget;
  }


  static setTrigger<P extends IProps, E extends IWidgetElements>(
    widget: IWidget<P, E>,
    type ?: keyof HTMLElementEventMap,
  ): IWidget<P, E> {

    type = type || 'click';

    /* @ts-ignore */
    if (widget.element instanceof HTMLElement && type in widget.element && typeof widget.element[type] == 'function') {
      /* @ts-ignore */
      widget.element[type || 'click']();

      widget.signal.dispatch(
        'trigger',
        createWidgetSignalableDispatcher<keyof HTMLElementEventMap, P, E>(widget, type),
      );

    }

    return widget;
  }


  static setAttribute<P extends IProps, E extends IWidgetElements, A extends keyof P>(
    widget: IWidget<P, E>,
    name: A,
    value: P[A] | IDataValue,
  ): IWidget<P, E> {

    if (widget.element instanceof HTMLElement) {

      if (value === null) {

        widget.element.setAttribute(`${name as string}`, '');

      } else if (value === undefined) {

        widget.element.removeAttribute(`${name as string}`);

      } else if (typeof value == 'string' || typeof value == 'number') {

        widget.element.setAttribute(`${name as string}`, `${value}`);

      } else if (typeof value == 'boolean') {

        if (value) widget.element.setAttribute(`${name as string}`, `${name as string}`);

        else widget.element.removeAttribute(`${name as string}`);

      } else if (typeof value == 'object') {

        widget.element.setAttribute(`${name as string}`, `${JSON.stringify(value)}`);

      } else {

        console.error('Attribute of', name, value);

        throw 'unsupported attribute';

      }

      widget.signal.dispatch(
        'attributes',
        createWidgetSignalableDispatcher<IWidgetAttributesMap<P>, P, E>(widget, {
          name, value,
        }),
      );

    }

    return widget;
  }


  static setAttribuable<P extends IProps, E extends IWidgetElements>(
    widget: IWidget<P, E>,
    name: string,
    value: IDataValue,
  ): IWidget<P, E> {

    if (!WIDGET_NATIVE_PROPS.includes(name)) {

      widget.attrib(
        name as keyof P,
        this.parseValue<P, E, P[keyof P]>(
          widget,
          value,
        ),
      );

    }

    return widget;
  }


  static parseValue<P extends IProps, E extends IWidgetElements, V>(
    widget: IWidget<P, E>,
    value: IDataValue,
  ): V {

    switch (typeof value) {

      case 'function':
        return value(
          createContext<P, E>({
            widget: widget,
            component: widget.component,
          }),
        ) as V;

      default:
        return value as V;

    }

  }

}