import {
  IProps,
  IReference,
  IWidget,
  IWidgetElements
} from '../types';
import {WidgetElementMetrics} from './elements';


export class ReferenceWidget<P extends IProps, E extends IWidgetElements> implements IReference<P, E>{

  #widget: IWidget<P, E> | undefined;

  get widget() {
    return this.#widget;
  };

  use(widget: IWidget<P, E>){

    this.#widget = widget;

    return this;

  }

  metrics(){
    return this.widget ? (new WidgetElementMetrics(this.widget)) : undefined;
  }

}