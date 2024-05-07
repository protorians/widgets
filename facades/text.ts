import type {
  IHeadingProps,
  IParagraphProps,
  ISpanProps,
  IStrongProps,
  IWidgetProps,
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


export function Span(props: string | IWidgetProps<ISpanProps, HTMLSpanElement>) {

  if (typeof props == 'string') props = {child: props};

  return (new WidgetSpan(props));

}

export function Paragraph(props: string | IWidgetProps<IParagraphProps, HTMLParagraphElement>) {

  if (typeof props == 'string') props = {child: props};

  return (new WidgetParagraph(props));

}

export function Strong(props: string | IWidgetProps<IStrongProps, HTMLElement>) {

  if (typeof props == 'string') props = {child: props};

  return (new WidgetTextStrong(props));

}

export function HeadingLarger(props: string | IWidgetProps<IHeadingProps, HTMLHeadingElement>) {

  if (typeof props == 'string') props = {child: props};

  return (new WidgetHeadingLarger(props));

}

export function HeadingLarge(props: string | IWidgetProps<IHeadingProps, HTMLHeadingElement>) {

  if (typeof props == 'string') props = {child: props};

  return (new WidgetHeadingLarge(props));

}

export function Heading(props: string | IWidgetProps<IHeadingProps, HTMLHeadingElement>) {

  if (typeof props == 'string') props = {child: props};

  return (new WidgetHeadingMedium(props));

}

export function HeadingSmall(props: string | IWidgetProps<IHeadingProps, HTMLHeadingElement>) {

  if (typeof props == 'string') props = {child: props};

  return (new WidgetHeadingSmall(props));

}

export function HeadingSmaller(props: string | IWidgetProps<IHeadingProps, HTMLHeadingElement>) {

  if (typeof props == 'string') props = {child: props};

  return (new WidgetHeadingSmaller(props));

}

