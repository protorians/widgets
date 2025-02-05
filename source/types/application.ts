import {IRouter, IRouterBaseScheme} from "./router";

export type IApplicationConfig<RouterScheme extends IRouterBaseScheme> = {
  target: string;
  router: IRouter<RouterScheme>;
}

export interface IApplication<RouterScheme extends IRouterBaseScheme> {
  readonly config: IApplicationConfig<RouterScheme>;
}