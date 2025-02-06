import {IRouter, IRouterBaseScheme} from "./router";

export type IApplicationConfig<RouterScheme extends IRouterBaseScheme> = {
  element: string;
  router: IRouter<RouterScheme>;
  targets?: string[];
  icon?: string;
  name?: string;
  title?: string;
}

export interface IApplication<RouterScheme extends IRouterBaseScheme> {
  readonly config: IApplicationConfig<RouterScheme>;
}