import type {
  IProgressAttributes,
  IWidget,
} from '../types';
import {WidgetNode} from './widget';

export class WidgetProgress

  extends WidgetNode<IProgressAttributes, HTMLProgressElement>

  implements IWidget<IProgressAttributes, HTMLProgressElement> {

  get tag(): string {
    return 'progress';
  }

}
