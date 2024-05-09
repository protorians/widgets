import type {IAttributesScope, IStackAttributes} from '../types';
import {WidgetStack} from '../supports';

export function Stack(props: IAttributesScope<IStackAttributes, HTMLElement>) {
  return (new WidgetStack(props));
}