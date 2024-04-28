import type {IWidgetProps, ICommonProps, ITableCellProps} from '../types';
import {
  TableBodyWidget,
  TableCaptionWidget,
  TableCellWidget,
  TableFootWidget,
  TableHeadWidget,
  TableRowWidget,
  TableWidget,
} from '../supports';

export function table(props: IWidgetProps<ICommonProps, HTMLTableElement>) {
  return (new TableWidget(props));
}

export function tableCell(props: IWidgetProps<ITableCellProps, HTMLTableCellElement>) {
  return (new TableCellWidget(props));
}

export function tableRow(props: IWidgetProps<ICommonProps, HTMLTableRowElement>) {
  return (new TableRowWidget(props));
}

export function tableFoot(props: IWidgetProps<ICommonProps, HTMLTableSectionElement>) {
  return (new TableFootWidget(props));
}

export function tableBody(props: IWidgetProps<ICommonProps, HTMLTableSectionElement>) {
  return (new TableBodyWidget(props));
}

export function tableHead(props: IWidgetProps<ITableCellProps, HTMLTableCellElement>) {
  return (new TableHeadWidget(props));
}

export function tableCaption(props: IWidgetProps<ICommonProps, HTMLTableCaptionElement>) {
  return (new TableCaptionWidget(props));
}
