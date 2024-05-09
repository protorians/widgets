import type {IWidgetProps, IAudioProps} from '../types';
import {WidgetAudio} from '../supports';

export function Audio(props: IWidgetProps<IAudioProps, HTMLAudioElement>) {
  return (new WidgetAudio(props));
}

