import type {
  IWidgetProps,
  IInputProps,
} from '../types';
import {InputWidget} from '../supports';


export function inputWidget(props: Omit<IWidgetProps<IInputProps, HTMLInputElement>, 'child'>) {

  // props.child = undefined;

  return (new InputWidget(props as IWidgetProps<IInputProps, HTMLInputElement>));

}