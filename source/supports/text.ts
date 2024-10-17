import type {
  IHeadingAttributes ,
  IParagraphAttributes ,
  IParagraphWidget ,
  ISpanAttributes ,
  ITextWidget ,
  IStrongAttributes ,
  ITextStrongWidget ,
  IHeadingLargerWidget ,
  IHeadingLargeWidget ,
  IHeadingMediumWidget ,
  IHeadingSmallWidget ,
  IHeadingSmallerWidget , IItalicAttributes , IItalicWidget ,
} from '../types';
import {WidgetNode} from './widget';


export class WidgetSpan

  extends WidgetNode<ISpanAttributes, HTMLSpanElement>

  implements ITextWidget {

  get tag () : string {
    return 'span';
  }

}

export class WidgetItalic

  extends WidgetNode<IItalicAttributes, HTMLElement>

  implements IItalicWidget {

  get tag () : string {
    return 'i';
  }

}


export class WidgetParagraph

  extends WidgetNode<IParagraphAttributes, HTMLParagraphElement>

  implements IParagraphWidget {

  get tag () : string {
    return 'p';
  }

}


export class WidgetTextStrong

  extends WidgetNode<IStrongAttributes, HTMLElement>

  implements ITextStrongWidget {

  get tag () : string {
    return 'strong';
  }

}


export class WidgetHeadingLarger

  extends WidgetNode<IHeadingAttributes, HTMLHeadingElement>

  implements IHeadingLargerWidget {

  get tag () : string {
    return 'h1';
  }

}

export class WidgetHeadingLarge

  extends WidgetNode<IHeadingAttributes, HTMLHeadingElement>

  implements IHeadingLargeWidget {

  get tag () : string {
    return 'h2';
  }

}

export class WidgetHeadingMedium

  extends WidgetNode<IHeadingAttributes, HTMLHeadingElement>

  implements IHeadingMediumWidget {

  get tag () : string {
    return 'h3';
  }

}

export class WidgetHeadingSmall

  extends WidgetNode<IHeadingAttributes, HTMLHeadingElement>

  implements IHeadingSmallWidget {

  get tag () : string {
    return 'h4';
  }

}

export class WidgetHeadingSmaller

  extends WidgetNode<IHeadingAttributes, HTMLHeadingElement>

  implements IHeadingSmallerWidget {

  get tag () : string {
    return 'h5';
  }

}


