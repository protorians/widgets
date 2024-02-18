import type {
    IPictureProps,
    IPictureSourceProps,
    IStateSchema,
    IWidget
} from "../types";
import { Widget } from "./widget";



export class PictureSourceWidget<S extends IStateSchema>

    extends Widget<IPictureSourceProps, S, HTMLSourceElement>

    implements IWidget<IPictureSourceProps, S, HTMLSourceElement>

{

    get tagname(): string {
        return 'source'
    }

}


export default class PictureWidget<S extends IStateSchema>

    extends Widget<IPictureProps, S, HTMLSourceElement>

    implements IWidget<IPictureProps, S, HTMLSourceElement>

{

    get tagname(): string {
        return 'picture'
    }

}
