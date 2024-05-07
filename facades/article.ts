import type {IWidgetProps, IArticleProps} from '../types';
import {WidgetArticle} from '../supports';

export function Article(props: IWidgetProps<IArticleProps, HTMLElement>) {
  return (new WidgetArticle(props));
}