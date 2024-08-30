import type {
  IContext, IContextuable,
  IAttributes,
  IWidgetElements,
} from '../types';



export function createContext<Payload, P extends IAttributes, E extends IWidgetElements>(context: IContextuable<Payload, P, E>): Partial<IContext<Payload, P, E>>{

  return {
    widget: context.widget,
    event: context.event || undefined,
    component: context.component || undefined,
    payload: context.payload || undefined,
  } as IContext<Payload, P, E>

}



// export class WidgetContext<P extends IProps, E extends IWidgetElements> implements IContext<P, E> {
//
//   #state: IStates<IStateSchema>;
//
//   #exceptedProps: string[] = [];
//
//   constructor() {
//
//     this.#state = new WidgetStates();
//
//     this.#exceptedProps = ["actions", "child", "context", "data", "ns", "style"];
//
//   }
//
//   get state(): IStates<IStateSchema> {
//     return this.#state;
//   }
//
//
//   useState(name: string): this {
//
//     console.log('useState', name);
//
//     return this;
//
//   }
//
//   setState(payload: IStatePayload<IStateSchema>): this {
//
//     console.log('setState', payload);
//
//     return this;
//
//   }
//
//   getState<S extends IStateSchema>(name: keyof S): IStates<S>[keyof IStates<S>] {
//
//     return this.state[name as keyof IStates<S>] as IStates<S>[keyof IStates<S>];
//
//   }
//
//
//   useRef(name: string): this {
//
//     console.log('useRef', name);
//
//     return this;
//
//   }
//
//   setRef(name: string): this {
//
//     console.log('setRef', name);
//
//     return this;
//
//   }
//
//   render(widget: IWidget<P, E>): IWidget<P, E> {
//
//     // widget.useContext(this)
//
//     if (widget.props.style) widget.style(widget.props.style);
//
//     if (widget.props.className) widget.className(widget.props.className);
//
//     if (widget.props.data) widget.data(widget.props.data);
//
//     if (widget.props.ns) widget.ns(widget.props.ns);
//
//     if (widget.props.child) widget.child(widget.props.child);
//
//
//     Object.entries(widget.props).forEach(
//       ({0: name, 1:value}) =>
//         this.#exceptedProps.includes(name)
//           ? undefined
//           // @ts-ignore
//           : widget.attrib(widget, name as keyof P, value)
//     )
//
//     return widget;
//
//   }
//
// }