export enum InsertionPosition {
  BeforeBegin = 'BeforeBegin',
  BeforeEnd = 'BeforeEnd',
  AfterBegin = 'AfterBegin',
  AfterEnd = 'AfterEnd',
}

export enum InsertionSiblingPosition {
  Before = 'before',
  After = 'After',
}

export enum AligningDirection {
  Row = 'row',
  Column = 'column',
}

export enum AligningProperty {
  JustifyContent = "justify-content",
  AlignItems = "align-items",
  AlignSelf = "align-self",
  AlignContent = "align-content",
}

export enum Aligning {
  Start = 'start',
  Center = 'center',
  End = 'end',
  Left = 'left',
  Right = 'right',
  FlexStart = 'flex-start',
  FlexEnd = 'flex-end',
  SpaceBetween = 'space-between',
  SpaceAround = 'space-around',
  SpaceEvenly = 'space-evenly',
  Normal = 'normal',
  Stretch = 'stretch',
  SafeCenter = 'safe center',
  UnsafeCenter = 'unsafe center',
  First = 'first',
  FirstBaseline = 'first baseline',
  Last = 'last',
  LastBaseline = 'last baseline',
  Inherit = 'inherit',
  Initial = 'initial',
  Unset = 'unset',
}

export enum TransitionMode {
  Entry = 'entry',
  Out = 'out',
}

export enum ToggleOption {
  Visibility = 'visibility',
  Activity = 'activity',
  Interactivity = 'interactivity',
  Stase = 'stase',
}

export enum TreatmentQueueStatus {
  Continue = 'continue',
  Cancel = 'cancel',
  Exit = 'exit',
}

export enum WidgetsNativeProperty {
  Signal = 'signal',
  Ref = 'ref',
  Children = 'children',
  Style = 'style',
  ClassName = 'classname',
  Data = 'data',
  Nsa = 'nsa',
  On = 'on',
  Listen = 'listen',
  Features = 'features',
}

export enum TextAligning {
  Left = 'left',
  Center = 'center',
  Right = 'right',
  Justify = 'justify',
}

export enum Sizer {
  XS = 'x-small',
  S = 'small',
  M = 'medium',
  L = 'large',
  XL = 'x-large',
}

export enum AbsoluteUnit{
  Cm = 'cm',
  Mm = 'mm',
  In = 'in',
  Px = 'px',
  Pt = 'pt',
  Pc = 'pc',
}

export enum RelativeUnit{
  Em = 'em',
  Ex = 'ex',
  Ch = 'ch',
  Rem = 'rem',
  Vw = 'vw',
  Vh = 'vh',
  VMin = 'vmin',
  VMax = 'vmax',
  Percent = '%',
}