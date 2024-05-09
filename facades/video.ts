  import type {IAttributesScope, IVideoAttributes} from '../types';
  import {WidgetVideo} from '../supports';

  export function Video(props: IAttributesScope<IVideoAttributes, HTMLVideoElement>) {
    return (new WidgetVideo(props));
  }

