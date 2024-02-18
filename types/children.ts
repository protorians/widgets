import type { IContext } from "./context";
import type { IProps } from "./props";
import type { IStateSchema } from "./state";
import { IDataValue } from "./values";
import type { IWidget, IWidgetElements } from "./widget";

export type IChildCallback = (
    context: IContext<IProps, IStateSchema, IWidgetElements>
) => IWidget<IProps, IStateSchema, IWidgetElements> | undefined;

export type IChild = IDataValue | IWidget<IProps, IStateSchema, IWidgetElements> | IChildCallback

export type IChildren = IChild | IChild[] | Promise<IChild>