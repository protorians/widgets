import type {
  ICommonProps,
  IWidgetProps,
} from '../types';
import {WidgetText} from '../supports';


export function text(props: string | IWidgetProps<ICommonProps, HTMLSpanElement>) {

  if (typeof props == 'string') props = {child: props};

  return (new WidgetText(props));

}