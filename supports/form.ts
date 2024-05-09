import type {IFormProps, IInputableProps, ILabelProps, IWidget} from '../types';
import {WidgetNode} from './widget';


export class WidgetForm

  extends WidgetNode<IFormProps, HTMLFormElement>

  implements IWidget<IFormProps, HTMLFormElement> {

  get tag(): string {
    return 'form';
  }

}


export class WidgetInput

  extends WidgetNode<IInputableProps, HTMLInputElement>

  implements IWidget<IInputableProps, HTMLInputElement> {

  get tag(): string {
    return 'input';
  }

}

export class WidgetLabel

  extends WidgetNode<ILabelProps, HTMLLabelElement>

  implements IWidget<ILabelProps, HTMLLabelElement> {

  get tag(): string {
    return 'label';
  }

}