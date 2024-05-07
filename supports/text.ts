import type {
  IHeadingProps,
  IParagraphProps,
  ISpanProps,
  IStrongProps,
  IWidget,
} from '../types';
import {WidgetNode} from './widget';


export class WidgetSpan

  extends WidgetNode<ISpanProps, HTMLSpanElement>

  implements IWidget<ISpanProps, HTMLSpanElement> {

  get tag(): string {
    return 'span';
  }

}


export class WidgetParagraph

  extends WidgetNode<IParagraphProps, HTMLParagraphElement>

  implements IWidget<IParagraphProps, HTMLParagraphElement> {

  get tag(): string {
    return 'p';
  }

}


export class WidgetTextStrong

  extends WidgetNode<IStrongProps, HTMLElement>

  implements IWidget<IStrongProps, HTMLElement> {

  get tag(): string {
    return 'strong';
  }

}


export class WidgetHeadingLarger

  extends WidgetNode<IHeadingProps, HTMLHeadingElement>

  implements IWidget<IHeadingProps, HTMLHeadingElement> {

  get tag(): string {
    return 'h1';
  }

}

export class WidgetHeadingLarge

  extends WidgetNode<IHeadingProps, HTMLHeadingElement>

  implements IWidget<IHeadingProps, HTMLHeadingElement> {

  get tag(): string {
    return 'h2';
  }

}

export class WidgetHeadingMedium

  extends WidgetNode<IHeadingProps, HTMLHeadingElement>

  implements IWidget<IHeadingProps, HTMLHeadingElement> {

  get tag(): string {
    return 'h3';
  }

}

export class WidgetHeadingSmall

  extends WidgetNode<IHeadingProps, HTMLHeadingElement>

  implements IWidget<IHeadingProps, HTMLHeadingElement> {

  get tag(): string {
    return 'h4';
  }

}

export class WidgetHeadingSmaller

  extends WidgetNode<IHeadingProps, HTMLHeadingElement>

  implements IWidget<IHeadingProps, HTMLHeadingElement> {

  get tag(): string {
    return 'h5';
  }

}


