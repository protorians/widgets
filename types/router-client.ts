import {
  IRoutesScheme ,
  IRouter ,
  IRouterSettings ,
} from './router';
import {RouterMode} from '../constants';

export interface IClientRouterSettings<Routes extends IRoutesScheme> extends IRouterSettings<Routes>{
  mode? : RouterMode.Hash | RouterMode.Slash;
}

export interface IClientRouter<Routes extends IRoutesScheme> extends IRouter<Routes> {

}
