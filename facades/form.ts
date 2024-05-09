import type {
  IWidgetProps,
  IFormProps,
  IInputProps,
  ILabelProps
} from '../types';
import {
  WidgetForm,
  WidgetInput,
  WidgetLabel
} from '../supports';

export function Form(props: IWidgetProps<IFormProps, HTMLFormElement>) {
  return (new WidgetForm(props));
}

export function Input(props: IWidgetProps<IInputProps, HTMLInputElement>) {
  return (new WidgetInput(props as IWidgetProps<IInputProps, HTMLInputElement>));
}

export function Label(props: IWidgetProps<ILabelProps, HTMLLabelElement>) {
  return (new WidgetLabel(props as IWidgetProps<ILabelProps, HTMLLabelElement>));
}