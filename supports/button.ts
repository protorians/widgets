import type { IButtonProps, IStateSchema, IWidget } from "../types";
import { Widget } from "./widget";



export class ButtonWidget<S extends IStateSchema>

    extends Widget<IButtonProps, S, HTMLButtonElement>

    implements IWidget<IButtonProps, S, HTMLButtonElement>

{

    get tagname(): string { return 'button' }

}