import type {ICommonProps, IWidget} from '../types';
import {WidgetNode} from './widget';


export class WidgetSpan

  extends WidgetNode<ICommonProps, HTMLSpanElement>

  implements IWidget<ICommonProps, HTMLSpanElement> {

  get tag(): string {
    return 'span';
  }

}
