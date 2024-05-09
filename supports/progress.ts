import type {
  IProgressProps,
  IWidget,
} from '../types';
import {WidgetNode} from './widget';

export class WidgetProgress

  extends WidgetNode<IProgressProps, HTMLProgressElement>

  implements IWidget<IProgressProps, HTMLProgressElement> {

  get tag(): string {
    return 'progress';
  }

}
