import type {IAttributesScope, IAttributes, IWidgetElements} from '../types';
import {WidgetNode} from '../supports';

export function Customw<P extends IAttributes, E extends IWidgetElements>(props: IAttributesScope<P, E>) {
  return (new WidgetNode<P, E>(props));
}