import type {
  ICommonProps,
  ITableCellProps,
  IWidget,
} from '../types';
import {Widget} from './widget';


export class WidgetTableCaption

  extends Widget<ICommonProps, HTMLTableCaptionElement>

  implements IWidget<ICommonProps, HTMLTableCaptionElement> {

  get tag(): string {
    return 'caption';
  }

}


export class WidgetTableHead

  extends Widget<ITableCellProps, HTMLTableCellElement>

  implements IWidget<ITableCellProps, HTMLTableCellElement> {

  get tag(): string {
    return 'th';
  }

}


export class WidgetTableBody

  extends Widget<ICommonProps, HTMLTableSectionElement>

  implements IWidget<ICommonProps, HTMLTableSectionElement> {

  get tag(): string {
    return 'tbody';
  }

}

export class WidgetTableFoot

  extends Widget<ICommonProps, HTMLTableSectionElement>

  implements IWidget<ICommonProps, HTMLTableSectionElement> {

  get tag(): string {
    return 'tfoot';
  }

}

export class WidgetTableRow

  extends Widget<ICommonProps, HTMLTableRowElement>

  implements IWidget<ICommonProps, HTMLTableRowElement> {

  get tag(): string {
    return 'tr';
  }

}

export class WidgetTableCell

  extends Widget<ITableCellProps, HTMLTableCellElement>

  implements IWidget<ITableCellProps, HTMLTableCellElement> {

  get tag(): string {
    return 'td';
  }

}

export class WidgetTable

  extends Widget<ICommonProps, HTMLTableElement>

  implements IWidget<ICommonProps, HTMLTableElement> {

  get tag(): string {
    return 'table';
  }

}