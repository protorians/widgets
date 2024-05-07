import type {
  ICommonProps,
  IWidget,
} from '../types';
import {WidgetNode} from './widget';

export class WidgetFrame

  extends WidgetNode<ICommonProps, HTMLElement>

  implements IWidget<ICommonProps, HTMLElement> {

  get tag(): string {
    return 'main';
  }

}
