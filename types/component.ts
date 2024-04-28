import {IProps} from './props';
import {IWidget, IWidgetElements} from './widget';
import {IObject} from './values';


export type IComponentConstruct<Props extends IObject> = (props: Props) => IWidget<any, any>

export interface IComponent<Props extends IObject> {

  get props(): Props | undefined;

  set widget(widget: IWidget<any, any>);

  get widget(): (IWidget<IProps, IWidgetElements>) | undefined;

}