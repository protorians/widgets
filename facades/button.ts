import type {IAttributesScope, IButtonAttributes} from '../types';
import {WidgetButton} from '../supports';

export function Button(props: string | IAttributesScope<IButtonAttributes, HTMLButtonElement>) {
  if (typeof props == 'string') props = {child: props};
  return (new WidgetButton(props));
}