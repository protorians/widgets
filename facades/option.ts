import type {IWidgetProps, IOptionProps, IOptionGroupProps} from '../types';
import {WidgetOptionGroup, WidgetOption} from '../supports';

export function option(props: IWidgetProps<IOptionProps, HTMLOptionElement>) {
  return (new WidgetOption(props));
}

export function optionGroup(props: IWidgetProps<IOptionGroupProps, HTMLOptGroupElement>) {
  return (new WidgetOptionGroup(props));
}
