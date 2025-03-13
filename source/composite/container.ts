import type {ICommonAttributes, IContainerProps, IWidgetDeclaration} from "../types/index.js";
import {Layer, Section} from "../overlay/index.js";
import {declarationExcavates} from "../helpers/index.js";
import {SizeCapabilities} from "../capabilities/index.js";
import {Sizer} from "../enums.js";


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
                                ? SizeCapabilities.capability('surface')?.on(widget).make(size) : size
                        ) : SizeCapabilities.capability('unit')?.on(widget).make(size)}`,
                })
            }
        }
    })

    return Section({
        // ...props.current,
        style: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            ...props.excavate.style
        },
        children: content,
    })

}