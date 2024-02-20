import { IProps } from "./props";
import { IStateSchema } from "./state";
import { IWidget, IWidgetElements } from "./widget";



export type IComponentConstruct<Props> = (props: Props) =>
    IWidget<IProps, IStateSchema, IWidgetElements>