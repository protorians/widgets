import type {IAttributesScope, INavbarProps} from '../types';
import {WidgetNavbar} from '../supports';

export function Navbar(props: IAttributesScope<INavbarProps, HTMLElement>) {
  return (new WidgetNavbar(props));
}

