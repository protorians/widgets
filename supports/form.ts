import type { IFormProps, IStateSchema, IWidget } from "../types";
import { Widget } from "./widget";



export class FormWidget<S extends IStateSchema>

    extends Widget<IFormProps, S, HTMLTextAreaElement>

    implements IWidget<IFormProps, S, HTMLTextAreaElement>

{

    get tagname(): string {
        return 'iframe'
    }

}