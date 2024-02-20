import type {
    IProps,
    IStateSchema,
    IWidget,
    IWidgetElements
} from "../types";



export function registry<
    P extends IProps,
    S extends IStateSchema,
    E extends IWidgetElements
>(widget: () => IWidget<P, S, E>) {

    console.warn('Registry.Component', widget)

}