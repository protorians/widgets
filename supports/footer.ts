import type {
  IFooterProps,
  IWidget,
} from '../types';
import {WidgetNode} from './widget';

export class WidgetFooter

  extends WidgetNode<IFooterProps, HTMLElement>

  implements IWidget<IFooterProps, HTMLElement> {

  get tag(): string {
    return 'footer';
  }

}
