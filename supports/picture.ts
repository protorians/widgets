import type {IPictureAttributes, IWidget} from '../types';
import {WidgetNode} from './widget';


export class WidgetPicture

  extends WidgetNode<IPictureAttributes, HTMLSourceElement>

  implements IWidget<IPictureAttributes, HTMLSourceElement> {

  get tag(): string {
    return 'picture';
  }

}
