import {IObject} from '../types';

export function attribution<T extends IObject>(

  attributes: object,

  ns?: string | undefined,

  separator?: string | undefined

): T {

  const nms = (typeof ns != 'undefined' ? `${ns}${separator || ':'}` : '');

  let output: T = {} as T

  Object.entries(attributes).map(({ 0: name, 1: value }) => {

    if (typeof value == 'object' && value) {

      if (Array.isArray(value)) {

        const k = `${nms}${name}` as keyof T

        output[k] = `${typeof value == 'object' ? JSON.stringify(value) : value}` as T[keyof T];

      }

      else {

        output = {

          ...output,

          ...attribution(value, `${nms}${name}`, separator)

        }

      }

    }

    else if (typeof value != 'undefined') {

      const k = `${nms}${name}`

      output[k as keyof T] = `${typeof value == 'object' ? JSON.stringify(value) : value}` as T[keyof T];

    }

  })

  return output;

}
