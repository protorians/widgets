import type {IAnchorProps, IWidget} from '../types';
import {WidgetNode} from './widget';


export class WidgetLink

  extends WidgetNode<IAnchorProps, HTMLAnchorElement>

  implements IWidget<IAnchorProps, HTMLAnchorElement> {

  get tag(): string {
    return 'a';
  }

}