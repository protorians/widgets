import type { IProps } from "./props";
import { IDataValue } from "./values";
import type { IWidget, IWidgetElements } from "./widget";
import {IContext} from './context';
import {IPointer} from './pointer';

export type IChildCallback<P extends IProps, E extends IWidgetElements> = (context: Partial<IContext<P, E>>) => void | IChild<P, E>;

export type IChild<P extends IProps, E extends IWidgetElements> = IDataValue | IWidget<P, E> | IChildCallback<P, E> | IPointer<P, E>;

export type IChildOnly<P extends IProps, E extends IWidgetElements> = IDataValue | IWidget<P, E>

export type IChildren<P extends IProps, E extends IWidgetElements> = IChild<P, E> | IChild<P, E>[] | Promise<IChild<P, E>>