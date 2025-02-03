import type {IWidgetNode} from "./widget";
import type {IComponentPayload} from "./component";

export interface IView<S extends IComponentPayload<any, any>> {

  get states(): S['states'];

  get props(): S['props'];

  __use__(segment: string, value: any): this;

  mounted(): void;

  unmounted(): void;

  helmet(): IWidgetNode<any, any> | undefined;

  navigation(): IWidgetNode<any, any> | undefined;

  body(props?: S['props']): IWidgetNode<any, any> | undefined;

}