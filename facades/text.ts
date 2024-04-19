import type {
  ICommonProps,
  IWidgetProps,
} from '../types';
import {TextWidget} from '../supports';


export function textWidget(props: string | IWidgetProps<ICommonProps, HTMLSpanElement>) {

  if (typeof props == 'string') props = {child: props};

  return (new TextWidget(props));

}