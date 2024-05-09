import type {
  INavbarProps,
  IWidget,
} from '../types';
import {WidgetNode} from './widget';

export class WidgetNavbar

  extends WidgetNode<INavbarProps, HTMLElement>

  implements IWidget<INavbarProps, HTMLElement> {

  get tag(): string {
    return 'nav';
  }

}
