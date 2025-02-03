import type {IAttributes, IRuntime, IRuntimeConstructor, IRuntimeMap, ITypographySettings, IWidgetNode} from "./types";
import {Manticore} from "./runtime";
import {TextAligning} from "./enums";

export class Widgets {

  static ServerRuntime?: IRuntimeConstructor<any, any> = undefined;
  static ClientRuntime?: IRuntimeConstructor<any, any> = undefined;

  static Typography: ITypographySettings = {
    family: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "sans-serif"`,
    size: "12px",
    weight: "400",
    line: "1.5",
    spacing: "initial",
    align: TextAligning.Justify,
  }

  static Runtime: IRuntimeMap = {
    server<E extends HTMLElement, A extends IAttributes>(widget: IWidgetNode<E, A>): IRuntime<E, A> {
      return (typeof Widgets.ServerRuntime !== 'undefined') ? new Widgets.ServerRuntime(widget) : new Manticore(widget)
    },
    client<E extends HTMLElement, A extends IAttributes>(widget: IWidgetNode<E, A>): IRuntime<E, A> {
      return (typeof Widgets.ClientRuntime !== 'undefined') ? new Widgets.ClientRuntime(widget) : (new Manticore(widget))
    },
  }

}
