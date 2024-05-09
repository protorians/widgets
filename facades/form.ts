import type {IWidgetProps, IFormProps, IInputProps} from '../types';
import {WidgetForm, WidgetInput} from '../supports';

export function Form(props: IWidgetProps<IFormProps, HTMLFormElement>) {
  return (new WidgetForm(props));
}

export function Input(props: IWidgetProps<IInputProps, HTMLInputElement>) {
  return (new WidgetInput(props as IWidgetProps<IInputProps, HTMLInputElement>));
}