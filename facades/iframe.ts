import type {IWidgetProps, IIFrameProps} from '../types';
import {IFrameWidget} from '../supports';

export function iframe(props: IWidgetProps<IIFrameProps, HTMLIFrameElement>) {
  return (new IFrameWidget(props));
}