import type {
  ITextareaProps,
  IWidget,
} from '../types';
import {Widget} from './widget';

export class WidgetTextarea

  extends Widget<ITextareaProps, HTMLTextAreaElement>

  implements IWidget<ITextareaProps, HTMLTextAreaElement> {

  get tag(): string {
    return 'textarea';
  }

}
