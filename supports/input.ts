import type {IInputableProps, IWidget} from '../types';
import {WidgetNode} from './widget';


export class WidgetInput

  extends WidgetNode<IInputableProps, HTMLInputElement>

  implements IWidget<IInputableProps, HTMLInputElement> {

  get tag(): string {
    return 'input';
  }

}