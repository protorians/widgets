import type {IComponentConstruct, IObject} from '../types';
import {decamelize} from '../utilities/camelization';
import {WidgetElement} from './elements';


export function register<Props extends IObject>(name: string, component: IComponentConstruct<Props>) {

  name = decamelize(name, '-');

  customElements.define(name.includes('-') ? name : `widget-${ name }`, class extends WidgetElement<Props> {

    use = component;

  });

  return component;

}