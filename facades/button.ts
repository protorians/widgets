import type {IWidgetProps, IButtonProps} from '../types';
import {WidgetButton} from '../supports';

export function button(props: string | IWidgetProps<IButtonProps, HTMLButtonElement>) {
  if (typeof props == 'string') props = {child: props};
  return (new WidgetButton(props));
}