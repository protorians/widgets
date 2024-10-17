import type { IAttributes } from "./attributes";
import { IParameterValue } from "./values";
import type { IWidget, IWidgetElements } from "./widget";
import {IContext} from './context';
import {IPointer} from './pointer';

export type IChildCallback<P extends IAttributes, E extends IWidgetElements> = (context: Partial<IContext<any, P, E>>) => void | IChild<P, E>;

export type IContextualChildCallback<Payload, P extends IAttributes, E extends IWidgetElements> = (context: Partial<IContext<Payload, P, E>>) => void | IChild<P, E>;

export type IChild<P extends IAttributes, E extends IWidgetElements> = IParameterValue | IWidget<P, E> | IChildCallback<P, E> | IContextualChildCallback<any, P, E> | IPointer<any, P, E>;

export type IChildOnly<P extends IAttributes, E extends IWidgetElements> = IParameterValue | IWidget<P, E>

export type IChildren<P extends IAttributes, E extends IWidgetElements> = IChild<P, E> | IChild<P, E>[] | Promise<IChild<P, E>>