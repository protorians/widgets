import type { IAnchorProps, IStateSchema, IWidget } from "../types";
import { Widget } from "./widget";



export class AnchorWidget<S extends IStateSchema>

    extends Widget<IAnchorProps, S, HTMLAnchorElement>

    implements IWidget<IAnchorProps, S, HTMLAnchorElement>

{

    get tagname(): string { return 'a' }

}