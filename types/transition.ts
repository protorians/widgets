import {TransitionMode} from '../constants';
import {IWidget} from './widget';


export type ITransitionProcessorPayload<Target extends IWidget<any , any>> = {
  target : Target
  mode : TransitionMode;
}

export type ITransitionProcessor<Target extends IWidget<any , any>> = (payload : ITransitionProcessorPayload<Target>) => void;

export type ITransition<Target extends IWidget<any , any>> = {
  name : string;
  mode : TransitionMode
  process : ITransitionProcessor<Target>;
}

export interface ITransitionIncoming<Target extends IWidget<any , any>> extends ITransition<Target> {
  mode : TransitionMode.Incoming;
}

export interface ITransitionOutgoing<Target extends IWidget<any , any>> extends ITransition<Target> {
  mode : TransitionMode.Outgoing;
}

export type ITransitions<Target extends IWidget<any , any>> = {
  incoming : ITransitionIncoming<Target>;
  outgoing? : ITransitionOutgoing<Target>;
}