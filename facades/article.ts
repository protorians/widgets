import type {IWidgetProps, ICommonProps} from '../types';
import {ArticleWidget} from '../supports';

export function anchor(props: IWidgetProps<ICommonProps, HTMLElement>) {
  return (new ArticleWidget(props));
}