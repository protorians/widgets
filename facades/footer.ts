import type {IWidgetProps, ICommonProps} from '../types';
import {WidgetFooter} from '../supports';

export function Footer(props: IWidgetProps<ICommonProps, HTMLElement>) {
  return (new WidgetFooter(props));
}