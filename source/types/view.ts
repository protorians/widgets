import type {IWidgetNode} from "./widget";
import type {ISignalController} from "./signals";
import {IRouterBaseRoute, IRouterRoute} from "./router";

export type IViewMockupScheme = {
  [K in keyof IViewWidgets<any>]: IViewWidgets<any>[K]
}

export type IViewOptions<Props extends Object> = {
  mockup?: IViewMockup<Props>;
  // transition?: {
  //   entry: any;
  //   exit: any;
  // }
}

export type IViewStack = {
  collection: IViewWidgetCollection;
  route: IRouterRoute<any, keyof any> & IRouterBaseRoute;
}

export type IViewWidgetCollection = (IWidgetNode<any, any> | undefined)[]

export type IViewWidgets<Props extends Object> = {
  helmet(): IWidgetNode<any, any> | undefined;

  toolbox(): IWidgetNode<any, any> | undefined;

  navbar(): IWidgetNode<any, any> | undefined;

  body(props?: Props): IWidgetNode<any, any> | undefined;
}

export type IViewMockupView<Props extends Object> = IViewMockupScheme & IViewUsingMethods<Props>

export type IViewMockup<Props extends Object> = (scheme: IViewMockupView<Props>, props: Props) => IViewWidgetCollection

export type IViewUsingMethods<Props extends Object> = {
  useProps(props: Props): IView<Props>;
}

export interface IView<Props extends Object> extends IViewWidgets<Props>, IViewUsingMethods<Props> {
  get props(): Readonly<Props> | ISignalController<Props>;

  readonly options: IViewOptions<Props>;

  mounted(): void;

  unmounted(): void;
}

export interface IViewConstructor<Props extends Object> extends IView<Props> {
  new(options?: IViewOptions<Props>): IView<Props>
}
