import type {ISourceProps, IWidget} from '../types';
import {Widget} from './widget';

export class SourceWidget

  extends Widget<ISourceProps, HTMLSourceElement>

  implements IWidget<ISourceProps, HTMLSourceElement> {

  get tag(): string {
    return 'source';
  }

}
