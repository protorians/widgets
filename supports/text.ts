import type { ICommonProps, IStateSchema, IWidget } from "../types";
import { Widget } from "./widget";



export default class TextWidget<S extends IStateSchema>

    extends Widget<ICommonProps, S, HTMLSpanElement>

    implements IWidget<ICommonProps, S, HTMLSpanElement>

{

    get tagname(): string {
        return 'span'
    }

}
