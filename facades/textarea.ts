import type {
  ITextareaProps,
  IWidgetProps,
} from '../types';
import {TextareaWidget} from '../supports';


export function textarea(props: string | Omit<IWidgetProps<ITextareaProps, HTMLTextAreaElement>, 'child'>) {

  if (typeof props == 'string') props = {value: props};

  return (new TextareaWidget(props));

}