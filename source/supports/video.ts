import type {
  IVideoAttributes,  IVideoWidget,
} from '../types';
import { WidgetNode } from './widget';

export class WidgetVideo

  extends WidgetNode<IVideoAttributes,  HTMLVideoElement>

  implements IVideoWidget {

  get tag () {
    return 'video';
  }

}