import type { IButtonProps, IWidget } from "../types";
import { WidgetNode } from "./widget";



export class WidgetButton

    extends WidgetNode<IButtonProps, HTMLButtonElement>

    implements IWidget<IButtonProps, HTMLButtonElement>

{

    get tag(): string { return 'button' }

}