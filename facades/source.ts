import type {IWidgetProps, ISourceProps} from '../types';
import {SourceWidget} from '../supports';

export function source(props: IWidgetProps<ISourceProps, HTMLSourceElement>) {
  return (new SourceWidget(props));
}
