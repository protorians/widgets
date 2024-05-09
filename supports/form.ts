import type {IFormAttributes, IInputableAttributes, ILabelAttributes, IWidget} from '../types';
import {WidgetNode} from './widget';


export class WidgetForm

  extends WidgetNode<IFormAttributes, HTMLFormElement>

  implements IWidget<IFormAttributes, HTMLFormElement> {

  get tag(): string {
    return 'form';
  }

}


export class WidgetInput

  extends WidgetNode<IInputableAttributes, HTMLInputElement>

  implements IWidget<IInputableAttributes, HTMLInputElement> {

  get tag(): string {
    return 'input';
  }

}

export class WidgetLabel

  extends WidgetNode<ILabelAttributes, HTMLLabelElement>

  implements IWidget<ILabelAttributes, HTMLLabelElement> {

  get tag(): string {
    return 'label';
  }

}