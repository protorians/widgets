import type {
    ISelectProps,
    IStateSchema,
    IWidget
} from "../types";
import { Widget } from "./widget";



export default class SelectWidget<S extends IStateSchema>

    extends Widget<ISelectProps, S, HTMLTextAreaElement>

    implements IWidget<ISelectProps, S, HTMLTextAreaElement>

{

    get tagname(): string {
        return 'select'
    }

}