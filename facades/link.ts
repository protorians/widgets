import type {IWidgetProps, ILinkProps} from '../types';
import { WidgetLink} from '../supports';

export function Link(props: IWidgetProps<ILinkProps, HTMLAnchorElement>) {
  return (new WidgetLink(props));
}