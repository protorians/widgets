import type {IAttributesScope, IAudioAttributes} from '../types';
import {WidgetAudio} from '../supports';

export function Audio(props: IAttributesScope<IAudioAttributes, HTMLAudioElement>) {
  return (new WidgetAudio(props));
}

