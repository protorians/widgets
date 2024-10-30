import {
  IParameters ,
  IRoute ,
  IRouter ,
  IRouterListen ,
  IRouterPathPattern ,
  IRouterSettings ,
  IRouterSignals ,
  IRoutesScheme ,
  IViewsRoutes ,
} from '../types';
import {RouterMode} from '../constants';
import {type ISignalables , Signalables} from '@protorians/signalable';
import {RouterRequest} from './router-request';


export class Router<Routes extends IRoutesScheme> implements IRouter<Routes> {

  protected _route : IRoute | undefined = undefined;

  ready : boolean = false;

  signals : ISignalables<IViewsRoutes<Routes> , IRouterSignals>;

  constructor (
    public readonly settings : IRouterSettings<Routes> ,
  ) {
    this.settings.index = this.settings.index || '/';
    this.signals = new Signalables<IViewsRoutes<Routes> , IRouterSignals>(this.settings.routes);
  }

  get params () : Routes[keyof Routes] {
    return (this._route?.parameters || {}) as Routes[keyof Routes];
  }

  get query () : IParameters {
    return (this._route?.query || {}) as IParameters;
  }

  get route () : IRoute | undefined {
    return this._route;
  }

  get routeName () : keyof Routes {
    return (this.settings.mode == RouterMode.Hash ? location.hash : location.pathname) as keyof Routes;
  }

  get path () : string {
    return RouterRequest.adjustPath(this.settings.mode == RouterMode.Hash ? `/${location.hash.substring(1)}` : location.pathname);
  }

  get absolutePathname () : string {
    return (this.path == '/' ? this.settings.index : this.path) as string;
  }

  pathPattern (path : string) : IRouterPathPattern {

    if (path.includes(':')) {
      const rex = path.replace(/:(\w+)/g , '(.\\w)');
      return {
        pattern: rex ,
        params: [...path.matchAll(/:(\w+)/g)].map(arg => arg[1]) ,
      };
    }

    return {
      pattern: new RegExp(`^${path}$` , 'gi') ,
      params: [] ,
    };

  }

  matches (pathname : string) : IRoute[] {
    const explode = pathname.split('?');
    const uri = explode[0];
    const query = RouterRequest.query(explode[1]);

    return Object.entries(this.settings.routes).map(([name , view]) => {
      const rex = this.pathPattern(name);
      const match = uri.match(rex.pattern);
      const parameters : IParameters = {};

      if (match) {
        if (rex.params) {
          const parsing = [...uri.matchAll(rex.pattern as RegExp)];
          rex.params.map((p , index) => {
            parameters[p] = (parsing[index] && typeof parsing[index][1] != 'undefined') ? parsing[index][1] : undefined;
          });
        }
        return {name , view , parameters , uri , query} as IRoute;
      }

      return undefined;
    }).filter(view => typeof view != 'undefined') as IRoute[];

  }

  load (path : string , props? : Routes[keyof Routes]) : IRoute | undefined {

    this.signals.dispatch('pending' , {path , props});

    const route = this.matches(path)[0] || undefined;
    this._route = route || this._route;

    if (this._route) {
      this._route.props = props;
      this.signals.dispatch('switch' , this._route);
    } else if (!this._route) {
      this.signals.dispatch('fail' , this._route);
    }

    this.signals.dispatch('complete' , this._route);
    return route;
  }

  link (path : string , props? : Routes[keyof Routes]) : this {
    const uri = this.settings.mode == RouterMode.Hash ? `#${path}` : `${path}`;

    if (uri != this.absolutePathname) {
      window.history.pushState(props || null , document.title , uri);
    }

    this.load(path);
    return this;
  }

  runtimes (listen : IRouterListen) : this {
    if (!this.ready) {
      this.signals.listen('switch' , ({payload}) => listen(payload));
      window.addEventListener('popstate' , () => this.ready ? this.load(this.absolutePathname) : void (0));
    }

    this.ready = true;
    this.link(this.absolutePathname);

    if (this.settings.signals) {
      Object.entries(this.settings.signals)
        .forEach(([type , callback]) => {
          this.signals.listen(type as (keyof IRouterSignals), callback)
        });
    }

    return this;
  }

}