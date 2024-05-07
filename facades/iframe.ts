import type {IWidgetProps, IIFrameProps} from '../types';
import {WidgetIFrame} from '../supports';

export function iframe(props: IWidgetProps<IIFrameProps, HTMLIFrameElement>) {
  return (new WidgetIFrame(props));
}