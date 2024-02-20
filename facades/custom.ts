import type {
    IWidgetProps,
    IStateSchema,
    IProps,
    IWidgetElements
} from "../types/index";
import { Widget } from "../supports/index";



export function customWidget<P extends IProps, S extends IStateSchema, E extends IWidgetElements>(props: IWidgetProps<P, S, E>) {

    return (new Widget<P, S, E>(props)).render()

}