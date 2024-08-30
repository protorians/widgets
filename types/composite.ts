import {IWidget , IWidgetElements} from './widget';
import {IAttributes} from './attributes';
import {IParameters} from './values';


export type IComposite<Parameters extends IParameters, Attributes extends IAttributes, Element extends IWidgetElements> = (props: Parameters) => IWidget<Attributes , Element>

export type ICompositeConstruct<Parameters extends IParameters, Attributes extends IAttributes, Element extends IWidgetElements> = (props: Parameters) => IWidget<Attributes , Element>