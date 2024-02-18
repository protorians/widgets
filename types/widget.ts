
import type {
    IClassName,
    IStyle,
    IReference,
    IChildren,
    IPropsExtended,
    IProps,
    IContextuable,
    IStates,
    IStateSchema
} from "./index";


export type IWidgetElements = Element | HTMLElement;

export type IWidgetProps<P extends IProps, S extends IStateSchema, E extends IWidgetElements> = P & {

    ref?: IReference<P, S, E>;

    state?: IStates<S>;

    child: IChildren | undefined;

    style?: IStyle;

    data?: IPropsExtended;

    ns?: IPropsExtended;

    context?: IContextuable<P, S, E>;

}

export interface IWidget<P extends IProps, S extends IStateSchema, E extends IWidgetElements> {


    get tagname(): string;

    get element(): E;

    get props(): IWidgetProps<P, S, E>;

    get context(): IContextuable<P, S, E>;


    initialize(): this;

    useContext(context: IContextuable<P, S, E>): this;


    content(value: IChildren): this;

    style(value: IStyle): this;

    className(value: IClassName[]): this;

    render(): this


}
