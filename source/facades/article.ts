import type {IAttributesScope, IArticleAttributes} from '../types';
import {WidgetArticle} from '../supports';

export function Article(props: IAttributesScope<IArticleAttributes, HTMLElement>) {
  return (new WidgetArticle(props));
}