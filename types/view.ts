import {IComponentConstruct} from './component';
import {IRouterSettings , IRoutesScheme} from './router';
import {IObject} from './values';
import {ITransitions} from './transition';

export type IViewsRoutes<Routes extends IRoutesScheme> = {
    [Key in keyof Routes]: IView<Routes[Key]>;
}

export type IViewOptions = {
    transition?: ITransitions
}

export type IView<Props extends IObject> = {
    readonly component : IComponentConstruct<Props>
    options?: IViewOptions;
}

export type IViews<Routes extends IRoutesScheme> = IComponentConstruct<IRouterSettings<Routes>>
