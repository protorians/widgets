import type {IWidgetProps, IFrameProps} from '../types';
import {WidgetFrame} from '../supports';

export function Frame(props: IWidgetProps<IFrameProps, HTMLElement>) {
  return (new WidgetFrame(props));
}

