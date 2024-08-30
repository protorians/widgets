import {IAttributes , IParameters , IWidgetElements , ICompositeConstruct , IWidget , IComposite} from '../types';
import {Component} from './component';


export function Composite<Parameters extends IParameters , P extends IAttributes , E extends IWidgetElements> (
  construct : ICompositeConstruct<Parameters , P , E> ,
  initials : Parameters ,
): IComposite<Parameters, P, E> {

  return Component((props : Parameters): IWidget<P , E> => construct({...initials , ...props}));

}