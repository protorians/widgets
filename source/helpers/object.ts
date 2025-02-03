import type {IQuadrilateral, QuadrilateralArray} from "../types";


export function quadrilateral<T>(provider: QuadrilateralArray<T>[]): IQuadrilateral<QuadrilateralArray<T>> {

  let value: IQuadrilateral<QuadrilateralArray<T>> = {}

  if (!provider.length) {
  } else if (provider.length === 1) {
    value = {
      top: provider[0],
      right: provider[0],
      bottom: provider[0],
      left: provider[0],
    }
  }

  else if(provider.length === 2) {
    value = {
      top: provider[0],
      right: provider[1],
      bottom: provider[0],
      left: provider[1],
    }
  }

  else if(provider.length === 3) {
    value = {
      top: provider[0],
      right: provider[1],
      bottom: provider[0],
    }
  }
  else if(provider.length === 4) {
    value = {
      top: provider[0],
      right: provider[1],
      bottom: provider[2],
      left: provider[3],
    }
  }

  return value
}