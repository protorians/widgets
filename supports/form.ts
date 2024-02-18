import type { IFormProps, IStateSchema, IWidget } from "../types";
import { Widget } from "./widget";



export class FormWidget<S extends IStateSchema>

    extends Widget<IFormProps, S, HTMLFormElement>

    implements IWidget<IFormProps, S, HTMLFormElement>

{

    get tagname(): string { return 'form' }

}