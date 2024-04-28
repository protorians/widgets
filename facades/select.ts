import type {IWidgetProps, ISelectProps} from '../types';
import {SelectWidget} from '../supports';

export function select(props: IWidgetProps<ISelectProps, HTMLSelectElement>) {
  return (new SelectWidget(props));
}
