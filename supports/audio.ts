import type {
  IAudioProps,
  IWidget,
} from '../types';
import {WidgetNode} from './widget';

export class WidgetAudio

  extends WidgetNode<IAudioProps, HTMLAudioElement>

  implements IWidget<IAudioProps, HTMLAudioElement> {

  get tag(): string {
    return 'audio';
  }

}
