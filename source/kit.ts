import type {
  ICapability,
  IKit,
  IKitMap,
  IKitScheme,
} from "./types";
import {WidgetException} from "./errors";


export class Kit<C> implements IKit<C> {

  protected _scheme: Partial<IKitMap<C>> = {} as Partial<IKitMap<C>>;

  get scheme(): Partial<IKitMap<C>> {
    return this._scheme;
  }

  attach<K extends keyof C>(capability: ICapability<any, any, C[K]>): this {
    const name = capability.name as keyof C;
    if (typeof this._scheme[name] !== 'undefined') {
      throw (new WidgetException(`This capability is already attached`)).show()
    }
    this._scheme[name] = capability;
    return this;
  }

  override<K extends keyof C>(capability: ICapability<any, any, C[K]>): this {
    const name = capability.name as keyof C;
    this._scheme[name] = capability;
    return this;
  }

  detach(name: keyof C): this {
    if (typeof this._scheme[name] === 'undefined') {
      throw (new WidgetException(`This capability is not attached`)).show()
    }
    this._scheme[name] = undefined;
    return this;
  }

  capability<K extends keyof C>(name: K): ICapability<any, any, C[K]> | undefined {
    return (this._scheme[name] || undefined);
  }

  has(name: keyof C): boolean {
    return typeof this._scheme[name] !== 'undefined'
  }

}


export function createKit<C extends IKitScheme>() {
  return new Kit<C>;
}
