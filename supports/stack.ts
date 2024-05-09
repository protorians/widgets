import type {
  IStackAttributes,
  IWidget,
} from '../types';
import {WidgetNode} from './widget';

export class WidgetStack

  extends WidgetNode<IStackAttributes, HTMLElement>

  implements IWidget<IStackAttributes, HTMLElement> {

  get tag(): string {
    return 'section';
  }

}
