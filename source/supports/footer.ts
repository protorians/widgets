import type {
  IFooterAttributes,
  IWidget,
} from '../types';
import {WidgetNode} from './widget';

export class WidgetFooter

  extends WidgetNode<IFooterAttributes, HTMLElement>

  implements IWidget<IFooterAttributes, HTMLElement> {

  get tag(): string {
    return 'footer';
  }

}
