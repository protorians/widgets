import type {
  IOptionGroupProps,
  IOptionProps,
  ISelectProps,
  IWidget,
} from '../types';
import {WidgetNode} from './widget';


export class WidgetOptionGroup

  extends WidgetNode<IOptionGroupProps, HTMLOptGroupElement>

  implements IWidget<IOptionGroupProps, HTMLOptGroupElement> {

  get tag(): string {
    return 'optgroup';
  }

}


export class WidgetOption

  extends WidgetNode<IOptionProps, HTMLOptionElement>

  implements IWidget<IOptionProps, HTMLOptionElement> {

  get tag(): string {
    return 'option';
  }

}


export class WidgetSelect

  extends WidgetNode<ISelectProps, HTMLSelectElement>

  implements IWidget<ISelectProps, HTMLSelectElement> {

  get tag(): string {
    return 'select';
  }

}