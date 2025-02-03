import type {ICapability} from "./capability";

export type IKitScheme = {
  [K: string]: any
}

export type IKitMap<C> = {
  [K in keyof C]: ICapability<any, any, any>
}

export interface IKit<C> {

  get scheme(): Partial<IKitMap<C>>;

  attach<K extends keyof C>(capability: ICapability<any, any, C[K]>): this;

  override<K extends keyof C>(capability: ICapability<any, any, C[K]>): this;

  detach(name: keyof C): this;

  capability<K extends keyof C>(name: K): ICapability<any, any, C[K]> | undefined;

  has(name: keyof C): boolean;
}