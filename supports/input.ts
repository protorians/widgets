import type {IInputableProps, IWidget} from '../types';
import {Widget} from './widget';


export class InputWidget

  extends Widget<IInputableProps, HTMLInputElement>

  implements IWidget<IInputableProps, HTMLInputElement> {

  get tag(): string {
    return 'input';
  }

}