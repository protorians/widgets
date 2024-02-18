import type { IContext } from "./context";
import type { IProps } from "./props";
import type { IStateSchema } from "./state";
import type { IWidget, IWidgetElements } from "./widget";

export type IChildCallback = (
    context: IContext<IProps, IStateSchema, IWidgetElements>
) => IWidget<IProps, IStateSchema, IWidgetElements>;

export type IChild = IWidget<IProps, IStateSchema, IWidgetElements> | IChildCallback

export type IChildren = IChild | IChild[] | Promise<IChild>