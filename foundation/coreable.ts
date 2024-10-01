import type {
  IChildCallback ,
  IChildren ,
  IClassNames ,
  IParameterValue ,
  IEventListeners ,
  IEventStaticListeners ,
  IPointer ,
  IAttributes ,
  IExtendedAttributes ,
  IStyle ,
  IWidget ,
  IWidgetElements ,
  IStaticWidgetNode ,
  IAttributesScope ,
  IClassName ,
  ICoreableCompound ,
  ICoreableProperties ,
  ICoreablePropertyOptions ,
  ICoreableProperty ,
  IParameters , IClassNameCallback , IPrimitiveParameters ,
} from '../types';
import {PointerWidget} from './pointer';
import {createContext} from './context';
import {WidgetNode} from '../supports';
import {
  allowEditableElement , camelize ,
  decamelize ,
} from '../utilities';
import {WIDGET_NATIVE_PROPS} from '../constants';
import {WidgetPassiveElement} from './widget-passive';
import {Directives} from './directive';


export class CoreableCompound<P extends IAttributes , E extends IWidgetElements>
  implements ICoreableCompound<P , E> {

  construct : IStaticWidgetNode<P , E>;

  constructor (public widget : IWidget<P , E>) {
    this.construct = Coreable.construct(widget);
  }

  render () : this {
    return this;
  }

}


export class CoreableProperty<P extends IAttributes , E extends IWidgetElements>
  implements ICoreableProperty<P , E> {

  constructor (
    public name : Readonly<string> ,
    public value : IParameterValue ,
    public options : Readonly<ICoreablePropertyOptions> = {} as ICoreablePropertyOptions ,
  ) {
  }

  parse<V> (widget : IWidget<P , E>) : V {
    return Coreable.parseValue(widget , this.value) as V;
  }

}

export class CoreableProperties<P extends IAttributes , E extends IWidgetElements>
  extends CoreableCompound<P , E>
  implements ICoreableProperties<P , E> {

  parse (properties : Partial<IAttributesScope<P , E>>) : Partial<IAttributesScope<P , E>> | undefined {
    properties = {...properties , ...this.construct.properties<P , E>()};
    if (properties) {
      Object.entries(properties)
        .forEach(({0: name , 1: value}) => {
          if (value instanceof CoreableProperty) {
            const parsedValue = value.parse(this.widget);
            if (value.options.remove) {
            } else if (value.options.replace) {
              properties[value.name] = parsedValue;
            } else if (!value.options.replace) {
              properties[name] = parsedValue;
            }
          } else {
            properties[name] = value;
          }
        });
    }

    return properties;
  }

  sync (props : Partial<IAttributesScope<P , E>>) : Partial<IAttributesScope<P , E>> {
    props = this.parse(props) || ({} as Partial<IAttributesScope<P , E>>);
    return {
      ...props ,
      children: this.construct.child() || props.children ,
      signal: {...this.construct.signal() , ...props.signal} ,
      nsa: {...this.construct.ns() , ...props.nsa} ,
      data: {...this.construct.data() , ...props.data} ,
      on: {...this.construct.event() , ...props.on} ,
      listen: {...this.construct.listener() , ...props.listen} ,
      style: {...this.construct.style() , ...props.style} ,
      className: [
        ...(Array.isArray(this.construct.className()) ? this.construct.className() : [this.construct.className()]) as IClassName<P , E>[] ,
        ...(Array.isArray(props.className) ? props.className : [props.className]) as IClassName<P , E>[] ,
      ].filter(v => typeof v !== 'undefined') ,
    };
  }

}


export class Coreable {

  static Properties = CoreableProperties;

  static clear<P extends IAttributes , E extends IWidgetElements> (
    widget : IWidget<P , E> ,
  ) : IWidget<P , E> {
    if ('innerHTML' in widget.element) {
      widget.element.innerHTML = '';
    }
    return widget;
  }

