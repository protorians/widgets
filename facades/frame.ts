import type {IWidgetProps, ICommonProps} from '../types';
import {WidgetFrame} from '../supports';

export function Frame(props: IWidgetProps<ICommonProps, HTMLElement>) {
  return (new WidgetFrame(props));
}

