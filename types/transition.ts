import {TransitionMode} from '../constants';
import {IWidget , IWidgetElements} from './widget';
import {IAttributes} from './attributes';


export type ITransitionProcessorPayload<Target extends IWidget<IAttributes , IWidgetElements>> = {
  target : Target
  mode : TransitionMode;
}

export type ITransitionProcessor<Target extends IWidget<IAttributes , IWidgetElements>> = (payload : ITransitionProcessorPayload<Target>) => void;

export type ITransition<Target extends IWidget<IAttributes , IWidgetElements>> = {
  name : string;
  mode : TransitionMode
  process : ITransitionProcessor<Target>;
}

export interface ITransitionIncoming<Target extends IWidget<IAttributes , IWidgetElements>> extends ITransition<Target> {
  mode : TransitionMode.Incoming;
}

export interface ITransitionOutgoing<Target extends IWidget<IAttributes , IWidgetElements>> extends ITransition<Target> {
  mode : TransitionMode.Outgoing;
}

export type ITransitions<Target extends IWidget<IAttributes , IWidgetElements>> = {
  incoming : ITransitionIncoming<Target>;
  outgoing? : ITransitionOutgoing<Target>;
}