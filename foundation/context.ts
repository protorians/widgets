import type {
  IContext, IContextuable,
  IAttributes,
  IWidgetElements,
} from '../types';



export function createContext<Payload, P extends IAttributes, E extends IWidgetElements>(context: IContextuable<Payload, P, E>): IContext<Payload, P, E>{

  return {
    widget: context.widget,
    event: context.event || undefined,
    composite: context.composite || undefined,
    payload: context.payload || undefined,
  } as IContext<Payload, P, E>

}