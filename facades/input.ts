import type {IWidgetProps, IInputProps} from '../types';
import {InputWidget} from '../supports';

export function input(props: Omit<IWidgetProps<IInputProps, HTMLInputElement>, 'child'>) {
  return (new InputWidget(props as IWidgetProps<IInputProps, HTMLInputElement>));
}