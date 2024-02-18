import type { IWidgetElements } from "../types/widget";
import type { IContext, IContextuableWidget } from "../types/context";
import type { IProps } from "../types/props";
import type { IStateSchema, IStates } from "../types/state";
import { States } from "./state";



export class Context<
    P extends IProps,
    S extends IStateSchema,
    E extends IWidgetElements
> implements IContext<P, S, E>{

    #widget: IContextuableWidget<P, S, E>

    #state: IStates<S>

    constructor(widget: IContextuableWidget<P, S, E>, state?: IStates<S>) {

        this.#widget = widget

        this.#state = state || new States()

    }

    get widget(): IContextuableWidget<P, S, E> { return this.#widget; }

    get state(): IStates<S> { return this.#state }

}