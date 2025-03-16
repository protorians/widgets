import type {IButtonAttributes, IButtonAttributesBase, IWidgetDeclaration} from "../types/index.js";
import {WidgetNode} from "../widget-node.js";
import {Composable, Mountable} from "../decorators.js";
import {declarationExcavates} from "../helpers/index.js";


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
  }

  if(props.excavate.onPressStart) props.current.listen.mousedown = props.excavate.onPressStart
  if(props.excavate.onPressEnd) props.current.listen.mouseup = props.excavate.onPressEnd

  return new ButtonWidget(props.current)
}
