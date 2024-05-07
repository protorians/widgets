import type {IWidgetProps, ICommonProps} from '../types';
import {FrameWidget} from '../supports';

export function frame(props: IWidgetProps<ICommonProps, HTMLElement>) {
  return (new FrameWidget(props));
}