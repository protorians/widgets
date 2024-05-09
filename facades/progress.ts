import type {IWidgetProps, IProgressProps} from '../types';
import {WidgetProgress} from '../supports';

export function Progress(props: IWidgetProps<IProgressProps, HTMLProgressElement>) {
  return (new WidgetProgress(props));
}

