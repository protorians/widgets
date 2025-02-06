import type {IButtonAttributes, IButtonAttributesBase, IWidgetDeclaration} from "../types";
import {WidgetNode} from "../widget-node";
import {Composable, Mountable} from "../decorators";
import {declarationExcavates} from "../helpers";


/**
 * @description Button Widget
 */
@Mountable()
@Composable()
export class ButtonWidget extends WidgetNode<HTMLButtonElement, IButtonAttributes> {
  get tag(): string {
    return 'button'
  };
}

/**
 * @description Construct's Function of `ButtonWidget`
 * @param declaration
 * @constructor
 */
export function Button(declaration: IWidgetDeclaration<HTMLButtonElement, IButtonAttributes & IButtonAttributesBase>): ButtonWidget {

  const props = declarationExcavates<
    HTMLButtonElement,
    IButtonAttributes,
    IButtonAttributesBase
  >(declaration, ['onPress', 'onPressStart', 'onPressEnd',])

  props.current.listen = {
    ...props.current.listen,
    click: props.excavate.onPress,
    mousedown: props.excavate.onPressStart,
    mouseup: props.excavate.onPressEnd,
  }

  return new ButtonWidget(props.current)
}
