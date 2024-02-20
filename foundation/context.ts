import type { IWidgetElements } from "../types/widget";
import type { IContext, IContextuableWidget } from "../types/context";
import type { IProps } from "../types/props";
import type { IStatePayload, IStateSchema, IStates } from "../types/state";
import { WidgetStates } from "../supports/state";
import { IEngine } from "../types/engine";



export class WidgetContext<
    P extends IProps,
    S extends IStateSchema,
    E extends IWidgetElements
> implements IContext<P, S, E>{

    #engine: IEngine<P, S, E>

    // #widget: IContextuableWidget<P, S, E>

    #state: IStates<S>

    constructor(engine: IEngine<P, S, E>, state?: IStates<S>) {

        this.#state = state || new WidgetStates()

        this.#engine = engine

    }

    get engine(): IEngine<P, S, E> { return this.#engine; }

    get state(): IStates<S> { return this.#state }


    useState(name: string): this {

        console.log('useState', name)

        return this;

    }

    setState(payload: IStatePayload<S>): this {

        console.log('setState', payload)

        return this;

    }


    useRef(name: string): IContextuableWidget<P, S, E> {

        console.log('useRef', name)

        return this.engine.main;

    }

    setRef(name: string): this {

        console.log('setRef', name)

        return this;

    }

}