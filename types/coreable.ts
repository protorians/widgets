import type {IStaticWidgetNode} from './static';
import type {IAttributes} from './attributes';
import type {IAttributesScope,  IWidget,  IWidgetElements} from './widget';

export type ICoreablePropertyOptions = {
  replace?: boolean;
  remove?: boolean;
}


export interface ICoreableProperty<P extends IAttributes,  E extends IWidgetElements>{

  parse <V>(widget : IWidget<P,  E>) : V

}

export interface ICoreableCompound<P extends IAttributes,  E extends IWidgetElements> {

  construct : IStaticWidgetNode<P,  E>;

  render() : this;

}
export interface ICoreableProperties<P extends IAttributes,  E extends IWidgetElements> extends ICoreableCompound<P,  E>{

  parse(props : Partial<IAttributesScope<P,  E>>, ) : Partial<IAttributesScope<P,  E>> | undefined

  sync(props : Partial<IAttributesScope<P,  E>>, ): Partial<IAttributesScope<P,  E>>;

}