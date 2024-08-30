import type {IAttributes} from './attributes';
import type {IWidget, IWidgetElements} from './widget';
import {IParameters} from './values';
import {IComponent} from './component';


export type IContext<Payload, P extends IAttributes, E extends IWidgetElements> = {
  widget: IWidget<P, E>;
  event?: Event;
  component?: IComponent<IParameters>;
  payload: Payload;
}

export type IContextuable<Payload, P extends IAttributes, E extends IWidgetElements> = IContext<Payload, P, E>
