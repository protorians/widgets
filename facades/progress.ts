import type {IAttributesScope, IProgressAttributes} from '../types';
import {WidgetProgress} from '../supports';

export function Progress(props: IAttributesScope<IProgressAttributes, HTMLProgressElement>) {
  return (new WidgetProgress(props));
}

