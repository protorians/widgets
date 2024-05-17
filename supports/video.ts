import type {
  IVideoAttributes ,
  IWidget ,
} from '../types';
import { WidgetNode } from './widget';

export class WidgetVideo

  extends WidgetNode<IVideoAttributes , HTMLVideoElement>

  implements IWidget<IVideoAttributes , HTMLVideoElement> {

  get tag () {
    return 'video';
  }

}