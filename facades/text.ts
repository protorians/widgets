import type {
    ICommonProps,
    IWidgetProps,
    IStateSchema
} from "../types/index";
import { TextWidget } from "../supports/text";


export function textWidget<S extends IStateSchema>(props: string | IWidgetProps<ICommonProps, S, HTMLSpanElement>) {

    if (typeof props == 'string') props = { child: props }

    return (new TextWidget<S>(props)).render()

}