import type {IWidgetProps, INavProps} from '../types';
import {WidgetNav} from '../supports';

export function Nav(props: IWidgetProps<INavProps, HTMLElement>) {
  return (new WidgetNav(props));
}

