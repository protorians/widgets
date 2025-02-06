import type {
  IWidgetNode,
  IView,
  ISignalController,
  IViewMockup,
  IViewOptions,
  IViewWidgetCollection, IViewMockupView, IViewStack
} from "./types";
import {SignalHook} from "./hooks";


export class Views {

  static stacked: IViewStack | undefined;

  static useMockup: IViewMockup<any> | undefined

  static mockup<Props extends Object>(view: IViewMockupView<Props>, props: Props): IViewWidgetCollection {
    return [
      view.helmet(),
      view.body(props),
      view.navbar(),
      view.toolbox(),
    ]
  };

  static render<Props extends Object>(
    view: IView<Props>,
    props: Props,
    mockup?: IViewMockup<Props>,
  ): IViewWidgetCollection {
    view.useProps(props)
    return (mockup || this.mockup)(view, props)
  }

}

export class ViewWidget<Props extends Object> implements IView<Props> {

  protected _props: Readonly<Props> | ISignalController<Props> | undefined;

  get props(): Readonly<Props> | ISignalController<Props> {
    return this._props || ({} as Readonly<Props> | ISignalController<Props>);
  }

  constructor(
    public readonly options: IViewOptions<Props>
  ) {
  }

  mounted(): void {
  }

  unmounted(): void {
  }

  useProps(props: Props): this {
    this._props = this._props || props;
    return this;
  }

  helmet(): IWidgetNode<any, any> | undefined {
    return undefined
  }

  toolbox(): IWidgetNode<any, any> | undefined {
    return undefined
  }

  navbar(): IWidgetNode<any, any> | undefined {
    return undefined
  }

  body(props?: Props | undefined): IWidgetNode<any, any> | undefined {
    console.error('View Properties', props)
    throw new Error('Not < body > implemented')
  }

}


export class StatefulView<Props extends Object> extends ViewWidget<Props> {

  protected _props: ISignalController<Props> | undefined;

  get props(): ISignalController<Props> {
    return this._props || ({} as ISignalController<Props>);
  }

  useProps(props: Props): this {
    this._props = this._props || new SignalHook.Controller(props);
    return this;
  }

}


export class StatelessView<Props extends Object> extends ViewWidget<Props> {

  protected _props: Readonly<Props> | undefined;

  get props(): Readonly<Props> {
    return this._props || ({} as Readonly<Props>);
  }

  useProps(props: Props): this {
    this._props = this._props || props;
    return this;
  }

}