  static children<P extends IAttributes , E extends IWidgetElements> (
    widget : IWidget<P , E> ,
    value? : IChildren<IAttributes , IWidgetElements> ,
  ) : IWidget<P , E> {

    if (value) {

      value = Directives.parse('children' , {widget , payload: value});

      if (value instanceof PointerWidget) {

        const r = (value as IPointer<IChildren<IAttributes , IWidgetElements> , P , E>).bind(widget).render().marker;

        if (r && r.current) {
          if (typeof HTMLElement !== 'undefined' && widget.element instanceof HTMLElement) {
            widget.element.append(
              Directives.parse('children.pointer' , {widget , payload: r.current}) ,
            );
          } else if (widget.element instanceof WidgetPassiveElement) {
            // widget.element.append(r.current)
          }
        }

      } else if (typeof value == 'object' && Array.isArray(value)) {

        value.forEach(c => widget.children(c));

      } else if (typeof value == 'function') {

        widget.children(value(createContext<IChildren<IAttributes , IWidgetElements> , IAttributes , IWidgetElements>({
          widget: widget as IWidget<any , any> ,
          component: widget.composite ,
          payload: value ,
        })));

      } else if (value instanceof Promise) {

        value.then(c => widget.children(c));

      } else if (value instanceof WidgetNode) {

        const child = value.useComposite(widget.composite).render();

        if (typeof HTMLElement !== 'undefined' && widget.element instanceof HTMLElement) {
          widget.element.append(child.element);
        } else if (widget.element instanceof WidgetPassiveElement) {
          widget.element.append(child.element);
        }

        child.defineParent(widget as IWidget<any , any>);

      } else if (typeof HTMLElement !== 'undefined' && (value instanceof HTMLElement || value instanceof DocumentFragment)) {
        if (widget.element instanceof HTMLElement) {
          widget.element.append(value);
        }
      } else if (value instanceof WidgetPassiveElement) {
        this.children(widget , value.toString());
      } else if (typeof value == 'string') {

        if (typeof HTMLElement !== 'undefined' && widget.element instanceof HTMLElement) {
          widget.element.append(document.createTextNode(value));
        } else if (widget.element instanceof WidgetPassiveElement) {
          widget.element.append(value);
        }

      } else {

        if (typeof HTMLElement !== 'undefined' && widget.element instanceof HTMLElement) {
          widget.element.append(document.createTextNode(`${value}`));
        } else if (widget.element instanceof WidgetPassiveElement && (value instanceof WidgetPassiveElement)) {
          widget.element.append(value);
        }

      }

      // widget.signal.dispatch(
      //   'child',
      //   createWidgetSignalableDispatcher<IChildren<IAttributes,  IWidgetElements>,  P,  E>(widget,  value),
      // );

    }

    return widget;

  }


  static listen<P extends IAttributes , E extends IWidgetElements> (
    widget : IWidget<P , E> ,
    type : keyof HTMLElementEventMap ,
    listener : IChildCallback<P , E> ,
    options? : boolean | AddEventListenerOptions ,
  ) : IWidget<P , E> {

    if (typeof HTMLElement !== 'undefined' && widget.element instanceof HTMLElement) {

      widget.element.addEventListener(type , event => listener(
        createContext<keyof HTMLElementEventMap , P , E>({
          widget: widget ,
          component: widget.composite ,
          event ,
          payload: type ,
        }) ,
      ) , options);

      // widget.signal.dispatch(
      //   'listen',
      //   createWidgetSignalableDispatcher<IWidgetListenerMap<P,  E>,  P,  E>(widget,  {
      //     type,
      //     listener,
      //     options,
      //   }),
      // );

    } else if (widget.element instanceof WidgetPassiveElement) {
    }

    return widget;
  }


