import type {IComponentConstruct , IParameters} from '../types';
import {decamelize} from '../utilities';
import {WidgetElement} from './elements';


export function BindComponent<Props extends IParameters> (name : string , component : IComponentConstruct<Props>) {
  name = decamelize(name , '-');

  if (!customElements.get(name)) {
    customElements.define(name.includes('-') ? name : `widget-${name}` , class extends WidgetElement<Props> {
      use = component;
    });
  }
  return component;

}