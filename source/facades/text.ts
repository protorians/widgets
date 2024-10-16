import type {
  IHeadingAttributes ,
  IParagraphAttributes ,
  ISpanAttributes ,
  IStrongAttributes ,
  IAttributesScope , IItalicAttributes ,
} from '../types';
import {
  WidgetHeadingLarge ,
  WidgetHeadingLarger ,
  WidgetHeadingMedium ,
  WidgetHeadingSmall ,
  WidgetHeadingSmaller , WidgetItalic ,
  WidgetParagraph ,
  WidgetSpan , WidgetTextStrong ,
} from '../supports';


export function Text(props: string | IAttributesScope<ISpanAttributes, HTMLSpanElement>) {

  if (typeof props == 'string') props = {children: props};

  return (new WidgetSpan(props));

}


export function Italic(props: string | IAttributesScope<IItalicAttributes, HTMLElement>) {

  if (typeof props == 'string') props = {children: props};

  return (new WidgetItalic(props));

}

export function Paragraph(props: string | IAttributesScope<IParagraphAttributes, HTMLParagraphElement>) {

  if (typeof props == 'string') props = {children: props};

  return (new WidgetParagraph(props));

}

export function Strong(props: string | IAttributesScope<IStrongAttributes, HTMLElement>) {

  if (typeof props == 'string') props = {children: props};

  return (new WidgetTextStrong(props));

}

export function H1(props: string | IAttributesScope<IHeadingAttributes, HTMLHeadingElement>) {

  if (typeof props == 'string') props = {children: props};

  return (new WidgetHeadingLarger(props));

}

export function H2(props: string | IAttributesScope<IHeadingAttributes, HTMLHeadingElement>) {

  if (typeof props == 'string') props = {children: props};

  return (new WidgetHeadingLarge(props));

}

export function H3(props: string | IAttributesScope<IHeadingAttributes, HTMLHeadingElement>) {

  if (typeof props == 'string') props = {children: props};

  return (new WidgetHeadingMedium(props));

}

export function H4(props: string | IAttributesScope<IHeadingAttributes, HTMLHeadingElement>) {

  if (typeof props == 'string') props = {children: props};

  return (new WidgetHeadingSmall(props));

}

export function H5(props: string | IAttributesScope<IHeadingAttributes, HTMLHeadingElement>) {

  if (typeof props == 'string') props = {children: props};

  return (new WidgetHeadingSmaller(props));

}

