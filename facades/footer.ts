import type {IWidgetProps, ICommonProps} from '../types';
import {FooterWidget} from '../supports';

export function footer(props: IWidgetProps<ICommonProps, HTMLElement>) {
  return (new FooterWidget(props));
}