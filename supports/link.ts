import type {ILinkProps, IWidget} from '../types';
import {WidgetNode} from './widget';


export class WidgetLink

  extends WidgetNode<ILinkProps, HTMLAnchorElement>

  implements IWidget<ILinkProps, HTMLAnchorElement> {

  get tag(): string {
    return 'a';
  }

}