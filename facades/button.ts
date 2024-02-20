import type {
    IWidgetProps,
    IStateSchema,
    IButtonProps
} from "../types/index";
import { ButtonWidget } from "../supports";


export function buttonWidget<S extends IStateSchema>(props: IWidgetProps<IButtonProps, S, HTMLButtonElement>) {

    if (typeof props == 'string') props = { child: props }

    return (new ButtonWidget<S>(props)).render()

}