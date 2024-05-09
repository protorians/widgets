import type {
  ITableBodyAttributes,
  ITableCaptionAttributes,
  ITableCellAttributes,
  ITableFooterAttributes,
  ITableHeadAttributes,
  ITableAttributes,
  ITableRowAttributes,
  IWidget,
} from '../types';
import {WidgetNode} from './widget';


export class WidgetTableCaption

  extends WidgetNode<ITableCaptionAttributes, HTMLTableCaptionElement>

  implements IWidget<ITableCaptionAttributes, HTMLTableCaptionElement> {

  get tag(): string {
    return 'caption';
  }

}


export class WidgetTableHead

  extends WidgetNode<ITableHeadAttributes, HTMLTableCellElement>

  implements IWidget<ITableHeadAttributes, HTMLTableCellElement> {

  get tag(): string {
    return 'th';
  }

}


export class WidgetTableBody

  extends WidgetNode<ITableBodyAttributes, HTMLTableSectionElement>

  implements IWidget<ITableBodyAttributes, HTMLTableSectionElement> {

  get tag(): string {
    return 'tbody';
  }

}

export class WidgetTableFoot

  extends WidgetNode<ITableFooterAttributes, HTMLTableSectionElement>

  implements IWidget<ITableFooterAttributes, HTMLTableSectionElement> {

  get tag(): string {
    return 'tfoot';
  }

}

export class WidgetTableRow

  extends WidgetNode<ITableRowAttributes, HTMLTableRowElement>

  implements IWidget<ITableRowAttributes, HTMLTableRowElement> {

  get tag(): string {
    return 'tr';
  }

}

export class WidgetTableCell

  extends WidgetNode<ITableCellAttributes, HTMLTableCellElement>

  implements IWidget<ITableCellAttributes, HTMLTableCellElement> {

  get tag(): string {
    return 'td';
  }

}

export class WidgetTable

  extends WidgetNode<ITableAttributes, HTMLTableElement>

  implements IWidget<ITableAttributes, HTMLTableElement> {

  get tag(): string {
    return 'table';
  }

}