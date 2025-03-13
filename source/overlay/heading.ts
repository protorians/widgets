import {Composable, Mountable} from "../decorators.js";
import {WidgetNode} from "../widget-node.js";
import type {IHeadingAttributes, IWidgetDeclaration} from "../types/index.js";

/**
 * @description Smaller Heading Widget
 */
@Mountable()
@Composable()
export class SmallerHeadingWidget extends WidgetNode<HTMLHeadElement, IHeadingAttributes> {
    get tag(): string {
        return 'h5'
    };
}

/**
 * @description Small Heading Widget
 */
@Mountable()
@Composable()
export class SmallHeadingWidget extends WidgetNode<HTMLHeadElement, IHeadingAttributes> {
    get tag(): string {
        return 'h4'
    };
}

/**
 * @description Heading Widget
 */
@Mountable()
@Composable()
export class HeadingWidget extends WidgetNode<HTMLHeadElement, IHeadingAttributes> {
    get tag(): string {
        return 'h3'
    };
}

/**
 * @description Large Heading Widget
 */
@Mountable()
@Composable()
export class LargeHeadingWidget extends WidgetNode<HTMLHeadElement, IHeadingAttributes> {
    get tag(): string {
        return 'h2'
    };
}

/**
 * @description Larger Heading Widget
 */
@Mountable()
@Composable()
export class LargerHeadingWidget extends WidgetNode<HTMLHeadElement, IHeadingAttributes> {
    get tag(): string {
        return 'h1'
    };
}

/**
 * @description Construct's Function of `SmallerHeadingWidget`
 * @param declaration
 * @constructor
 */
export function SmallerHeading(declaration: IWidgetDeclaration<HTMLElement, IHeadingAttributes>): SmallerHeadingWidget {
    return new SmallerHeadingWidget(declaration)
}

/**
 * @description Construct's Function of `SmallHeadingWidget`
 * @param declaration
 * @constructor
 */
export function SmallHeading(declaration: IWidgetDeclaration<HTMLElement, IHeadingAttributes>): SmallHeadingWidget {
    return new SmallHeadingWidget(declaration)
}

/**
 * @description Construct's Function of `HeadingWidget`
 * @param declaration
 * @constructor
 */
export function Heading(declaration: IWidgetDeclaration<HTMLElement, IHeadingAttributes>): HeadingWidget {
    return new HeadingWidget(declaration)
}

/**
 * @description Construct's Function of `LargeHeadingWidget`
 * @param declaration
 * @constructor
 */
export function LargeHeading(declaration: IWidgetDeclaration<HTMLElement, IHeadingAttributes>): LargeHeadingWidget {
    return new LargeHeadingWidget(declaration)
}

/**
 * @description Construct's Function of `LargerHeadingWidget`
 * @param declaration
 * @constructor
 */
export function LargerHeading(declaration: IWidgetDeclaration<HTMLElement, IHeadingAttributes>): LargerHeadingWidget {
    return new LargerHeadingWidget(declaration)
}
