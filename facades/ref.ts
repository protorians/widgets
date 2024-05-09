import {ReferenceWidget} from '../foundation';
import type {IAttributes, IWidgetElements} from '../types';


export function takeRef<P extends IAttributes, E extends IWidgetElements>(){
  return new ReferenceWidget<P, E>();
}