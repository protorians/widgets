import type {
  IComponent ,
  IComponentConstruct ,
  IAttributes ,
  IWidget ,
  IWidgetElements ,
  IParameters ,
} from '../types';


export class WidgetComponent<P extends IParameters> implements IComponent<P>{

  #parameters: P | undefined;

  #widget: IWidget<IAttributes, IWidgetElements> | undefined;

  constructor(props: P) {
    this.#parameters = props;
  }

  get parameters() {
    return this.#parameters;
  }

  set widget(widget: IWidget<IAttributes, IWidgetElements>){
    this.#widget = this.#widget || widget || undefined;
  }

  get widget(): (IWidget<IAttributes, IWidgetElements>) | undefined{
    return this.#widget || undefined;
  }

}

export function Component<Props extends IParameters>(component: IComponentConstruct<Props>) {

  return (props: Props) => component(props).useComponent(new WidgetComponent<Props>(props));

}
