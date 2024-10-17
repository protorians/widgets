import type {IAttributesScope, ICommonAttributes, ITableCellAttributes} from '../types';
import {
  WidgetTableBody,
  WidgetTableCaption,
  WidgetTableCell,
  WidgetTableFoot,
  WidgetTableHead,
  WidgetTableRow,
  WidgetTable,
} from '../supports';


export function Table(props: IAttributesScope<ICommonAttributes, HTMLTableElement>) {
  return (new WidgetTable(props));
}

export function TableCell(props: IAttributesScope<ITableCellAttributes, HTMLTableCellElement>) {
  return (new WidgetTableCell(props));
}

export function TableRow(props: IAttributesScope<ICommonAttributes, HTMLTableRowElement>) {
  return (new WidgetTableRow(props));
}

export function TableFoot(props: IAttributesScope<ICommonAttributes, HTMLTableSectionElement>) {
  return (new WidgetTableFoot(props));
}

export function TableBody(props: IAttributesScope<ICommonAttributes, HTMLTableSectionElement>) {
  return (new WidgetTableBody(props));
}

export function TableHead(props: IAttributesScope<ITableCellAttributes, HTMLTableCellElement>) {
  return (new WidgetTableHead(props));
}

export function TableCaption(props: IAttributesScope<ICommonAttributes, HTMLTableCaptionElement>) {
  return (new WidgetTableCaption(props));
}
