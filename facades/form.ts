import type {
  IAttributesScope,
  IFormAttributes,
  IInputAttributes,
  ILabelAttributes
} from '../types';
import {
  WidgetForm,
  WidgetInput,
  WidgetLabel
} from '../supports';

export function Form(props: IAttributesScope<IFormAttributes, HTMLFormElement>) {
  return (new WidgetForm(props));
}

export function Input(props: IAttributesScope<IInputAttributes, HTMLInputElement>) {
  return (new WidgetInput(props as IAttributesScope<IInputAttributes, HTMLInputElement>));
}

export function Label(props: IAttributesScope<ILabelAttributes, HTMLLabelElement>) {
  return (new WidgetLabel(props as IAttributesScope<ILabelAttributes, HTMLLabelElement>));
}