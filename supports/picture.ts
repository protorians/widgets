import type {
  IPictureProps,
  IPictureSourceProps,
  IWidget,
} from '../types';
import {Widget} from './widget';


export class PictureSourceWidget

  extends Widget<IPictureSourceProps, HTMLSourceElement>

  implements IWidget<IPictureSourceProps, HTMLSourceElement> {

  get tag(): string {
    return 'source';
  }

}


export default class PictureWidget

  extends Widget<IPictureProps, HTMLSourceElement>

  implements IWidget<IPictureProps, HTMLSourceElement> {

  get tag(): string {
    return 'picture';
  }

}
