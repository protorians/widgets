import type {IAttributes, IWidgetDeclaration} from "../types/index.js";

export function declarationExcavates<E extends HTMLElement, A extends IAttributes, T>(
  props: IWidgetDeclaration<E, A & T>,
  targetKeys: (keyof IWidgetDeclaration<E, A & T>)[]
) {

  const excavate: T = {} as T
  const current: IWidgetDeclaration<E, A> = {} as IWidgetDeclaration<E, A>

  Object.entries(props)
    .forEach(([key, value]) => {
      if (targetKeys.includes(key as keyof IWidgetDeclaration<E, A>)) {
        excavate[key] = value
      } else {
        current[key] = value;
      }
    })

  return {excavate, current}
}