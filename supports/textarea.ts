import type {
  ITextareaAttributes,
  IWidget,
} from '../types';
import {WidgetNode} from './widget';

export class WidgetTextarea

  extends WidgetNode<ITextareaAttributes, HTMLTextAreaElement>

  implements IWidget<ITextareaAttributes, HTMLTextAreaElement> {

  get tag(): string {
    return 'textarea';
  }

}
