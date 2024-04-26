import type {
  IPointerCollectionChild,
  IPointerMarkerElement
} from '../types';


export function setMarkerOnPointer(pointer: IPointerMarkerElement, child: IPointerCollectionChild | undefined){

    if(child && pointer.parentNode) pointer.parentNode?.insertBefore(child, pointer)

    return child;

}