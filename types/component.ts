import {IAttributes} from './attributes';
import {IWidget, IWidgetElements} from './widget';
import {IObject} from './values';


export type IParameters = IObject;

export type IComponentConstruct<Parameters extends IParameters> = (props: Parameters) => IWidget<any, any>

export interface IComponent<Parameters extends IParameters> {

  get parameters(): Parameters | undefined;

  set widget(widget: IWidget<any, any>);

  get widget(): (IWidget<IAttributes, IWidgetElements>) | undefined;

}