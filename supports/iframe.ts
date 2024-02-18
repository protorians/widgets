import { IIFrameProps, IStateSchema, IWidget } from "../types";
import { Widget } from "./widget";


export class IFrameWidget<S extends IStateSchema>

    extends Widget<IIFrameProps, S, HTMLIFrameElement>

    implements IWidget<IIFrameProps, S, HTMLIFrameElement>

{

    get tagname(): string { return 'iframe' }

}