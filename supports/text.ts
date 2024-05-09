import type {
  IHeadingAttributes,
  IParagraphAttributes,
  ISpanAttributes,
  IStrongAttributes,
  IWidget,
} from '../types';
import {WidgetNode} from './widget';


export class WidgetSpan

  extends WidgetNode<ISpanAttributes, HTMLSpanElement>

  implements IWidget<ISpanAttributes, HTMLSpanElement> {

  get tag(): string {
    return 'span';
  }

}


export class WidgetParagraph

  extends WidgetNode<IParagraphAttributes, HTMLParagraphElement>

  implements IWidget<IParagraphAttributes, HTMLParagraphElement> {

  get tag(): string {
    return 'p';
  }

}


export class WidgetTextStrong

  extends WidgetNode<IStrongAttributes, HTMLElement>

  implements IWidget<IStrongAttributes, HTMLElement> {

  get tag(): string {
    return 'strong';
  }

}


export class WidgetHeadingLarger

  extends WidgetNode<IHeadingAttributes, HTMLHeadingElement>

  implements IWidget<IHeadingAttributes, HTMLHeadingElement> {

  get tag(): string {
    return 'h1';
  }

}

export class WidgetHeadingLarge

  extends WidgetNode<IHeadingAttributes, HTMLHeadingElement>

  implements IWidget<IHeadingAttributes, HTMLHeadingElement> {

  get tag(): string {
    return 'h2';
  }

}

export class WidgetHeadingMedium

  extends WidgetNode<IHeadingAttributes, HTMLHeadingElement>

  implements IWidget<IHeadingAttributes, HTMLHeadingElement> {

  get tag(): string {
    return 'h3';
  }

}

export class WidgetHeadingSmall

  extends WidgetNode<IHeadingAttributes, HTMLHeadingElement>

  implements IWidget<IHeadingAttributes, HTMLHeadingElement> {

  get tag(): string {
    return 'h4';
  }

}

export class WidgetHeadingSmaller

  extends WidgetNode<IHeadingAttributes, HTMLHeadingElement>

  implements IWidget<IHeadingAttributes, HTMLHeadingElement> {

  get tag(): string {
    return 'h5';
  }

}


