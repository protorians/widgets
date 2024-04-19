import type {IProps} from './props';
import type {IWidget, IWidgetElements} from './widget';
import {IObject} from './values';
import {IComponent} from './component';


export type IContext<P extends IProps, E extends IWidgetElements> = {

  widget: IWidget<P, E>;

  event?: Event;

  component?: IComponent<IObject>

}

export type IContextuable<P extends IProps, E extends IWidgetElements> = IContext<P, E>

// export type IContextuable = IContext<IProps, IWidgetElements>
//
// export type IContextuableWidget<P extends IProps, E extends IWidgetElements> = IWidget<P,  E> | IWidget<IProps, IWidgetElements>
//
// export interface IContext<P extends IProps, E extends IWidgetElements> {
//
//     get state(): IStates<IStateSchema>;
//
//     useState(name: string): this;
//
//     setState(payload: IStatePayload<IStateSchema>): this;
//
//     getState<S extends IStateSchema>(name: keyof S): IStates<S>[keyof IStates<S>];
//
//     useRef(name: string): this;
//
//     setRef(name: string, value: ISupportableValue): this;
//
//     render(widget: IWidget<P, E> | IWidget<IProps, IWidgetElements>): IWidget<P, E>;
//
// }