  static listens<P extends IAttributes , E extends IWidgetElements> (
    widget : IWidget<P , E> ,
    listeners : IEventListeners<P , E> ,
  ) : IWidget<P , E> {

    Object.entries(listeners)
      .forEach(({0: type , 1: callback}) => {

        if (typeof callback == 'function') {
          widget.listen(type as keyof HTMLElementEventMap , callback , false);
        } else if (typeof callback == 'object') {
          widget.listen(type as keyof HTMLElementEventMap , callback.call , callback.options);
        }

      });

    return widget;
  }

  static ons<P extends IAttributes , E extends IWidgetElements> (
    widget : IWidget<P , E> ,
    listeners : IEventStaticListeners<P , E> ,
  ) : IWidget<P , E> {

    Object.entries(listeners)
      .forEach(({0: type , 1: callback}) =>
        this.on(
          widget ,
          type as keyof IEventStaticListeners<P , E> ,
          callback as IEventStaticListeners<P , E>[ keyof IEventStaticListeners<P , E> ] ,
        ) ,
      );

    return widget;
  }

  static on<P extends IAttributes , E extends IWidgetElements , V extends keyof IEventStaticListeners<P , E>> (
    widget : IWidget<P , E> ,
    type : V ,
    listener : IEventStaticListeners<P , E>[V] ,
  ) : IWidget<P , E> {

    if (typeof HTMLElement !== 'undefined' && widget.element instanceof HTMLElement) {
      // @ts-ignore
      widget.element[`on${type.toLowerCase()}`] = (e : Event) => {

        if (typeof listener == 'undefined') e.preventDefault();

        else if (listener === null) {
          // @ts-ignore
          widget.element[`on${type.toLowerCase()}`] = null;
        } else if (typeof listener == 'boolean') {
          return listener;
        } else if (typeof listener == 'function') {
          return listener(
            createContext<V , P , E>({
              widget: widget ,
              event: e ,
              component: widget.composite ,
              payload: type ,
            }) ,
          );
        }

      };

      // widget.signal.dispatch(
      //   'on',
      //   createWidgetSignalableDispatcher<IEventStaticListenerPayload<V,  P,  E>,  P,  E>(widget,  {
      //     type,
      //     listener,
      //   }),
      // );

    } else if (widget.element instanceof WidgetPassiveElement) {
    }
    return widget;
  }


  static data<P extends IAttributes , E extends IWidgetElements> (
    widget : IWidget<P , E> ,
    data? : IExtendedAttributes ,
  ) : IWidget<P , E> {

    if (typeof HTMLElement !== 'undefined' && data && widget.element instanceof HTMLElement) {
      Object.entries(data).forEach(
        ({0: name , 1: value}) =>
          (widget.element instanceof HTMLElement)
            ? widget.element.dataset[decamelize(name , '-')] = `${value}`
            : undefined ,
      );

      // widget.signal.dispatch(
      //   'data',
      //   createWidgetSignalableDispatcher<IExtendedAttributes,  P,  E>(widget,  data),
      // );

    } else if (data) {
      Object.entries(data)
        .forEach(([key , value]) => {
          if (widget.element instanceof WidgetPassiveElement)
            widget.element.dataset[camelize(key)] = value as IPrimitiveParameters[keyof IPrimitiveParameters];
        });
    }

    return widget;
  }

  static construct<P extends IAttributes , E extends IWidgetElements> (widget : IWidget<P , E>) : IStaticWidgetNode<P , E> {
    return (widget.constructor as IStaticWidgetNode<P , E>);
  }

  static style<P extends IAttributes , E extends IWidgetElements> (
    widget : IWidget<P , E> ,
    value? : IStyle<P , E> ,
  ) : IWidget<P , E> {

    Object.entries(value as IStyle<P , E>)
      .forEach(({0: property , 1: value}) => {

        if (typeof HTMLElement !== 'undefined' && widget.element instanceof HTMLElement) {
          // @ts-ignore
          widget.element.style[property] = (typeof value == 'string')
            ? value as CSSStyleDeclaration[ keyof CSSStyleDeclaration ]
            : (
              typeof value == 'function'
                // @ts-ignore
                ? value<P , E>(
                  createContext({
                    widget: widget ,
                    component: widget.composite ,
                    payload: value ,
                  }) || '' ,
                )
                : ''
            );
        } else if (widget.element instanceof WidgetPassiveElement) {
          if (typeof value != 'function') {
            widget.element.style[property] = value;
          }
        }

      });

    // widget.signal.dispatch(
    //   'style',
    //   createWidgetSignalableDispatcher<IStyle<P,  E>,  P,  E>(widget,  value),
    // );

    return widget;
  }


