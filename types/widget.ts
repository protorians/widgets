import {IActions} from './actions';
import type {
  IStyle,
  IChildren,
  IPropsExtended,
  IProps,
  IClassNames,
  IDataValue,
  IComponent,
  IReference,
  IObject,
} from './index';


export type IWidgetElements = HTMLElement | DocumentFragment;

export type IWidgetPrimitiveProps<P extends IProps, E extends IWidgetElements> = {

  ref?: IReference<P, E> | undefined

  child: IChildren<P, E> | undefined;

  style?: IStyle;

  className?: IClassNames;

  data?: IPropsExtended;

  ns?: IPropsExtended;

  actions?: IActions<P, E>;

}

export type IWidgetProps<P extends IProps, E extends IWidgetElements> = P & IWidgetPrimitiveProps<P, E>

export interface IWidget<P extends IProps, E extends IWidgetElements> {

  props: Partial<IWidgetProps<P, E>>;

  get tag(): string;

  get element(): E;

  get component(): IComponent<IObject> | undefined;

  useComponent<Props extends IObject>(component: IComponent<Props>|undefined): this;

  initialize(): this;

  child(value: IChildren<P, E>): this;

  style(value?: IStyle): this;

  className(value?: IClassNames): this;

  data(value?: IPropsExtended): this;

  ns(value?: IPropsExtended): this;

  attrib(name: keyof P, value: P[keyof P] | IDataValue): this;

  render(): this;


}
