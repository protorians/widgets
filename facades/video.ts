  import type {IWidgetProps, IVideoProps} from '../types';
  import {WidgetVideo} from '../supports';

  export function Video(props: IWidgetProps<IVideoProps, HTMLVideoElement>) {
    return (new WidgetVideo(props));
  }

