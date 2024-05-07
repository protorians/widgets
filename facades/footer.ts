import type {IWidgetProps, ICommonProps} from '../types';
import {WidgetFooter} from '../supports';

export function footer(props: IWidgetProps<ICommonProps, HTMLElement>) {
  return (new WidgetFooter(props));
}