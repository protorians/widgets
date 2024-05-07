import type {IWidgetProps, IFooterProps} from '../types';
import {WidgetFooter} from '../supports';

export function Footer(props: IWidgetProps<IFooterProps, HTMLElement>) {
  return (new WidgetFooter(props));
}