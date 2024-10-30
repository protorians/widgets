import type {IIFrameAttributes, IWidget} from '../types';
import {WidgetNode} from './widget';


export class WidgetEmbedFrame

  extends WidgetNode<IIFrameAttributes, HTMLIFrameElement>

  implements IWidget<IIFrameAttributes, HTMLIFrameElement> {

  get tag(): string {
    return 'iframe';
  }

}