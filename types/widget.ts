
import { IActions } from "./actions";
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

export type IWidgetProps<
    P extends IProps,
    S extends IStateSchema,
    E extends IWidgetElements
> = P & {

    ref?: IReference<P, S, E>;

    state?: IStates<S>;

    child: IChildren | undefined;

    style?: IStyle;

    data?: IPropsExtended;

    ns?: IPropsExtended;

    context?: IContextuable<P, S, E>;

    actions?: IActions;

}

export interface IWidget<P extends IProps, S extends IStateSchema, E extends IWidgetElements> {


    get tagname(): string;

    get element(): E;

    get props(): IWidgetProps<P, S, E>;


    initialize(): this;

    // useContext<IP extends IProps, IS extends IStateSchema, IE extends IWidgetElements>(context: IContextuable<IP, IS, IE>): this;


    content(value: IChildren): this;

    style(value: IStyle): this;

    className(value: IClassName[]): this;

    render(): this


}
