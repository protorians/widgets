import type {
    ICommonProps,
    IStateSchema,
    IWidget
} from "../types";
import { Widget } from "./widget";



export class TableCaptionWidget<S extends IStateSchema>

    extends Widget<ICommonProps, S, HTMLTableCaptionElement>

    implements IWidget<ICommonProps, S, HTMLTableCaptionElement>

{

    get tagname(): string { return 'caption' }

}


export class TableHeadWidget<S extends IStateSchema>

    extends Widget<ICommonProps, S, HTMLTableCellElement>

    implements IWidget<ICommonProps, S, HTMLTableCellElement>

{

    get tagname(): string { return 'th' }

}


export class TableBodyWidget<S extends IStateSchema>

    extends Widget<ICommonProps, S, HTMLTableSectionElement>

    implements IWidget<ICommonProps, S, HTMLTableSectionElement>

{

    get tagname(): string { return 'tbody' }

}

export class TableFootWidget<S extends IStateSchema>

    extends Widget<ICommonProps, S, HTMLTableSectionElement>

    implements IWidget<ICommonProps, S, HTMLTableSectionElement>

{

    get tagname(): string { return 'tbody' }

}

export class TableRowWidget<S extends IStateSchema>

    extends Widget<ICommonProps, S, HTMLTableRowElement>

    implements IWidget<ICommonProps, S, HTMLTableRowElement>

{

    get tagname(): string { return 'tr' }

}

export class TableCellWidget<S extends IStateSchema>

    extends Widget<ICommonProps, S, HTMLTableCellElement>

    implements IWidget<ICommonProps, S, HTMLTableCellElement>

{

    get tagname(): string { return 'td' }

}

export default class TableWidget<S extends IStateSchema>

    extends Widget<ICommonProps, S, HTMLTableElement>

    implements IWidget<ICommonProps, S, HTMLTableElement>

{

    get tagname(): string { return 'table' }

}