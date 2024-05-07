import type {IWidgetProps, IAnchorProps} from '../types';
import { WidgetLink} from '../supports';

export function Link(props: IWidgetProps<IAnchorProps, HTMLAnchorElement>) {
  return (new WidgetLink(props));
}