import {IIFrameProps, IWidget} from '../types';
import {Widget} from './widget';


export class WidgetIFrame

  extends Widget<IIFrameProps, HTMLIFrameElement>

  implements IWidget<IIFrameProps, HTMLIFrameElement> {

  get tag(): string {
    return 'iframe';
  }

}