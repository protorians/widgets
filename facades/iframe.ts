import type {IWidgetProps, IIFrameProps} from '../types';
import {WidgetEmbedFrame} from '../supports';

export function EmbedFrame(props: IWidgetProps<IIFrameProps, HTMLIFrameElement>) {
  return (new WidgetEmbedFrame(props));
}