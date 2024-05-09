import type {IAttributesScope, IPictureAttributes} from '../types';
import {WidgetPicture} from '../supports';

export function Picture(props: IAttributesScope<IPictureAttributes, HTMLPictureElement>) {
  return (new WidgetPicture(props));
}