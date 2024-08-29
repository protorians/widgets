import type {
  IHeadingAttributes,
  IParagraphAttributes,
  ISpanAttributes,
  IStrongAttributes,
  IAttributesScope,
} from '../types';
import {
  WidgetHeadingLarge,
  WidgetHeadingLarger,
  WidgetHeadingMedium,
  WidgetHeadingSmall,
  WidgetHeadingSmaller,
  WidgetParagraph,
  WidgetSpan, WidgetTextStrong,
} from '../supports';


export function Text(props: string | IAttributesScope<ISpanAttributes, HTMLSpanElement>) {

  if (typeof props == 'string') props = {children: props};

  return (new WidgetSpan(props));

}

export function Paragraph(props: string | IAttributesScope<IParagraphAttributes, HTMLParagraphElement>) {

  if (typeof props == 'string') props = {children: props};

  return (new WidgetParagraph(props));

}

export function Strong(props: string | IAttributesScope<IStrongAttributes, HTMLElement>) {

  if (typeof props == 'string') props = {children: props};

  return (new WidgetTextStrong(props));

}

export function HeadingLarger(props: string | IAttributesScope<IHeadingAttributes, HTMLHeadingElement>) {

  if (typeof props == 'string') props = {children: props};

  return (new WidgetHeadingLarger(props));

}

export function HeadingLarge(props: string | IAttributesScope<IHeadingAttributes, HTMLHeadingElement>) {

  if (typeof props == 'string') props = {children: props};

  return (new WidgetHeadingLarge(props));

}

export function Heading(props: string | IAttributesScope<IHeadingAttributes, HTMLHeadingElement>) {

  if (typeof props == 'string') props = {children: props};

  return (new WidgetHeadingMedium(props));

}

export function HeadingSmall(props: string | IAttributesScope<IHeadingAttributes, HTMLHeadingElement>) {

  if (typeof props == 'string') props = {children: props};

  return (new WidgetHeadingSmall(props));

}

export function HeadingSmaller(props: string | IAttributesScope<IHeadingAttributes, HTMLHeadingElement>) {

  if (typeof props == 'string') props = {children: props};

  return (new WidgetHeadingSmaller(props));

}

