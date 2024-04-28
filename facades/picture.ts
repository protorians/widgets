import type {IWidgetProps, IPictureProps} from '../types';
import {PictureWidget} from '../supports';

export function picture(props: IWidgetProps<IPictureProps, HTMLPictureElement>) {
  return (new PictureWidget(props));
}
