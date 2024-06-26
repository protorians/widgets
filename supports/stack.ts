import type {
  IAttributes, 
  IColumnAttributes, 
  IGridAttributes, 
  IRowAttributes, 
  ISectionAttributes, 
  IStyle, 
  IWidget, 
  IWidgetElements, 
} from '../types';
import {WidgetNode} from './widget';

export class WidgetSection

  extends WidgetNode<ISectionAttributes,  HTMLElement>

  implements IWidget<ISectionAttributes,  HTMLElement> {

  get tag () : string {
    return 'section';
  }

}


export class WidgetRow

  extends WidgetNode<IRowAttributes,  HTMLElement>

  implements IWidget<IRowAttributes,  HTMLElement> {

  get tag () {
    return 'div';
  }

  static style<P extends IAttributes,  E extends IWidgetElements> () : Partial<IStyle<P,  E>> | undefined {
    return {
      display: 'flex', 
      flexDirection: 'row', 
    };
  }

}

export class WidgetColumn

  extends WidgetNode<IColumnAttributes,  HTMLElement>

  implements IWidget<IColumnAttributes,  HTMLElement> {

  get tag () {
    return 'div';
  }

  static style<P extends IAttributes,  E extends IWidgetElements> () : Partial<IStyle<P,  E>> | undefined {
    return {
      display: 'flex', 
      flexDirection: 'column', 
    };
  }

}

export class WidgetGrid

  extends WidgetNode<IGridAttributes,  HTMLElement>

  implements IWidget<IGridAttributes,  HTMLElement> {

  get tag () {
    return 'div';
  }

  static style<P extends IAttributes,  E extends IWidgetElements> () : Partial<IStyle<P,  E>> | undefined {
    return {
      display: 'grid', 
    };
  }


  // static properties<P extends IAttributes,  E extends IWidgetElements>(): Partial<IAttributesScope<P,  E>> | undefined{
  //   return {
  //
  //   }
  // }

}