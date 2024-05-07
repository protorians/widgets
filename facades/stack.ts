import type {IWidgetProps, ICommonProps} from '../types';
import {StackWidget} from '../supports';

export function stack(props: IWidgetProps<ICommonProps, HTMLElement>) {
  return (new StackWidget(props));
}