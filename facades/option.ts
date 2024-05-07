import type {IWidgetProps, IOptionProps, IOptionGroupProps} from '../types';
import {WidgetOptionGroup, WidgetOption} from '../supports';

export function Option(props: IWidgetProps<IOptionProps, HTMLOptionElement>) {
  return (new WidgetOption(props));
}

export function OptionGroup(props: IWidgetProps<IOptionGroupProps, HTMLOptGroupElement>) {
  return (new WidgetOptionGroup(props));
}

