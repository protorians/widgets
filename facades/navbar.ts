import type {IWidgetProps, INavbarProps} from '../types';
import {WidgetNavbar} from '../supports';

export function Navbar(props: IWidgetProps<INavbarProps, HTMLElement>) {
  return (new WidgetNavbar(props));
}

