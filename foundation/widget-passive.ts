import type {
  IParameterBag ,
  IPassiveWidgetElement ,
  IPrimitiveClassName ,
  IPrimitiveParameters ,
  IStyleOnly,
} from '../types';
import {camelize , decamelize , encodeHTML , stripHTML} from '../utilities';
import {makeInlineStyle} from '../utilities/styling';
import {ParameterBag} from './parameter-bag';

export class WidgetPassiveElement implements IPassiveWidgetElement {

  protected _tagName : string = '';

  protected _innerHTML : string = '';

  protected _attributes : IPrimitiveParameters = {};

  protected _dataset : IPrimitiveParameters = {};

  protected _classList : IParameterBag<IPrimitiveClassName>;

  protected _style: IStyleOnly = {};

  protected _removed : boolean = false;

  set innerHTML (html : string) {
    this._innerHTML = html;
  }

  get innerHTML () : string {
    return this._innerHTML;
  }

  set tagName (name : string) {
    this._tagName = this._tagName || name;
  }

  get tagName () : string {
    return this._tagName;
  }

  get attributes () : IPrimitiveParameters {
    return this._attributes;
  };

  get textContent () : string {
    return stripHTML(this._innerHTML);
  }

  set textContent (text : string) {
    this._innerHTML = encodeHTML(text);
  }

  get dataset (): IPrimitiveParameters {
    const dataset : IPrimitiveParameters = this._dataset;

    Object.entries(this._dataset)
      .forEach(([key , value]) =>
        dataset[camelize(key)] = value ,
      );

    Object.entries(this._attributes)
      .forEach(([key , value]) =>
        (key.startsWith('data-')) ? dataset[camelize(key)] = value : void (0) ,
      );

    this._dataset = dataset;
    return this._dataset;
  }

  get style(): IStyleOnly{
    return this._style;
  }

  get classList(): IParameterBag<IPrimitiveClassName>{
    return this._classList
  }

  constructor () {
    this._classList = new ParameterBag<IPrimitiveClassName>()
  }

  setAttribute<T extends keyof IPrimitiveParameters> (name : T | string , value : IPrimitiveParameters[T]) : void {
    const key = name.toString()
    if (key.startsWith('data-')) {
      this._dataset[camelize(key)] = value;
    } else this._attributes[name as T] = value;
  }

  getAttribute<T extends keyof IPrimitiveParameters> (name : T | string) : IPrimitiveParameters[T] | null {
    return this._attributes[name as T] || null;
  }

  hasAttribute<T extends keyof IPrimitiveParameters> (name : string | T) : boolean {
    return (name in this._attributes)
  }

  removeAttribute<T extends keyof IPrimitiveParameters> (name : T | string) : void {
    const attrib : IPrimitiveParameters = {};
    Object.entries(this._attributes)
      .forEach(([key , value]) => {
        if (key != name) attrib[key] = value;
      });
    this._attributes = attrib;
  }

  append (value : IPassiveWidgetElement | string) : void {
    if (typeof value == 'string') {
      this._innerHTML = `${this._innerHTML}${(value)}`;
    }
    if (value instanceof WidgetPassiveElement) {
      this._innerHTML = `${this._innerHTML}${value}`;
    }
  }

  remove(){
    this._removed = true;
  }

  toString () : string {

    if(this._removed) return ''

    const attributes : string[] = [];

    const hasStyle = Object.entries(this._style).length;

    if(hasStyle) attributes.push(`style="${makeInlineStyle(this._style)}"`);

    Object.entries(this._dataset)
      .forEach(([key , value]) => attributes.push(`${decamelize(key)}="${value ? value.toString() : value}"`));

    Object.entries(this._attributes)
      .forEach(([key , value]) => attributes.push(`${key}="${value}"`));

    return `<${this._tagName}${attributes.length ? ` ${attributes.join(' ')} ` : ``}>${this._innerHTML}</${this._tagName}>`;

  }

}