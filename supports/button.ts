import type { IButtonProps, IWidget } from "../types";
import { Widget } from "./widget";



export class ButtonWidget

    extends Widget<IButtonProps, HTMLButtonElement>

    implements IWidget<IButtonProps, HTMLButtonElement>

{

    get tag(): string { return 'button' }

}