import type {
  ICommonProps,
  IWidget,
} from '../types';
import {Widget} from './widget';

export class HelmetWidget

  extends Widget<ICommonProps, HTMLElement>

  implements IWidget<ICommonProps, HTMLElement> {

  get tag(): string {
    return 'header';
  }

}
