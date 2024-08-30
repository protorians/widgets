import {IComponentConstruct} from './component';
import {IRouterSettings , IRoutesScheme} from './router';
import {IParameters} from './values';

export type IViewsRoutes<Routes extends IRoutesScheme> = {
    [Key in keyof Routes]: IView<Routes[Key]>;
}

export type IViewOptions = {
    /**
     * @comingSoon : transition?: ITransitions<IWidget<any , HTMLElement>>
     */
}

export type IView<Props extends IParameters> = {
    readonly component : IComponentConstruct<Props>
    options?: IViewOptions;
}

export type IViews<Routes extends IRoutesScheme> = IComponentConstruct<IRouterSettings<Routes>>
