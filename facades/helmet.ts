import type {IWidgetProps, ICommonProps} from '../types';
import {WidgetHelmet} from '../supports';

export function helmet(props: IWidgetProps<ICommonProps, HTMLElement>) {
  return (new WidgetHelmet(props));
}