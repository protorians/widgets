import {IAttributes , IParameters , IWidgetElements , IComposeConstruct , IWidget , ICompose} from '../types';
import {Component} from './component';


export function Compose<Parameters extends IParameters , P extends IAttributes , E extends IWidgetElements> (
  construct : IComposeConstruct<Parameters , P , E> ,
  initials : Parameters ,
): ICompose<Parameters, P, E> {

  return Component((props : Parameters): IWidget<P , E> => construct({...initials , ...props}));

}