import type {IProps} from './props';
import type {IWidget, IWidgetElements} from './widget';
import {IObject} from './values';
import {IComponent} from './component';


export type IContext<P extends IProps, E extends IWidgetElements> = {

  widget: IWidget<P, E>;

  event?: Event;

  component?: IComponent<IObject>

}

export type IContextuable<P extends IProps, E extends IWidgetElements> = IContext<P, E>
