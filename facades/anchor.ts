import type {IWidgetProps, IAnchorProps} from '../types';
import {WidgetAnchor} from '../supports';

export function Anchor(props: IWidgetProps<IAnchorProps, HTMLAnchorElement>) {
  return (new WidgetAnchor(props));
}