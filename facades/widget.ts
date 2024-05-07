import type {
  ICommonProps,
  IWidgetProps,
} from '../types';
import {WidgetNode} from '../supports';

export function Widget(props: IWidgetProps<ICommonProps, HTMLElement>) {

  return (new WidgetNode<ICommonProps, HTMLElement>(props));

}