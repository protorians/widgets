import {IAttributes , IParameters , IWidgetElements , ICompositeConstruct} from '../types';
import {Component} from './component';


export function Composite<Parameters extends IParameters , P extends IAttributes , E extends IWidgetElements> (
  construct : ICompositeConstruct<Parameters , P , E> ,
  initials : Parameters ,
) {

  return Component((props : Parameters) => construct({...initials , ...props}));

}