import type {
  IChildren ,
  IAttributes ,
  IWidget ,
  IWidgetElements ,
  IAttributesScope ,
  IStyle ,
  IClassNames ,
  IExtendedAttributes ,
  IParameterValue ,
  IComponent ,
  IParameters ,
  IChildCallback ,
  IManipulateCallback ,
  IEventStaticListeners ,
  IEventListeners ,
  IWidgetSignalable , IWidgetSignalableMap , IWidgetSignalableMaps ,
} from '../types';
import {
  createContext ,
  Coreable ,
} from '../foundation';
import {Signalables} from '@protorians/signalable';
import {ISignalListenOption} from '@protorians/signalable/types';


export class WidgetNode<P extends IAttributes , E extends IWidgetElements> implements IWidget<P , E> {

  protected _element : E;

  protected _component : IComponent<IParameters> | undefined;

  protected _ready : boolean = false;

  signal : IWidgetSignalable<P , E>;

  props : Readonly<Partial<IAttributesScope<P , E>>>;

  // attributions : IAttribution<Partial<IAttributesScope<P, E>>, IDataValue>;


  constructor (props : IAttributesScope<P , E>) {

    this._element = document.createElement(this.tag) as E;

    this.props = (new Coreable.Properties<P , E>(this)).sync(props) as Readonly<Partial<IAttributesScope<P , E>>>;

    this.signal = new Signalables(this.props) as IWidgetSignalable<P , E>;

    // this.attributions = new Attribution(this._element as HTMLElement, this.props);

  }


  static style<At extends IAttributes , El extends IWidgetElements> () : Partial<IStyle<At , El>> | undefined {
    return undefined;
  }

  static className<At extends IAttributes , El extends IWidgetElements> () : IClassNames<At , El> | undefined {
    return undefined;
  }

  static data () : IExtendedAttributes | undefined {
    return undefined;
  }

  static ns () : IExtendedAttributes | undefined {
    return undefined;
  }

  static event<At extends IAttributes , El extends IWidgetElements> () : IEventStaticListeners<At , El> | undefined {
    return undefined;
  }

  static listener<At extends IAttributes , El extends IWidgetElements> () : IEventListeners<At , El> | undefined {
    return undefined;
  }

  static child () : IChildren<any , any> | undefined {
    return undefined;
  }

  static signal<At extends IAttributes , El extends IWidgetElements> () : Partial<IWidgetSignalableMap<At , El>> | undefined {
    return undefined;
  }

  static transformProperties<P extends IAttributes , E extends IWidgetElements> (props : Partial<IAttributesScope<P , E>>) {
    return props;
  }

  static properties<P extends IAttributes , E extends IWidgetElements> () : Partial<IAttributesScope<P , E>> | undefined {
    return undefined;
  }

  get tag () : string {
    return 'div';
  }

  get element () {
    return this._element;
  }

  get component () : IComponent<IParameters> | undefined {
    return this._component;
  }

  get ready () {
    return this._ready;
  }

  defineElement (element : E) : this {
    this._element = element;
    this.signal.dispatch('defineElement' , element);
    return this;
  }

  defineComponent<C extends IParameters> (component : IComponent<C>) : this {
    this._component = component;
    this.signal.dispatch('defineComponent' , this._component as IComponent<C>);
    return this;
  }

  useComponent<Props extends IParameters> (component : IComponent<Props> | undefined) : this {
    if (component) {
      component.widget = this;
      this._component = component;
      this.signal.dispatch('useComponent' , this._component);
    }
    return this;

  }

  clear () : this {
    return Coreable.Clear<P , E>(this) as typeof this;
  }

  children (value? : IChildren<IAttributes , IWidgetElements>) : this {
    return Coreable.setChildren<P , E>(this , value) as typeof this;
  }

  style (value? : IStyle<P , E>) : this {
    return Coreable.setStyle<P , E>(this , value) as typeof this;
  }

  className (values? : IClassNames<P , E>) : this {
    return Coreable.setClassName<P , E>(this , values) as typeof this;
  }

