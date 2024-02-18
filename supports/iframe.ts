import { IIFrameProps, IStateSchema, IWidget } from "../types";
import { Widget } from "./widget";


export class IFrameWidget<S extends IStateSchema>

    extends Widget<IIFrameProps, S, HTMLTextAreaElement>

    implements IWidget<IIFrameProps, S, HTMLTextAreaElement>

{

    get tagname(): string {
        return 'iframe'
    }

}