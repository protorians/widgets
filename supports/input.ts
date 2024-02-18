import type { IInputableProps, IStateSchema, IWidget } from "../types";
import { Widget } from "./widget";



export default class InputWidget<S extends IStateSchema>

    extends Widget<IInputableProps, S, HTMLTextAreaElement>

    implements IWidget<IInputableProps, S, HTMLTextAreaElement>

{

    get tagname(): string {
        return 'input'
    }

}