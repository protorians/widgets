import type {
  INavProps,
  IWidget,
} from '../types';
import {WidgetNode} from './widget';

export class WidgetNav

  extends WidgetNode<INavProps, HTMLElement>

  implements IWidget<INavProps, HTMLElement> {

  get tag(): string {
    return 'nav';
  }

}
