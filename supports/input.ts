import type { IInputableProps, IStateSchema, IWidget } from "../types";
import { Widget } from "./widget";



export class InputWidget<S extends IStateSchema>

    extends Widget<IInputableProps, S, HTMLInputElement>

    implements IWidget<IInputableProps, S, HTMLInputElement>

{

    get tagname(): string { return 'input' }

}