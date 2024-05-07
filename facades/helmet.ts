import type {IWidgetProps, ICommonProps} from '../types';
import {HelmetWidget} from '../supports';

export function helmet(props: IWidgetProps<ICommonProps, HTMLElement>) {
  return (new HelmetWidget(props));
}