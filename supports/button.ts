import type { IButtonProps, IWidget } from "../types";
import { Widget } from "./widget";



export class WidgetButton

    extends Widget<IButtonProps, HTMLButtonElement>

    implements IWidget<IButtonProps, HTMLButtonElement>

{

    get tag(): string { return 'button' }

}