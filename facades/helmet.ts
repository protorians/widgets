import type {IAttributesScope, IHelmetAttributes} from '../types';
import {WidgetHelmet} from '../supports';

export function Helmet(props: IAttributesScope<IHelmetAttributes, HTMLElement>) {
  return (new WidgetHelmet(props));
}