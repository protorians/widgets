import type {IWidgetProps, ICommonProps} from '../types';
import {WidgetArticle} from '../supports';

export function anchor(props: IWidgetProps<ICommonProps, HTMLElement>) {
  return (new WidgetArticle(props));
}