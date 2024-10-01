import {IParameters} from '../types';

export class SchemeValidator {

  static relative (cast : any , scheme : any) {
    const type = typeof scheme;

    if (type != 'object' && typeof cast !== type) return false;
    else if (type == 'object') {
      const entries = Object.entries(cast);

      if (entries.length) {
        if (cast !== scheme) return false;
        for (let index = 0; index < entries.length; index++) {
          const [key , value] = entries[index];
          if (!(key in scheme)) return false;
          if (typeof value != scheme[key]) return false;
          if (
            scheme[key] && (typeof scheme[key] == 'object' && typeof scheme[key] != 'symbol') &&
            value && (typeof value == 'object' && typeof value != 'symbol')
          ) {
            if (typeof scheme[key]?.constructor === 'function' && typeof value.constructor === 'function') {
              if (scheme[key]?.constructor !== value.constructor) return false;
            } else if (!this.relative(value as IParameters , scheme[key] as IParameters)) return false;
          }
          if (Array.isArray(scheme[key])) {
            if (!Array.isArray(value)) return false;
          }
        }
      }
    }

    return true;
  }

}