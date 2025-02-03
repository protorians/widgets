import type {ICommonAttributes, IWidgetDeclaration} from "../types";
import {WidgetNode} from "../widget-node";
import {Composable, Mountable} from "../decorators";


/**
 * @description Section Widget
 */
@Mountable()
@Composable()
export class SectionWidget extends WidgetNode<HTMLElement, ICommonAttributes> {
  get tag(): string {
    return 'section'
  };
}

/**
 * @description Construct's Function of `WidgetNode`
 * @param declaration
 * @constructor
 */
export function Layer(declaration: IWidgetDeclaration<HTMLElement, ICommonAttributes>): WidgetNode<HTMLElement, ICommonAttributes> {
  return new WidgetNode(declaration)
}

/**
 * @description Construct's Function of `SectionWidget`
 * @param declaration
 * @constructor
 */
export function Section(declaration: IWidgetDeclaration<HTMLElement, ICommonAttributes>): SectionWidget {
  return new SectionWidget(declaration)
}