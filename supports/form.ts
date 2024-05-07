import type {IFormProps, IWidget} from '../types';
import {Widget} from './widget';


export class WidgetForm

  extends Widget<IFormProps, HTMLFormElement>

  implements IWidget<IFormProps, HTMLFormElement> {

  get tag(): string {
    return 'form';
  }

}