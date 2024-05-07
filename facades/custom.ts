import type {IWidgetProps, IProps, IWidgetElements} from '../types';
import {WidgetNode} from '../supports';

export function Customw<P extends IProps, E extends IWidgetElements>(props: IWidgetProps<P, E>) {
  return (new WidgetNode<P, E>(props));
}