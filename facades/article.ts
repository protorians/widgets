import type {IWidgetProps, ICommonProps} from '../types';
import {WidgetArticle} from '../supports';

export function Article(props: IWidgetProps<ICommonProps, HTMLElement>) {
  return (new WidgetArticle(props));
}