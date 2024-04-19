import type {ICommonProps, IWidget} from '../types';
import {Widget} from './widget';


export class TextWidget

  extends Widget<ICommonProps, HTMLSpanElement>

  implements IWidget<ICommonProps, HTMLSpanElement> {

  get tag(): string {
    return 'span';
  }

}