  value (value? : string) : this {
    return Coreable.setValue<P , E>(this , value) as typeof this;
  }

  html (value? : string) : this {
    return Coreable.setHtml<P , E>(this , value) as typeof this;
  }

  trigger (type ? : keyof HTMLElementEventMap) : this {
    return Coreable.setTrigger<P , E>(this , type) as typeof this;
  }

  listen (type : keyof HTMLElementEventMap , listener : IChildCallback<P , E> , options? : boolean | AddEventListenerOptions) : this {
    return Coreable.setListen<P , E>(this , type , listener , options) as typeof this;
  }

  listens (listeners : IEventListeners<P , E>) : this {
    return Coreable.setListens<P , E>(this , listeners) as typeof this;
  }

  ons (listeners : IEventStaticListeners<P , E>) : this {
    return Coreable.setOns<P , E>(this , listeners) as typeof this;
  }

  on<V extends keyof IEventStaticListeners<P , E>> (type : V , listener : IEventStaticListeners<P , E>[V]) : this {
    return Coreable.setOn<P , E , V>(this , type , listener) as typeof this;
  }

  manipulate (callback : IManipulateCallback<P , E>) : this {
    callback(createContext<IManipulateCallback<P , E> , P , E>({
      widget: this ,
      component: this._component ,
      payload: callback,
    }));
    this.signal.dispatch('manipulate' , callback);
    return this;
  }

  data (data? : IExtendedAttributes) : this {
    return Coreable.setData<P , E>(this , data) as typeof this;
  }

  // attribution (attribution? : IExtendedAttributes) : this {
  //   return Coreable.attribution<P, E>(this, attribution) as typeof this;
  // }

  attrib<A extends keyof P> (name : A , value : P[A] | IParameterValue) : this {
    return Coreable.setAttribute<P , E , A>(this , name , value) as typeof this;
  }

  attribs (attributes : Partial<P>) : this {
    return Coreable.setAttributes<P , E>(this , attributes) as typeof this;
  }


  remove () : this {
    return Coreable.remove<P , E>(this) as typeof this;
  }

  destroy () : void {
    Coreable.destroy<P , E>(this);
  }


  onSignal<Si extends keyof IWidgetSignalableMap<P , E>> (name : Si , callback : ISignalListenOption<Readonly<Partial<IAttributesScope<P , E>>> , IWidgetSignalableMap<P , E>[Si]>) {
    this.signal.listen(name , callback);
    return this;
  }


  onSignals (signals : Partial<IWidgetSignalableMaps<P , E>>) : this {
    Object.entries(signals).forEach(({0: name , 1: callback}) =>
      this.onSignal(name as keyof IWidgetSignalableMap<P , E> , callback as ISignalListenOption<Readonly<Partial<IAttributesScope<P , E>>> , IParameterValue>));
    return this;
  }


  nsa (nsa : IParameters) : this {

    if (this.element instanceof HTMLElement) {
      const e = this.element;
      Object.entries(Coreable.nsa(nsa , undefined , ':'))
        .forEach(([key , value]) => {
          e.setAttribute(key , `${value}`);
        });
    }

    return this;
  }


  render () : this {

    // this.signal.dispatch('initialize',  createWidgetSignalableDispatcher<typeof this,  P,  E>(this,  this));

    if (this.props.signal) this.onSignals(this.props.signal);

    if (this.props.ref) this.props.ref.use(this);

    if (this.props.style) this.style(this.props.style);

    if (this.props.className) this.className(this.props.className);

    if (this.props.data) this.data(this.props.data);

    if (this.props.nsa) this.nsa(this.props.nsa);

    if (this.props.children) this.children(this.props.children);

    if (this.props.on) this.ons(this.props.on);

    if (this.props.listen) this.listens(this.props.listen);

    if (this.props.attributes) this.attribs(this.props.attributes);

    Object.entries(this.props).forEach(
      ({0: name , 1: value}) =>
        Coreable.setAttribuable<P , E>(this , name , value) ,
    );

    this._ready = true;

    this.signal.dispatch('ready' , this);

    return this;

  }

}