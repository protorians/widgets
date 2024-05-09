import type {
  IHelmetAttributes,
  IWidget,
} from '../types';
import {WidgetNode} from './widget';

export class WidgetHelmet

  extends WidgetNode<IHelmetAttributes, HTMLElement>

  implements IWidget<IHelmetAttributes, HTMLElement> {

  get tag(): string {
    return 'header';
  }

}
