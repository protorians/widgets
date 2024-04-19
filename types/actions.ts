import { IChildCallback } from "./children";
import {IProps} from './props';
import {IWidgetElements} from './widget';



export type IActions<P extends IProps, E extends IWidgetElements> = {

    [K in keyof HTMLElementEventMap]?: IChildCallback<P, E>

}