import {IWidgetNode} from "./widget";


export type IComposite<Props> = (props: Props) => IWidgetNode<any, any>