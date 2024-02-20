import type { IProps } from "./props";
import type { IStateSchema } from "./state";
import type { IWidget, IWidgetElements } from "./widget";



export interface IEngine<
    P extends IProps,
    S extends IStateSchema,
    E extends IWidgetElements
> {

    get main(): IWidget<P, S, E>;

    render<T extends IWidget<IProps, IStateSchema, IWidgetElements>>(widget: T): T;


}