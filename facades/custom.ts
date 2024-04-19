import type {
    IWidgetProps,
    IProps,
    IWidgetElements
} from '../types';
import { Widget } from '../supports';



export function customWidget<P extends IProps, E extends IWidgetElements>(props: IWidgetProps<P, E>) {

    return (new Widget<P, E>(props))

}