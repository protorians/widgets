import type {
  IStackProps,
  IWidget,
} from '../types';
import {WidgetNode} from './widget';

export class WidgetStack

  extends WidgetNode<IStackProps, HTMLElement>

  implements IWidget<IStackProps, HTMLElement> {

  get tag(): string {
    return 'section';
  }

}
