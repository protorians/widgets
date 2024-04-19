import type {
  ICommonProps,
  IWidgetProps,
} from '../types';
import {Widget} from '../supports';

export function widget(props: IWidgetProps<ICommonProps, HTMLElement>) {

  return (new Widget<ICommonProps, HTMLElement>(props));

}