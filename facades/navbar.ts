import type {IWidgetProps, INavProps} from '../types';
import {WidgetNavbar} from '../supports';

export function Navbar(props: IWidgetProps<INavProps, HTMLElement>) {
  return (new WidgetNavbar(props));
}

