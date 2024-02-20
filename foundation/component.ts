import type { IComponentConstruct } from "../types/component";
import { WidgetContext, WidgetEngine } from "./index";


export function Component<Props>(
    component: IComponentConstruct<Props>,
) {

    return (props: Props) => {

        const context = new WidgetContext(
            new WidgetEngine(
                component(props)
            )
        )

        console.warn('Create component', context)

        return context.engine.main

    }

}
