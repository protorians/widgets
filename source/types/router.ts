import type {IViewConstructor, IViewOptions} from "./view";
import {ViewWidget} from "../view";
import type {ISignalStack} from "./signals";


export type IRouterConfig<Scheme extends IRouterBaseScheme> = {
  useHash?: boolean;
  baseUrl?: string;
  index: keyof Scheme;
}

export type IRouteView<T extends Object> = IViewConstructor<T>

export type IRouterRoute<Scheme extends IRouterBaseScheme, K extends keyof Scheme> = {
  path: K;
  view: typeof ViewWidget<Scheme[K]>;
  options?: IViewOptions<Scheme[K]>
}

export type IRouterBaseRoute = {
  // method?: HttpMethod;
  parameters: string[];
  pattern: RegExp;
}

export interface IRouterBaseScheme {
  [K: string]: Object;
}

export type IRouterScheme<Scheme extends IRouterBaseScheme> = {
  [K in keyof Scheme]: IRouterRoute<Scheme, K> & IRouterBaseRoute
}

export interface IRouter<Scheme extends IRouterBaseScheme> {
  readonly config: IRouterConfig<Scheme>;

  signal: ISignalStack<IRouterSignalMap<Scheme>>;

  get routes(): IRouterScheme<Scheme>;

  get route(): (IRouterRoute<any, keyof any> & IRouterBaseRoute) | undefined;

  get url(): URL;

  get uri(): string;

  get host(): string;

  get port(): string;

  get protocol(): string;

  get secured(): boolean;

  query<K extends keyof Scheme>(): Scheme[K];

  use<K extends keyof Scheme>(route: IRouterRoute<Scheme, K>): this;

  open<K extends keyof Scheme>(to: string, props: Scheme[K]): this;

  resolve<K extends keyof Scheme>(uri: string, props: Scheme[K]): IRouterRoute<Scheme, keyof Scheme> & IRouterBaseRoute;

  parses(uri: string): IRouterBaseRoute;

  match(uri: string, regex: string): RegExpMatchArray | null;

  excavation(paramList: string[], match: RegExpMatchArray): Scheme[keyof Scheme];

  run(): this;
}


export type IRouteNavigateSignal<Scheme extends IRouterBaseScheme> = {
  params: Scheme[keyof Scheme];
  route: IRouterRoute<Scheme, keyof Scheme> & IRouterBaseRoute;
  props: Scheme[keyof Scheme];
}

export type IRouterSignalMap<Scheme extends IRouterBaseScheme> = {
  navigate: IRouteNavigateSignal<Scheme>;
}