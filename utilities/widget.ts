import type {
  IProps,
  IWidget,
  IWidgetElements,
  IWidgetSignalableDispatcher,
} from '../types';
import {createContext} from '../foundation';

export function createWidgetSignalableDispatcher<T, P extends IProps, E extends IWidgetElements>(
  widget: IWidget<P, E>,
  payload: T,
): IWidgetSignalableDispatcher<T, P, E> {

  return {
    context: createContext<P, E>({
      widget,
      component: widget.component,
    }),
    payload,
  };

}