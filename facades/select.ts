import type {IAttributesScope, ISelectAttributes} from '../types';
import {WidgetSelect} from '../supports';

export function Select(props: IAttributesScope<ISelectAttributes, HTMLSelectElement>) {
  return (new WidgetSelect(props));
}

