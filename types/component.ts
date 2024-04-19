import {IProps} from './props';
import {IWidget, IWidgetElements} from './widget';
import {IObject} from './values';


export type IComponentConstruct<Props extends IObject> = (props: Props) => IWidget<IProps, IWidgetElements>

export interface IComponent<Props extends IObject> {

  get props(): Props | undefined;

  set widget(widget: IWidget<IProps, IWidgetElements>);

  get widget(): (IWidget<IProps, IWidgetElements>) | undefined;

}