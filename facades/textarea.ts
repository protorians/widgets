import type {
  ITextareaProps,
  IWidgetProps,
} from '../types';
import {WidgetTextarea} from '../supports';


export function textarea(props: string | Omit<IWidgetProps<ITextareaProps, HTMLTextAreaElement>, 'child'>) {

  if (typeof props == 'string') props = {value: props};

  return (new WidgetTextarea(props));

}