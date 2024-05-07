import type {
  IFrameProps,
  IWidget,
} from '../types';
import {WidgetNode} from './widget';

export class WidgetFrame

  extends WidgetNode<IFrameProps, HTMLElement>

  implements IWidget<IFrameProps, HTMLElement> {

  get tag(): string {
    return 'main';
  }

}
