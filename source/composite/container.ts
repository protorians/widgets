import type {ICommonAttributes, IContainerProps, IWidgetDeclaration} from "../types";
import {Layer, Section} from "../overlay";
import {declarationExcavates} from "../helpers";
import {SizeKit} from "../kits";
import {Sizer} from "../enums";
import {Style} from "../style";


export function Container(declaration: IWidgetDeclaration<HTMLElement, IContainerProps & ICommonAttributes>) {

  const props = declarationExcavates<HTMLElement, ICommonAttributes, IContainerProps>(
    declaration,
    ['size', 'children', 'contentAttributes', 'style']
  )
  const size = props.excavate.size || 1;
  const content = Layer({
    ...(props.excavate.contentAttributes || {}),
    children: props.excavate.children,
    signal: {
      mount({widget}) {
        widget.style({
          width: '100%',
          maxWidth: `${(typeof size == 'string')
            ? (Object.values(Sizer).includes(size as Sizer)
                ? SizeKit.capability('surface')?.on(widget).make(size) : size
            ) : SizeKit.capability('unit')?.on(widget).make(size)}`,
        })
      }
    }
  })

  return Section({
    // ...props.current,
    style: Style({
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      ...(props.excavate.style?.declaration || {})
    }),
    children: content,
  })

}