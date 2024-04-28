import type {
  ICommonProps,
  ITableCellProps,
  IWidget,
} from '../types';
import {Widget} from './widget';


export class TableCaptionWidget

  extends Widget<ICommonProps, HTMLTableCaptionElement>

  implements IWidget<ICommonProps, HTMLTableCaptionElement> {

  get tag(): string {
    return 'caption';
  }

}


export class TableHeadWidget

  extends Widget<ITableCellProps, HTMLTableCellElement>

  implements IWidget<ITableCellProps, HTMLTableCellElement> {

  get tag(): string {
    return 'th';
  }

}


export class TableBodyWidget

  extends Widget<ICommonProps, HTMLTableSectionElement>

  implements IWidget<ICommonProps, HTMLTableSectionElement> {

  get tag(): string {
    return 'tbody';
  }

}

export class TableFootWidget

  extends Widget<ICommonProps, HTMLTableSectionElement>

  implements IWidget<ICommonProps, HTMLTableSectionElement> {

  get tag(): string {
    return 'tfoot';
  }

}

export class TableRowWidget

  extends Widget<ICommonProps, HTMLTableRowElement>

  implements IWidget<ICommonProps, HTMLTableRowElement> {

  get tag(): string {
    return 'tr';
  }

}

export class TableCellWidget

  extends Widget<ITableCellProps, HTMLTableCellElement>

  implements IWidget<ITableCellProps, HTMLTableCellElement> {

  get tag(): string {
    return 'td';
  }

}

export class TableWidget

  extends Widget<ICommonProps, HTMLTableElement>

  implements IWidget<ICommonProps, HTMLTableElement> {

  get tag(): string {
    return 'table';
  }

}