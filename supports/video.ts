import type {
  IVideoProps,
  IWidget,
} from '../types';
import {WidgetNode} from './widget';

export class WidgetVideo

  extends WidgetNode<IVideoProps, HTMLVideoElement>

  implements IWidget<IVideoProps, HTMLVideoElement> {

  get tag(): string {
    return 'video';
  }

}
