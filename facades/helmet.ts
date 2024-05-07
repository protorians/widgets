import type {IWidgetProps, IHelmetProps} from '../types';
import {WidgetHelmet} from '../supports';

export function Helmet(props: IWidgetProps<IHelmetProps, HTMLElement>) {
  return (new WidgetHelmet(props));
}