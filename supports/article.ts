import type {
  IArticleProps,
  IWidget,
} from '../types';
import {WidgetNode} from './widget';

export class WidgetArticle

  extends WidgetNode<IArticleProps, HTMLElement>

  implements IWidget<IArticleProps, HTMLElement> {

  get tag(): string {
    return 'article';
  }

}
