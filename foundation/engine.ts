import type {
    IProps,
    IStateSchema,
    IWidget,
    IWidgetElements
} from "../types";
import { IEngine } from "../types/engine";



export class WidgetEngine<
    P extends IProps,
    S extends IStateSchema,
    E extends IWidgetElements
> implements IEngine<P, S, E> {

    #main: IWidget<P, S, E>

    // #widget: IContextuableWidget<IProps, IStateSchema, IWidgetElements>;

    constructor(main: IWidget<P, S, E>) {

        this.#main = main;

        // this.#context = new WidgetContext(this);

    }

    get main(): IWidget<P, S, E> { return this.#main; }

    // get context(): IContextuable<P, S, E> { return this.#context }

    render<T extends IWidget<IProps, IStateSchema, IWidgetElements>>(widget: T): T {

        console.log('Render ', widget)

        return widget;

    }

}