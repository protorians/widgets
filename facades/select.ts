import type {IWidgetProps, ISelectProps} from '../types';
import {WidgetSelect} from '../supports';

export function Select(props: IWidgetProps<ISelectProps, HTMLSelectElement>) {
  return (new WidgetSelect(props));
}

