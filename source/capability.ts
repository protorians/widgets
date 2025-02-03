import type {
  IAttributes,
  ICallable,
  ICapability,
  IWidgetNode,
} from "./types";


export class Capability<E extends HTMLElement, A extends IAttributes, Payload> implements ICapability<E, A, Payload> {

  protected target: IWidgetNode<E, A> | undefined

  constructor(
    public readonly name: string,
    public readonly callable: ICallable<E, A, Payload>,
  ) {
  }

  on(widget: IWidgetNode<E, A>) {
    this.target = widget
    return this;
  }

  make<T>(payload: Payload,): T | void {
    if (this.target && this.target.context && this.target.context.root) {
      return this.callable({
        root: this.target.context.root,
        widget: this.target,
        payload
      })
    }
  }

}

export function createCapability<E extends HTMLElement, A extends IAttributes, Payload>(
  name: string,
  callable: ICallable<E, A, Payload>
): ICapability<E, A, Payload> {
  return new Capability(name, callable);
}
