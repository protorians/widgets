import type {IPictureAttributes, IWidget} from '../types';
import {WidgetNode} from './widget';


export class WidgetPicture

  extends WidgetNode<IPictureAttributes, HTMLPictureElement>

  implements IWidget<IPictureAttributes, HTMLPictureElement> {

  get tag(): string {
    return 'picture';
  }

}
