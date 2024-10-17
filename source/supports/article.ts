import type {
  IArticleAttributes,
  IWidget,
} from '../types';
import {WidgetNode} from './widget';

export class WidgetArticle

  extends WidgetNode<IArticleAttributes, HTMLElement>

  implements IWidget<IArticleAttributes, HTMLElement> {

  get tag(): string {
    return 'article';
  }

}
