import type {ICommonProps, IWidget} from '../types';
import {Widget} from './widget';


export class WidgetText

  extends Widget<ICommonProps, HTMLSpanElement>

  implements IWidget<ICommonProps, HTMLSpanElement> {

  get tag(): string {
    return 'span';
  }

}
