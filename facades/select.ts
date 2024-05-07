import type {IWidgetProps, ISelectProps} from '../types';
import {WidgetSelect} from '../supports';

export function select(props: IWidgetProps<ISelectProps, HTMLSelectElement>) {
  return (new WidgetSelect(props));
}
