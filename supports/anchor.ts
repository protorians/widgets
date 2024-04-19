import type {IAnchorProps, IWidget} from '../types';
import {Widget} from './widget';


export class AnchorWidget

  extends Widget<IAnchorProps, HTMLAnchorElement>

  implements IWidget<IAnchorProps, HTMLAnchorElement> {

  get tag(): string {
    return 'a';
  }

}