import type {IPictureProps, IWidget} from '../types';
import {WidgetNode} from './widget';


export class WidgetPicture

  extends WidgetNode<IPictureProps, HTMLSourceElement>

  implements IWidget<IPictureProps, HTMLSourceElement> {

  get tag(): string {
    return 'picture';
  }

}
