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

export function table(props: IWidgetProps<ICommonProps, HTMLTableElement>) {
  return (new WidgetTable(props));
}

export function tableCell(props: IWidgetProps<ITableCellProps, HTMLTableCellElement>) {
  return (new WidgetTableCell(props));
}

export function tableRow(props: IWidgetProps<ICommonProps, HTMLTableRowElement>) {
  return (new WidgetTableRow(props));
}

export function tableFoot(props: IWidgetProps<ICommonProps, HTMLTableSectionElement>) {
  return (new WidgetTableFoot(props));
}

export function tableBody(props: IWidgetProps<ICommonProps, HTMLTableSectionElement>) {
  return (new WidgetTableBody(props));
}

export function tableHead(props: IWidgetProps<ITableCellProps, HTMLTableCellElement>) {
  return (new WidgetTableHead(props));
}

export function tableCaption(props: IWidgetProps<ICommonProps, HTMLTableCaptionElement>) {
  return (new WidgetTableCaption(props));
}
