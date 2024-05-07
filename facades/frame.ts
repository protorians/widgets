import type {IWidgetProps, ICommonProps} from '../types';
import {WidgetFrame} from '../supports';

export function frame(props: IWidgetProps<ICommonProps, HTMLElement>) {
  return (new WidgetFrame(props));
}