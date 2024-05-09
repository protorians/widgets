import type { IButtonAttributes, IWidget } from "../types";
import { WidgetNode } from "./widget";



export class WidgetButton

    extends WidgetNode<IButtonAttributes, HTMLButtonElement>

    implements IWidget<IButtonAttributes, HTMLButtonElement>

{

    get tag(): string { return 'button' }

}