  static className<P extends IAttributes , E extends IWidgetElements> (
    widget : IWidget<P , E> ,
    values? : IClassNames<P , E> ,
  ) : IWidget<P , E> {


    switch (typeof values) {

      case 'string':

        if (typeof HTMLElement !== 'undefined' && values && widget.element instanceof HTMLElement) {
          values.split(' ').forEach(value => ((widget.element instanceof HTMLElement) && value.trim().length)
            ? widget.element.classList.add(value)
            : undefined);

        } else if (widget.element instanceof WidgetPassiveElement) {
          widget.element.classList.add(values);
        }

        break;

      case 'function':

        if (typeof HTMLElement !== 'undefined' && values && widget.element instanceof HTMLElement) {
          this.className(widget , values(
            createContext<IClassNameCallback<P , E> , P , E>({
              widget: widget ,
              component: widget.composite ,
              payload: values ,
            })) ,
          );
        } else if (widget.element instanceof WidgetPassiveElement) {
          const clasName = values(
            createContext<IClassNameCallback<P , E> , P , E>({
              widget: widget ,
              component: widget.composite ,
              payload: values ,
            }));
          if (clasName) widget.element.classList.add(clasName);
        }

        break;

      default:
        if (Array.isArray(values)) values.map(value => value ? this.className(widget , value) : void (0));
        break;

    }

    // widget.signal.dispatch('className',  createWidgetSignalableDispatcher<IClassNames<P,  E>,  P,  E>(widget,  values));

    return widget;
  }


  static value<P extends IAttributes , E extends IWidgetElements> (
    widget : IWidget<P , E> ,
    value? : string ,
  ) {

    const editableElement = allowEditableElement(widget.element);

    value = value || '';

    if (editableElement) editableElement.value = value;

    else if ('innerHTML' in widget.element) {
      widget.element.innerHTML = value;
    }

    // widget.signal.dispatch(
    //   'value',
    //   createWidgetSignalableDispatcher<string | undefined,  P,  E>(widget,  value),
    // );

    return widget;

  }


  static html<P extends IAttributes , E extends IWidgetElements> (
    widget : IWidget<P , E> ,
    value? : string ,
  ) : IWidget<P , E> {

    if ('innerHTML' in widget.element) widget.element.innerHTML = `${value}`;

    else if ('textContent' in widget.element) widget.element.textContent = `${value}`;

    // widget.signal.dispatch(
    //   'html',
    //   createWidgetSignalableDispatcher<string | undefined,  P,  E>(widget,  value),
    // );

    return widget;
  }


  static trigger<P extends IAttributes , E extends IWidgetElements> (
    widget : IWidget<P , E> ,
    type ? : keyof HTMLElementEventMap ,
  ) : IWidget<P , E> {

    const eventName = (type || 'click') as keyof IWidgetElements;

    if (type && widget.element instanceof HTMLElement && type in widget.element && typeof widget.element[eventName] == 'function') {

      (widget.element[eventName] as Function)();

      // const event = new CustomEvent(`widget:${type}`);
      //
      // (widget.element[eventName] as Function)
      //   .apply(widget , [createContext({
      //     widget ,
      //     event,
      //     component: widget.component ,
      //     payload: undefined ,
      //   })]);

      // widget.element.dispatchEvent(event);

      // widget.signal.dispatch(
      //   'trigger',
      //   createWidgetSignalableDispatcher<keyof HTMLElementEventMap,  P,  E>(widget,  type),
      // );

    } else if (widget.element instanceof WidgetPassiveElement) {
    }

    return widget;

  }


