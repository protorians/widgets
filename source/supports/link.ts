import type {ILinkAttributes, IWidget} from '../types';
import {WidgetNode} from './widget';


export class WidgetLink

  extends WidgetNode<ILinkAttributes, HTMLAnchorElement>

  implements IWidget<ILinkAttributes, HTMLAnchorElement> {

  get tag(): string {
    return 'a';
  }

}