import type {IWidgetProps, IButtonProps} from '../types';
import {ButtonWidget} from '../supports';

export function button(props: string | IWidgetProps<IButtonProps, HTMLButtonElement>) {
  if (typeof props == 'string') props = {child: props};
  return (new ButtonWidget(props));
}