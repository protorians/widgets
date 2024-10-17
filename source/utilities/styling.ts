import {IStyleOnly} from '../types';
import {decamelize} from './camelization';


export function makeInlineStyle (declarations : IStyleOnly) : string {
  const inline : string[] = [];
  Object.entries(declarations)
    .forEach(([key , value]) => {
      inline.push(`${decamelize(key)}: ${value}`);
    });
  return inline.join(';');
}