import type { IProps } from "./props";
import type { IStatePayload, IStateSchema, IStates } from "./state";
import { ISupportableValue } from "./values";
import type { IWidget, IWidgetElements } from "./widget";


export type IContextuable<P extends IProps, S extends IStateSchema, E extends IWidgetElements> =
    IContext<P, S, E> | IContext<IProps, IStateSchema, IWidgetElements>

export type IContextuableWidget<P extends IProps, S extends IStateSchema, E extends IWidgetElements> =
    IWidget<P, S, E> | IWidget<IProps, S, IWidgetElements>



export interface IContext<P extends IProps, S extends IStateSchema, E extends IWidgetElements> {

    get widget(): IContextuableWidget<P, S, E>;

    get state(): IStates<S>;


    useState(name: string): this;

    setState(payload: IStatePayload<S>): this;


    useRef(name: string): IContextuableWidget<P, S, E>;

    setRef(name: string, value: ISupportableValue): this;

}