import type { IAttributes } from "./attributes";
import type {IWidget, IWidgetElements} from "./widget"
import type {IElementMetrics} from './element';


export interface IReference<P extends IAttributes, E extends IWidgetElements> {

    get widget(): IWidget<P, E> | undefined;

    use(widget: IWidget<P, E>): this;

    metrics(): IElementMetrics<P, E> | undefined;

}

export type IReferenceCallback<P extends IAttributes, E extends IWidgetElements> = (widget: IWidget<P, E>) => IReference<P, E>