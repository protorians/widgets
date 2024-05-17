import type {
  IAttributesScope ,
  IColumnAttributes ,
  IRowAttributes ,
  ISectionAttributes,
} from '../types';
import { WidgetColumn , WidgetRow , WidgetSection } from '../supports';

export function Section(props: IAttributesScope<ISectionAttributes, HTMLElement>) {
  return (new WidgetSection(props));
}

export function Row(props: IAttributesScope<IRowAttributes, HTMLElement>) {
  return (new WidgetRow(props));
}

export function Column(props: IAttributesScope<IColumnAttributes, HTMLElement>) {
  return (new WidgetColumn(props));
}

