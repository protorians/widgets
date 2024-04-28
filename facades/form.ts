import type {IWidgetProps, IFormProps} from '../types';
import {FormWidget} from '../supports';

export function form(props: IWidgetProps<IFormProps, HTMLFormElement>) {
  return (new FormWidget(props));
}