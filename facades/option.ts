import type {IWidgetProps, IOptionProps, IOptionGroupProps} from '../types';
import {OptionGroupWidget, OptionWidget} from '../supports';

export function option(props: IWidgetProps<IOptionProps, HTMLOptionElement>) {
  return (new OptionWidget(props));
}

export function optionGroup(props: IWidgetProps<IOptionGroupProps, HTMLOptGroupElement>) {
  return (new OptionGroupWidget(props));
}
