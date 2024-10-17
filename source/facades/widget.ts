import type {
  ICommonAttributes,
  IAttributesScope,
} from '../types';
import {WidgetNode} from '../supports';

export function Widget(props: IAttributesScope<ICommonAttributes, HTMLElement>) {

  return (new WidgetNode<ICommonAttributes, HTMLElement>(props));

}