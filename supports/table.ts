import type {
  ITableBody,
  ITableCaption,
  ITableCellProps,
  ITableFooterProps,
  ITableHeadProps,
  ITableProps,
  ITableRowProps,
  IWidget,
} from '../types';
import {WidgetNode} from './widget';


export class WidgetTableCaption

  extends WidgetNode<ITableCaption, HTMLTableCaptionElement>

  implements IWidget<ITableCaption, HTMLTableCaptionElement> {

  get tag(): string {
    return 'caption';
  }

}


export class WidgetTableHead

  extends WidgetNode<ITableHeadProps, HTMLTableCellElement>

  implements IWidget<ITableHeadProps, HTMLTableCellElement> {

  get tag(): string {
    return 'th';
  }

}


export class WidgetTableBody

  extends WidgetNode<ITableBody, HTMLTableSectionElement>

  implements IWidget<ITableBody, HTMLTableSectionElement> {

  get tag(): string {
    return 'tbody';
  }

}

export class WidgetTableFoot

  extends WidgetNode<ITableFooterProps, HTMLTableSectionElement>

  implements IWidget<ITableFooterProps, HTMLTableSectionElement> {

  get tag(): string {
    return 'tfoot';
  }

}

export class WidgetTableRow

  extends WidgetNode<ITableRowProps, HTMLTableRowElement>

  implements IWidget<ITableRowProps, HTMLTableRowElement> {

  get tag(): string {
    return 'tr';
  }

}

export class WidgetTableCell

  extends WidgetNode<ITableCellProps, HTMLTableCellElement>

  implements IWidget<ITableCellProps, HTMLTableCellElement> {

  get tag(): string {
    return 'td';
  }

}

export class WidgetTable

  extends WidgetNode<ITableProps, HTMLTableElement>

  implements IWidget<ITableProps, HTMLTableElement> {

  get tag(): string {
    return 'table';
  }

}