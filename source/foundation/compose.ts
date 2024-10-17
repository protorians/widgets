import {
  IAttributes ,
  IParameters ,
  IWidgetElements ,
  IComposeConstruct ,
  IWidget ,
  IComponentFunction,
} from '../types';
import {Component} from './component';



export function Compose<Parameters extends IParameters , P extends IAttributes , E extends IWidgetElements> (
  alias: string,
  construct : IComposeConstruct<Parameters , P , E> ,
  initials : Parameters ,
): IComponentFunction<Parameters> {

  return Component<Parameters>(alias, (props : Parameters): IWidget<P , E> => construct({...initials , ...props}));

}