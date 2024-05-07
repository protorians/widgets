import type {IWidgetProps, IStackProps} from '../types';
import {WidgetStack} from '../supports';

export function Stack(props: IWidgetProps<IStackProps, HTMLElement>) {
  return (new WidgetStack(props));
}