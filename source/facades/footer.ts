import type {IAttributesScope, IFooterAttributes} from '../types';
import {WidgetFooter} from '../supports';

export function Footer(props: IAttributesScope<IFooterAttributes, HTMLElement>) {
  return (new WidgetFooter(props));
}