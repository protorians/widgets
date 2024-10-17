import {IWidget , IWidgetElements} from './widget';
import {IAttributes} from './attributes';
import {IParameters} from './values';


export type ICompose<Parameters extends IParameters, Attributes extends IAttributes, Element extends IWidgetElements> = (props: Parameters) => IWidget<Attributes , Element>

export type IComposeConstruct<Parameters extends IParameters, Attributes extends IAttributes, Element extends IWidgetElements> = (props: Parameters) => IWidget<Attributes , Element>