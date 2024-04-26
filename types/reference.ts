import type { IProps } from "./props";
import type {IWidget, IWidgetElements} from "./widget"
import type {IElementMetrics} from './element';


export interface IReference<P extends IProps, E extends IWidgetElements> {

    get widget(): IWidget<P, E> | undefined;

    use(widget: IWidget<P, E>): this;

    metrics(): IElementMetrics<P, E> | undefined;

}

export type IReferenceCallback<P extends IProps, E extends IWidgetElements> = (widget: IWidget<P, E>) => IReference<P, E>