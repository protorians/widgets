import type {
  IEditableElement,
  IWidgetElements
} from '../types';


export function allowEditableElement(input: IWidgetElements): IEditableElement | undefined {

  return (
    (input instanceof HTMLInputElement) ||
    (input instanceof HTMLTextAreaElement) ||
    (input instanceof HTMLSelectElement)
  ) ? input : undefined;

}