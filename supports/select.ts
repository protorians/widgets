import type {
  IOptionGroupProps,
  IOptionProps,
  ISelectProps,
  IWidget,
} from '../types';
import {Widget} from './widget';


export class WidgetOptionGroup

  extends Widget<IOptionGroupProps, HTMLOptGroupElement>

  implements IWidget<IOptionGroupProps, HTMLOptGroupElement> {

  get tag(): string {
    return 'optgroup';
  }

}


export class WidgetOption

  extends Widget<IOptionProps, HTMLOptionElement>

  implements IWidget<IOptionProps, HTMLOptionElement> {

  get tag(): string {
    return 'option';
  }

}


export class WidgetSelect

  extends Widget<ISelectProps, HTMLSelectElement>

  implements IWidget<ISelectProps, HTMLSelectElement> {

  get tag(): string {
    return 'select';
  }

}