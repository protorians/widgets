import type {IAttributesScope, IIFrameAttributes} from '../types';
import {WidgetEmbedFrame} from '../supports';

export function EmbedFrame(props: IAttributesScope<IIFrameAttributes, HTMLIFrameElement>) {
  return (new WidgetEmbedFrame(props));
}