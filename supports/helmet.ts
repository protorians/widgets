import type {
  IHelmetProps,
  IWidget,
} from '../types';
import {WidgetNode} from './widget';

export class WidgetHelmet

  extends WidgetNode<IHelmetProps, HTMLElement>

  implements IWidget<IHelmetProps, HTMLElement> {

  get tag(): string {
    return 'header';
  }

}
