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



export class Widget<P extends IProps, S extends IStateSchema, E extends IWidgetElements> implements IWidget<P, S, E>{

    #element: E = {} as E;

    #props: IWidgetProps<P, S, E>;

    constructor(props: IWidgetProps<P, S, E>) {

        this.#props = props;

    }

    get tagname(): string { return 'div'; }

    get element() { return this.#element = this.#element || document.createElement(this.tagname); }

    get props(): IWidgetProps<P, S, E> { return this.#props; }

    initialize(): this {

        return this;

    }

    // useContext<IP extends IProps, IS extends IStateSchema, IE extends IWidgetElements>(context: IContextuable<IP, IS, IE>): this {

    //     this.#context = context

    //     return this;

    // }

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

        console.log('widget.render', this.constructor.name)

        return this;

    }

}