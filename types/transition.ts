

export type ITransition = {
  name: string;
  type: 'in' | 'out'
  process: () => void;
}

export type ITransitionIn = ITransition & {
  type: 'entry';
}

export type ITransitionOut = ITransition & {
  type: 'out';
}

export type ITransitions = {
  in: ITransitionIn;
  out?: ITransitionOut;
}