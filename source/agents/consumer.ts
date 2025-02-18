import type {IConsumerAgent, IProviderCallable} from "../types";

export class ConsumerAgent implements IConsumerAgent {

  constructor(
    public readonly name: string,
    public readonly callback: IProviderCallable,
  ) {
  }

}