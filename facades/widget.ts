import type {
    ICommonProps,
    IWidgetProps,
    IStateSchema
} from "../types/index";
import { Widget } from "../supports/index";



export function widget<S extends IStateSchema>(props: IWidgetProps<ICommonProps, S, HTMLElement>) {

    return new Widget<ICommonProps, S, HTMLElement>(props)

}