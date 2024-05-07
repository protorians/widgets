import type {
  ICommonProps,
  IWidget,
} from '../types';
import {WidgetNode} from './widget';

export class WidgetHelmet

  extends WidgetNode<ICommonProps, HTMLElement>

  implements IWidget<ICommonProps, HTMLElement> {

  get tag(): string {
    return 'header';
  }

}
