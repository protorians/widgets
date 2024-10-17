import type {
  IFrameAttributes,
  IWidget,
} from '../types';
import {WidgetNode} from './widget';

export class WidgetFrame

  extends WidgetNode<IFrameAttributes, HTMLElement>

  implements IWidget<IFrameAttributes, HTMLElement> {

  get tag(): string {
    return 'main';
  }

}
