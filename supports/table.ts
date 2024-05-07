import type {
  ICommonProps,
  ITableCellProps,
  IWidget,
} from '../types';
import {WidgetNode} from './widget';


export class WidgetTableCaption

  extends WidgetNode<ICommonProps, HTMLTableCaptionElement>

  implements IWidget<ICommonProps, HTMLTableCaptionElement> {

  get tag(): string {
    return 'caption';
  }

}


export class WidgetTableHead

  extends WidgetNode<ITableCellProps, HTMLTableCellElement>

  implements IWidget<ITableCellProps, HTMLTableCellElement> {

  get tag(): string {
    return 'th';
  }

}


export class WidgetTableBody

  extends WidgetNode<ICommonProps, HTMLTableSectionElement>

  implements IWidget<ICommonProps, HTMLTableSectionElement> {

  get tag(): string {
    return 'tbody';
  }

}

export class WidgetTableFoot

  extends WidgetNode<ICommonProps, HTMLTableSectionElement>

  implements IWidget<ICommonProps, HTMLTableSectionElement> {

  get tag(): string {
    return 'tfoot';
  }

}

export class WidgetTableRow

  extends WidgetNode<ICommonProps, HTMLTableRowElement>

  implements IWidget<ICommonProps, HTMLTableRowElement> {

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

  extends WidgetNode<ICommonProps, HTMLTableElement>

  implements IWidget<ICommonProps, HTMLTableElement> {

  get tag(): string {
    return 'table';
  }

}