import {IAttributes} from './attributes';
import {IWidget , IWidgetElements} from './widget';
import {IParameters} from './values';


export type IComponentConstruct<Parameters extends IParameters> = (props : Parameters) => IWidget<any , any>

export interface IComponent<Parameters extends IParameters> {
  get parameters () : Parameters | undefined;

  set widget (widget : IWidget<any , any>);

  get widget () : (IWidget<IAttributes , IWidgetElements>) | undefined;
}

export type IComponentRecord<T extends IParameters> = {
  component : IComponentConstruct<T>;
  element : CustomElementConstructor;
}

export type IComponentRecords = {
  [K : string] : IComponentRecord<any>
}

export type IComponentFunction<T extends IParameters> = IComponentRecord<T> | IComponent<T> | undefined