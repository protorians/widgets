import type {
  ICommonProps,
  IWidgetProps,
} from '../types';
import {WidgetSpan} from '../supports';


export function Span(props: string | IWidgetProps<ICommonProps, HTMLSpanElement>) {

  if (typeof props == 'string') props = {child: props};

  return (new WidgetSpan(props));

}

