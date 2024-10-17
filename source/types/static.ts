import { IAttributes } from './attributes';
import { IWidgetElements  } from './widget';
import { WidgetNode } from '../supports';


export type IStaticWidgetNode<P extends IAttributes,  E extends IWidgetElements> = typeof WidgetNode<P,  E>;