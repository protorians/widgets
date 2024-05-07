import {IIFrameProps, IWidget} from '../types';
import {WidgetNode} from './widget';


export class WidgetEmbedFrame

  extends WidgetNode<IIFrameProps, HTMLIFrameElement>

  implements IWidget<IIFrameProps, HTMLIFrameElement> {

  get tag(): string {
    return 'iframe';
  }

}