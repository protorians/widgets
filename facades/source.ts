import type {IWidgetProps, ISourceProps} from '../types';
import {WidgetSource} from '../supports';

export function source(props: IWidgetProps<ISourceProps, HTMLSourceElement>) {
  return (new WidgetSource(props));
}
