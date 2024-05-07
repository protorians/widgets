import type {
  ICommonProps,
  IWidget,
} from '../types';
import {WidgetNode} from './widget';

export class WidgetFooter

  extends WidgetNode<ICommonProps, HTMLElement>

  implements IWidget<ICommonProps, HTMLElement> {

  get tag(): string {
    return 'footer';
  }

}
