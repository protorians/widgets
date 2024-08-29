import type {
  ITextareaAttributes,
  IAttributesScope,
} from '../types';
import {WidgetTextarea} from '../supports';


export function Textarea(props: string | Omit<IAttributesScope<ITextareaAttributes, HTMLTextAreaElement>, 'children'>) {

  if (typeof props == 'string') props = {value: props};

  return (new WidgetTextarea(props as IAttributesScope<ITextareaAttributes, HTMLTextAreaElement>));

}
