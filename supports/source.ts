import type {ISourceProps, IWidget} from '../types';
import {Widget} from './widget';

export class WidgetSource

  extends Widget<ISourceProps, HTMLSourceElement>

  implements IWidget<ISourceProps, HTMLSourceElement> {

  get tag(): string {
    return 'source';
  }

}
