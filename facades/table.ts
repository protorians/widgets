import type {IWidgetProps, ICommonProps, ITableCellProps} from '../types';
import {
  WidgetTableBody,
  WidgetTableCaption,
  WidgetTableCell,
  WidgetTableFoot,
  WidgetTableHead,
  WidgetTableRow,
  WidgetTable,
} from '../supports';


export function Table(props: IWidgetProps<ICommonProps, HTMLTableElement>) {
  return (new WidgetTable(props));
}

export function TableCell(props: IWidgetProps<ITableCellProps, HTMLTableCellElement>) {
  return (new WidgetTableCell(props));
}

export function TableRow(props: IWidgetProps<ICommonProps, HTMLTableRowElement>) {
  return (new WidgetTableRow(props));
}

export function TableFoot(props: IWidgetProps<ICommonProps, HTMLTableSectionElement>) {
  return (new WidgetTableFoot(props));
}

export function TableBody(props: IWidgetProps<ICommonProps, HTMLTableSectionElement>) {
  return (new WidgetTableBody(props));
}

export function TableHead(props: IWidgetProps<ITableCellProps, HTMLTableCellElement>) {
  return (new WidgetTableHead(props));
}

export function TableCaption(props: IWidgetProps<ICommonProps, HTMLTableCaptionElement>) {
  return (new WidgetTableCaption(props));
}
