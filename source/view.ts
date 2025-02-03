import type {IWidgetNode, IView, IComponentPayload} from "./types";

export class WidgetView<S extends IComponentPayload<any, any>> implements IView<S> {

  _states: S['states'] = {} as S['states'];
  _props: S['props'] = {} as S['props'];

  get states(): S['states'] {
    return this._states;
  }

  get props(): S['props'] {
    return this._props;
  }

  __use__(segment: string, value: any): this {

    switch (segment) {
      case 'states':
        this._states = value as S['states'];
        break;
      case 'props':
        this._props = value as S['props'];
        break;
    }

    return this;
  }

  mounted() {
  }

  unmounted() {
  }

  helmet(): IWidgetNode<any, any> | undefined {
    return undefined
  }

  navigation(): IWidgetNode<any, any> | undefined {
    return undefined
  }

  body(props?: S['props']): IWidgetNode<any, any> | undefined {
    console.error(props)
    throw new Error('Not < body > implemented')
  }

}