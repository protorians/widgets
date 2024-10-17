import type {IAttributesScope, ILinkAttributes} from '../types';
import { WidgetLink} from '../supports';

export function Link(props: IAttributesScope<ILinkAttributes, HTMLAnchorElement>) {
  return (new WidgetLink(props));
}