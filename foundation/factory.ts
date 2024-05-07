import type {
  IChildren, IClassNames, IPointer,
  IProps, IStyle, IWidget,
  IWidgetElements,
} from '../types';
import {PointerWidget} from './pointer';
import {createContext} from './context';
import {Widget} from '../supports';
import {allowEditableElement, createWidgetSignalableDispatcher} from '../utilities';


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

      } else if (value instanceof Widget) {

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
    value?: string
  ){

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
    value?: string
  ): IWidget<P, E>{

    if (widget.element instanceof HTMLElement) widget.element.innerHTML = `${value}`;

    else if (widget.element instanceof DocumentFragment) widget.element.textContent = `${value}`;

    widget.signal.dispatch(
      'html',
      createWidgetSignalableDispatcher<string | undefined, P, E>(widget, value),
    );

    return widget
  }



  static setTrigger<P extends IProps, E extends IWidgetElements>(
    widget: IWidget<P, E>,
    type ?: keyof HTMLElementEventMap
  ): IWidget<P, E>{

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

    return widget
  }



}