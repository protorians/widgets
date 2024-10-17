import type {IAttributesScope, IFrameAttributes} from '../types';
import {WidgetFrame} from '../supports';

export function Frame(props: IAttributesScope<IFrameAttributes, HTMLElement>) {
  return (new WidgetFrame(props));
}

