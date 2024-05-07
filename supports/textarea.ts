import type {
  ITextareaProps,
  IWidget,
} from '../types';
import {WidgetNode} from './widget';

export class WidgetTextarea

  extends WidgetNode<ITextareaProps, HTMLTextAreaElement>

  implements IWidget<ITextareaProps, HTMLTextAreaElement> {

  get tag(): string {
    return 'textarea';
  }

}
