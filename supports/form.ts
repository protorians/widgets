import type {IFormProps, IWidget} from '../types';
import {WidgetNode} from './widget';


export class WidgetForm

  extends WidgetNode<IFormProps, HTMLFormElement>

  implements IWidget<IFormProps, HTMLFormElement> {

  get tag(): string {
    return 'form';
  }

}