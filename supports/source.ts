import type {ISourceProps, IWidget} from '../types';
import {WidgetNode} from './widget';

export class WidgetSource

  extends WidgetNode<ISourceProps, HTMLSourceElement>

  implements IWidget<ISourceProps, HTMLSourceElement> {

  get tag(): string {
    return 'source';
  }

}
