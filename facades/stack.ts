import type {IWidgetProps, ICommonProps} from '../types';
import {WidgetStack} from '../supports';

export function stack(props: IWidgetProps<ICommonProps, HTMLElement>) {
  return (new WidgetStack(props));
}