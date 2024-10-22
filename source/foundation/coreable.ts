import type {
  IParameterValue,
  IAttributes,
  IWidget,
  IWidgetElements,
  IStaticWidgetNode,
  IAttributesScope,
  IClassName,
  ICoreableCompound,
  ICoreableProperties,
  ICoreablePropertyOptions,
  ICoreableProperty,
} from '../types';
import {WidgetCore} from './core';

export class CoreableCompound<P extends IAttributes, E extends IWidgetElements>
  implements ICoreableCompound<P, E> {

  construct: IStaticWidgetNode<P, E>;

  constructor(public widget: IWidget<P, E>) {
    this.construct = WidgetCore.Runtime.statically(widget);
  }

  render(): this {
    return this;
  }

}

export class CoreableProperty<P extends IAttributes, E extends IWidgetElements>
  implements ICoreableProperty<P, E> {

  constructor(
    public name: Readonly<string>,
    public value: IParameterValue,
    public options: Readonly<ICoreablePropertyOptions> = {} as ICoreablePropertyOptions,
  ) {
  }

  parse<V>(widget: IWidget<P, E>): V {
    return WidgetCore.Runtime.parseValue(widget, this.value) as V;
  }

}

export class CoreableProperties<P extends IAttributes, E extends IWidgetElements>
  extends CoreableCompound<P, E>
  implements ICoreableProperties<P, E> {

  parse(properties: Partial<IAttributesScope<P, E>>): Partial<IAttributesScope<P, E>> | undefined {
    properties = {...properties, ...this.construct.properties<P, E>()};
    if (properties) {
      Object.entries(properties)
        .forEach(({0: name, 1: value}) => {
          if (value instanceof CoreableProperty) {
            const parsedValue = value.parse(this.widget);
            if (value.options.remove) {
            } else if (value.options.replace) {
              properties[value.name] = parsedValue;
            } else if (!value.options.replace) {
              properties[name] = parsedValue;
            }
          } else {
            properties[name] = value;
          }
        });
    }

    return properties;
  }

  sync(props: Partial<IAttributesScope<P, E>>): Partial<IAttributesScope<P, E>> {
    props = this.parse(props) || ({} as Partial<IAttributesScope<P, E>>);
    return {
      ...props,
      children: this.construct.child() || props.children,
      signal: {...this.construct.signal(), ...props.signal},
      nsa: {...this.construct.ns(), ...props.nsa},
      data: {...this.construct.data(), ...props.data},
      on: {...this.construct.event(), ...props.on},
      listen: {...this.construct.listener(), ...props.listen},
      style: {...this.construct.style(), ...props.style},
      className: [
        ...(Array.isArray(this.construct.className()) ? this.construct.className() : [this.construct.className()]) as IClassName<P, E>[],
        ...(Array.isArray(props.className) ? props.className : [props.className]) as IClassName<P, E>[],
      ].filter(v => typeof v !== 'undefined'),
    };
  }

}
