import type {IWidgetProps, IInputProps} from '../types';
import {WidgetInput} from '../supports';

export function Input(props: Omit<IWidgetProps<IInputProps, HTMLInputElement>, 'child'>) {
  return (new WidgetInput(props as IWidgetProps<IInputProps, HTMLInputElement>));
}