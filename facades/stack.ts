import type {IWidgetProps, ICommonProps} from '../types';
import {WidgetStack} from '../supports';

export function Stack(props: IWidgetProps<ICommonProps, HTMLElement>) {
  return (new WidgetStack(props));
}