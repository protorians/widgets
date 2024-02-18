import type { IProps } from "./props";
import type { IStateSchema } from "./state";
import type {
    IWidget,
    IWidgetElements
} from "./widget"



export type IReferenceProps = {

    name: string;

}

export interface IReference<P extends IProps, S extends IStateSchema, E extends IWidgetElements> {

    name: string;

    widget: IWidget<P, S, E>;

}