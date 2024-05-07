import type {IWidgetProps, IPictureProps} from '../types';
import {WidgetPicture} from '../supports';

export function Picture(props: IWidgetProps<IPictureProps, HTMLPictureElement>) {
  return (new WidgetPicture(props));
}