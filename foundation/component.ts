import type {
  IComponent,
  IComponentConstruct,
  IObject,
  IProps,
  IWidget,
  IWidgetElements,
} from '../types';


export class WidgetComponent<P extends IObject> implements IComponent<P>{

  #props: P | undefined;

  #widget: IWidget<IProps, IWidgetElements> | undefined;

  constructor(props: P) {
    this.#props = props;
  }

  get props() {
    return this.#props;
  }

  set widget(widget: IWidget<IProps, IWidgetElements>){
    this.#widget = this.#widget || widget || undefined;
  }

  get widget(): (IWidget<IProps, IWidgetElements>) | undefined{
    return this.#widget || undefined;
  }

}

export function component<Props extends IObject>(component: IComponentConstruct<Props>) {

  return (props: Props) => component(props).useComponent(new WidgetComponent<Props>(props)).render();

}
