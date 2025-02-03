import {StateWidget} from "./hooks";

export function State<T>(initial: T | undefined) {
  return new StateWidget<T>(initial)
}