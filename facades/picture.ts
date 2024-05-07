import type {IWidgetProps, IPictureProps} from '../types';
import {WidgetPicture} from '../supports';

export function picture(props: IWidgetProps<IPictureProps, HTMLPictureElement>) {
  return (new WidgetPicture(props));
}
