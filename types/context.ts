import type { IProps } from "./props";
import type { IStateSchema, IStates } from "./state";
import type { IWidget, IWidgetElements } from "./widget";


export type IContextuable<P extends IProps, S extends IStateSchema, E extends IWidgetElements> =
    IContext<P, S, E> | IContext<IProps, IStateSchema, IWidgetElements>

export type IContextuableWidget<P extends IProps, S extends IStateSchema, E extends IWidgetElements> =
    IWidget<P, S, E> | IWidget<IProps, S, IWidgetElements>



export interface IContext<P extends IProps, S extends IStateSchema, E extends IWidgetElements> {

    get widget(): IContextuableWidget<P, S, E>;

    get state(): IStates<S>;


    // useState(name: string): this;

    // getState(name: string): this;

    // setState(name: string, value: ISupportableValue): this;


    // useRef(name: string): this;

    // getRef(name: string): this;

    // setRef(name: string, value: ISupportableValue): this;

}