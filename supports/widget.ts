import type {
    IChildren,
    IProps,
    IWidget,
    IWidgetElements,
    IWidgetProps,
    IClassName,
    IStyle,
    IStateSchema
} from "../types";
import type { IContextuable } from "../types/context";
import { Context } from "./context";



export class Widget<P extends IProps, S extends IStateSchema, E extends IWidgetElements> implements IWidget<P, S, E>{

    #element: E = {} as E;

    #props: IWidgetProps<P, S, E>;

    #context: IContextuable<IProps, IStateSchema, IWidgetElements>;

    constructor(props: IWidgetProps<P, S, E>) {

        this.#props = props;

        this.#context = props.context || new Context(this);

    }

    get tagname(): string { return 'div'; }

    get element() { return this.#element = this.#element || document.createElement(this.tagname); }

    get props(): IWidgetProps<P, S, E> { return this.#props; }

    get context(): IContextuable<P, S, E> { return this.#context }


    initialize(): this {

        return this;

    }

    useContext<IP extends IProps, IS extends IStateSchema, IE extends IWidgetElements>(context: IContextuable<IP, IS, IE>): this {

        this.#context = context

        return this;

    }

    content(value: IChildren): this {

        console.log('set content', value)

        return this;

    }

    style(value: IStyle): this {

        console.log('set content', value)

        return this;

    }

    className(value: IClassName | IClassName[]): this {

        console.log('set className', value)

        return this;

    }

    render(): this {

        return this;

    }

}