import {IParameters} from './values';
import {IView , IViewsRoutes} from './view';
import {RouterMode} from '../constants';
import {IComponentConstruct} from './component';
import {ISignalables} from '@protorians/signalable';
import {ISignalListenOption} from '@protorians/signalable/types';


export type IRoutesScheme = {
  [K : string] : IParameters
}


export type IRouterErrors = {
  404 : IComponentConstruct<IParameters>;
  500 : IComponentConstruct<IParameters>;
}

export type IRouterSettings<Routes extends IRoutesScheme> = {
  index : keyof Routes;
  routes : IViewsRoutes<Routes>;
  mode? : RouterMode;
  errors? : IRouterErrors;
  signals?: Partial<{
    [K in keyof IRouterSignals]: ISignalListenOption<IViewsRoutes<Routes> , IRouterSignals[keyof IRouterSignals]>
  }>
}


export type IRouterPathPattern = {
  pattern : RegExp | string;
  params : string[];
}

export type IRoute = {
  name : string;
  uri : string;
  query : IParameters;
  view : IView<IParameters>;
  parameters : IParameters;
  props? : IParameters;
}

export type IRouterListen = (route? : IRoute) => void;

export type IRouterLinkPayload = {
  path : string;
  props? : IParameters;
};

export interface IRouter<Routes extends IRoutesScheme> {

  get route () : IRoute | undefined;

  get params () : Routes[keyof Routes];

  get query () : IParameters;

  get routeName () : keyof Routes;

  get path () : string;

  get absolutePathname(): string | keyof Routes;

  readonly settings : IRouterSettings<Routes>;

  ready : boolean;

  signals : ISignalables<IViewsRoutes<Routes> , IRouterSignals>

  pathPattern (path : string) : IRouterPathPattern;

  matches (pathname : string) : IRoute[];

  runtimes (listen : IRouterListen) : this;

  link(path: string, props?: Routes[keyof Routes]): this;

  load (path : string , props? : Routes[keyof Routes]) : IRoute | undefined;

}

export interface IRouterSignals {

  switch : IRoute | undefined;

  pending : IRouterLinkPayload;

  complete : IRoute | undefined;

  fail : IRoute | undefined;

}
