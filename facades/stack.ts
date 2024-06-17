import type {
  IAttributesScope, 
  IColumnAttributes, 
  IGridAttributes, 
  IRowAttributes, 
  ISectionAttributes, 
} from '../types';
import {
  WidgetColumn, 
  WidgetGrid, 
  WidgetRow, 
  WidgetSection,
} from '../supports';

export function Section (props : IAttributesScope<ISectionAttributes,  HTMLElement>) {
  return (new WidgetSection(props));
}

export function Row (props : IAttributesScope<IRowAttributes,  HTMLElement>) {
  return (new WidgetRow(props));
}

export function Column (props : IAttributesScope<IColumnAttributes,  HTMLElement>) {
  return (new WidgetColumn(props));
}

export function Grid (props : IAttributesScope<IGridAttributes,  HTMLElement>) {
  return (new WidgetGrid(props));
}

