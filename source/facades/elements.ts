import {IAttributes, IWidget, IWidgetElements} from '../types';
import {WidgetElementMetrics} from '../foundation';

export function ElementMetrics<P extends IAttributes, E extends IWidgetElements>(widget: IWidget<P, E>) {
  return new WidgetElementMetrics(widget);
}