  static remove<P extends IAttributes , E extends IWidgetElements> (
    widget : IWidget<P , E> ,
  ) : IWidget<P , E> {

    if (widget.element instanceof HTMLElement) widget.element.remove();

    else if (widget.element instanceof WidgetPassiveElement) widget.element.remove();

    // widget.signal.dispatch('remove',  createWidgetSignalableDispatcher<typeof widget,  P,  E>(widget,  widget));

    return widget;

  }


  static destroy<P extends IAttributes , E extends IWidgetElements> (
    widget : IWidget<P , E> | undefined ,
  ) : void {
    widget = undefined;
    return (() => widget)();
  }

  static nsa (nsa : IParameters , ns? : string , separator? : string) : IParameters {

    const prefix = (typeof ns != 'undefined' ? `${ns}${separator || '-'}` : '');
    let build : IParameters = {} as IParameters;

    Object.entries(nsa).forEach(([key , value]) => {
      const index = `${prefix}${decamelize(key , '-')}`;

      if (Array.isArray(value)) {
        build[index] = JSON.stringify(value);
      } else if (typeof value == 'object' && value) {
        build = {...build , ...this.nsa(({...value}) , index , separator)};
      } else if (typeof value != 'undefined') {
        build[index] = `${String(value).toString()}`;
      }
    });

    return build;
  }


  static attributes<P extends IAttributes , E extends IWidgetElements> (
    widget : IWidget<P , E> ,
    attributes : Partial<P> ,
  ) : IWidget<P , E> {

    Object.entries(attributes).forEach(([key , value]) => {
      widget.attrib(key as keyof P , value as P[keyof P]);
    });

    return widget;
  }


  static attribute<P extends IAttributes , E extends IWidgetElements , A extends keyof P> (
    widget : IWidget<P , E> ,
    name : A ,
    value : P[A] | IParameterValue ,
  ) : IWidget<P , E> {

    if (value === null && 'setAttribute' in widget.element) {

      widget.element.setAttribute(`${name as string}` , '');

    } else if (value === undefined && 'setAttribute' in widget.element) {

      widget.element.removeAttribute(`${name as string}`);

    } else if ((typeof value == 'string' || typeof value == 'number') && 'setAttribute' in widget.element) {

      widget.element.setAttribute(`${name as string}` , `${value}`);

    } else if (typeof value == 'boolean' && 'setAttribute' in widget.element && 'removeAttribute' in widget.element) {

      if (value) widget.element.setAttribute(`${name as string}` , `${name as string}`);

      else widget.element.removeAttribute(`${name as string}`);

    } else if (typeof value == 'object' && 'setAttribute' in widget.element) {

      widget.element.setAttribute(`${name as string}` , `${JSON.stringify(value)}`);

    } else {
      throw 'Widget ERR : unsupported attribute';
    }

    return widget;
  }


  static attribuable<P extends IAttributes , E extends IWidgetElements> (
    widget : IWidget<P , E> ,
    name : string ,
    value : IParameterValue ,
  ) : IWidget<P , E> {

    if (!WIDGET_NATIVE_PROPS.includes(name)) {

      widget.attrib(
        name as keyof P ,
        this.parseValue<P , E , P[keyof P]>(
          widget ,
          value ,
        ) ,
      );

    }

    return widget;
  }

  static parseValue<P extends IAttributes , E extends IWidgetElements , V> (
    widget : IWidget<P , E> ,
    value : IParameterValue ,
  ) : V {

    switch (typeof value) {

      case 'function':
        return value(
          createContext<IParameterValue , P , E>({
            widget: widget ,
            component: widget.composite ,
            payload: value ,
          }) ,
        ) as V;

      default:
        return value as V;

    }

  }


}