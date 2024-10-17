import type {
  IAudioAttributes,
  IWidget,
} from '../types';
import {WidgetNode} from './widget';

export class WidgetAudio

  extends WidgetNode<IAudioAttributes, HTMLAudioElement>

  implements IWidget<IAudioAttributes, HTMLAudioElement> {

  get tag(): string {
    return 'audio';
  }

}
