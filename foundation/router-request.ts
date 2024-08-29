import {IObject} from '../types';


  export class RouterRequest {

  static merge (...properties : (IObject | undefined)[]) : IObject {
    let merge : IObject = {};
    properties.forEach(property => property ? merge = {...property} : undefined);
    return merge;
  }

  static query (query? : string) {
    const queries : IObject = {} as IObject;

    (query || '').split('&')
      .forEach(q => {
        const eq = q.split('=');

        if (eq[0]) {
          queries[eq[0]] = typeof eq[1] != 'undefined' ? eq[1] : undefined;
        }
      });

    return queries;
  }


  static adjustPath<T extends string>(path: T): T{
    if(path.startsWith('//')){
      path = path.substring(1) as T;
    }
    return path;
  }

}