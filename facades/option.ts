import type {IAttributesScope, IOptionAttributes, IOptionGroupAttributes} from '../types';
import {WidgetOptionGroup, WidgetOption} from '../supports';

export function Option(props: IAttributesScope<IOptionAttributes, HTMLOptionElement>) {
  return (new WidgetOption(props));
}

export function OptionGroup(props: IAttributesScope<IOptionGroupAttributes, HTMLOptGroupElement>) {
  return (new WidgetOptionGroup(props));
}

