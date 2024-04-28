import type {IPictureProps, IWidget} from '../types';
import {Widget} from './widget';


export class PictureWidget

  extends Widget<IPictureProps, HTMLSourceElement>

  implements IWidget<IPictureProps, HTMLSourceElement> {

  get tag(): string {
    return 'picture';
  }

}
