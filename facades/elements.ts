import {IProps, IWidget, IWidgetElements} from '../types';
import {WidgetElementMetrics} from '../foundation';


export function getMetrics<P extends IProps, E extends IWidgetElements>(widget: IWidget<P, E>){

  return new WidgetElementMetrics(widget);

}