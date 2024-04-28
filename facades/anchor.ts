import type {IWidgetProps, IAnchorProps} from '../types';
import {AnchorWidget} from '../supports';

export function anchor(props: IWidgetProps<IAnchorProps, HTMLAnchorElement>) {
  return (new AnchorWidget(props));
}