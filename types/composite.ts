import {IWidget , IWidgetElements} from './widget';
import {IAttributes} from './attributes';
import {IParameters} from './values';


export type ICompositeConstruct<Props extends IParameters, P extends IAttributes, E extends IWidgetElements> = (props: Props) => IWidget<P , E>