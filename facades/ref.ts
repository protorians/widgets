import {ReferenceWidget} from '../foundation';
import type {IProps, IWidgetElements} from '../types';


export function takeRef<P extends IProps, E extends IWidgetElements>(){
  return new ReferenceWidget<P, E>();
}