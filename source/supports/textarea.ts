import type {
  ITextareaAttributes, 
  ITextareaWidget, 
} from '../types';
import {WidgetNode} from './widget';

export class WidgetTextarea

  extends WidgetNode<ITextareaAttributes,  HTMLTextAreaElement>

  implements ITextareaWidget {

  get tag () : string {
    return 'textarea';
  }

}
