import type {
  IOptionGroupAttributes,
  IOptionAttributes,
  ISelectAttributes,
  IWidget,
} from '../types';
import {WidgetNode} from './widget';


export class WidgetOptionGroup

  extends WidgetNode<IOptionGroupAttributes, HTMLOptGroupElement>

  implements IWidget<IOptionGroupAttributes, HTMLOptGroupElement> {

  get tag(): string {
    return 'optgroup';
  }

}


export class WidgetOption

  extends WidgetNode<IOptionAttributes, HTMLOptionElement>

  implements IWidget<IOptionAttributes, HTMLOptionElement> {

  get tag(): string {
    return 'option';
  }

}


export class WidgetSelect

  extends WidgetNode<ISelectAttributes, HTMLSelectElement>

  implements IWidget<ISelectAttributes, HTMLSelectElement> {

  get tag(): string {
    return 'select';
  }

}