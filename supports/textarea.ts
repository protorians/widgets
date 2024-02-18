import type { IStateSchema, ITextareaProps, IWidget } from "../types";
import { Widget } from "./widget";


export default class TextareaWidget<S extends IStateSchema>

    extends Widget<ITextareaProps, S, HTMLTextAreaElement>

    implements IWidget<ITextareaProps, S, HTMLTextAreaElement>

{

    get tagname(): string {
        return 'textarea'
    }

}
