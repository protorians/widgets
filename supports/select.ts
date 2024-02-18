import type {
    IOptionGroupProps,
    IOptionProps,
    ISelectProps,
    IStateSchema,
    IWidget
} from "../types";
import { Widget } from "./widget";



export class OptionGroupWidget<S extends IStateSchema>

    extends Widget<IOptionGroupProps, S, HTMLOptGroupElement>

    implements IWidget<IOptionGroupProps, S, HTMLOptGroupElement>

{

    get tagname(): string { return 'optgroup' }

}


export class OptionWidget<S extends IStateSchema>

    extends Widget<IOptionProps, S, HTMLOptionElement>

    implements IWidget<IOptionProps, S, HTMLOptionElement>

{

    get tagname(): string { return 'option' }

}


export class SelectWidget<S extends IStateSchema>

    extends Widget<ISelectProps, S, HTMLSelectElement>

    implements IWidget<ISelectProps, S, HTMLSelectElement>

{

    get tagname(): string { return 'select' }

}