import type {IFormProps, IWidget} from '../types';
import {Widget} from './widget';


export class FormWidget

  extends Widget<IFormProps, HTMLFormElement>

  implements IWidget<IFormProps, HTMLFormElement> {

  get tag(): string {
    return 'form';
  }

}