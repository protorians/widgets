import type {ExtendableType} from "./util";
import type {IAttributes} from "./attributes";

export type IChild<T> = T | T[] | null | undefined;

export type IChildren<T> = IChild<T> | Promise<IChild<T>>;

export type IChildrenProps<P extends IAttributes> = ExtendableType<P, IChildren<any> | undefined>;