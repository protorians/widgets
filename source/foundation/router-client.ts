import type {IClientRouter , IClientRouterSettings , IRoutesScheme} from '../types';
import {Router} from './router';


declare global {
  interface Window {
    __widget_client_router : IClientRouter<any>;
  }
}

export function clientRouter<Routes extends IRoutesScheme> () {
  return (window.__widget_client_router || undefined) as (IClientRouter<Routes> | undefined);
}

export function defineClientRouter<Routes extends IRoutesScheme> (settings : IClientRouterSettings<Routes>) {
  window.__widget_client_router = window.__widget_client_router || (new ClientRouter<Routes>(settings));
  return clientRouter<Routes>();
}

export class ClientRouter<Routes extends IRoutesScheme>
  extends Router<Routes>
  implements IClientRouter<Routes> {

  constructor (
    public readonly settings : IClientRouterSettings<Routes> ,
  ) {
    super(settings);
    this.settings.index = this.settings.index || '/';
  }

}