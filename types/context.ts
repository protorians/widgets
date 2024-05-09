import type {IAttributes} from './attributes';
import type {IWidget, IWidgetElements} from './widget';
import {IObject} from './values';
import {IComponent} from './component';


export type IContext<P extends IAttributes, E extends IWidgetElements> = {

  widget: IWidget<P, E>;

  event?: Event;

  component?: IComponent<IObject>

}

export type IContextuable<P extends IAttributes, E extends IWidgetElements> = IContext<P, E>
