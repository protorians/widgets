import type {IWidgetProps, IFormProps} from '../types';
import {WidgetForm} from '../supports';

export function form(props: IWidgetProps<IFormProps, HTMLFormElement>) {
  return (new WidgetForm(props));
}