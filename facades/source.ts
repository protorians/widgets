import type {IAttributesScope, ISourceProps} from '../types';
import {WidgetSource} from '../supports';

export function Source(props: IAttributesScope<ISourceProps, HTMLSourceElement>) {
  return (new WidgetSource(props));
}
