import type {
  IChildren ,
  IAttributes ,
  IWidget ,
  IWidgetElements ,
  IAttributesScope ,
  IStyle ,
  IClassNames ,
  IExtendedAttributes ,
  IDataValue ,
  IComponent ,
  IObject ,
  IChildCallback ,
  IWidgetSignalable ,
  IManipulateCallback ,
  IWidgetSignalableListeners ,
  IEventStaticListeners ,
  IEventListeners ,
} from '../types';
import {
  createWidgetSignalableDispatcher ,
} from '../utilities';
import {
  createContext ,
  Coreable ,
} from '../foundation';
import { Signalables } from '@protorians/signalable';
import { Attribution , IAttribution } from '@protorians/attribution';


export class WidgetNode<P extends IAttributes , E extends IWidgetElements> implements IWidget<P , E> {

  protected _element : E;

  protected _component : IComponent<IObject> | undefined;

  protected _ready : boolean = false;

  signal : IWidgetSignalable<P , E>;

  props : Readonly<Partial<IAttributesScope<P , E>>>;

  attribution : IAttribution<Readonly<Partial<IAttributesScope<P , E>>> , IDataValue>;


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

  static signal<At extends IAttributes , El extends IWidgetElements> () : Partial<IWidgetSignalableListeners<At , El>> | undefined {
    return undefined;
  }

  static transformProperties<P extends IAttributes , E extends IWidgetElements> (props : Partial<IAttributesScope<P , E>>) {
    return props;
  }

  get tag () : string {
    return 'div';
  }

  get element () {
    return this._element;
  }

  get component () : IComponent<IObject> | undefined {
    return this._component;
  }

  get ready () {
    return this._ready;
  }

  constructor (props : IAttributesScope<P , E>) {

    this.props = Coreable.syncProperties<P , E>(this , props) as Readonly<Partial<IAttributesScope<P , E>>>;

    this._element = document.createElement(this.tag) as E;

    this.signal = new Signalables(this.props);

    this.attribution = new Attribution(this._element as HTMLElement , this.props);

  }

  defineElement (element : E) : this {
    this._element = element;
    this.signal.dispatch(
      'defineElement' ,
      createWidgetSignalableDispatcher<E , P , E>(this , element) ,
    );

    return this;
  }

  defineComponent<C extends IObject> (component : IComponent<C>) : this {
    this._component = component;
    this.signal.dispatch(
      'defineComponent' ,
      createWidgetSignalableDispatcher<IComponent<C> , P , E>(this , component) ,
    );

    return this;
  }

  useComponent<Props extends IObject> (component : IComponent<Props> | undefined) : this {

    if (component) {
      component.widget = this;
      this._component = component;

      this.signal.dispatch(
        'useComponent' ,
        createWidgetSignalableDispatcher<IComponent<Props> , P , E>(this , component) ,
      );

    }

    return this;

  }

  child (value? : IChildren<IAttributes , IWidgetElements>) : this {

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

    callback(
      createContext<P , E>({
        widget: this ,
        component: this._component ,
      }) ,
    );

    this.signal.dispatch('manipulate' , createWidgetSignalableDispatcher<typeof callback , P , E>(this , callback));

    return this;
  }

  data (data? : IExtendedAttributes) : this {

    return Coreable.setData<P , E>(this , data) as typeof this;

  }

  ns (ns? : IExtendedAttributes) : this {

    return Coreable.attribution<P , E>(this , ns) as typeof this;

  }

  attrib<A extends keyof P> (name : A , value : P[A] | IDataValue) : this {

    return Coreable.setAttribute<P , E , A>(this , name , value) as typeof this;

  }


  remove () : this {

    return Coreable.remove<P , E>(this) as typeof this;

  }


  onSignal<Si extends keyof IWidgetSignalableListeners<P , E>> (name : Si , callback : IWidgetSignalableListeners<P , E>[Si]) {
    // @ts-ignore
    this.signal.listen(name , callback);
    return this;
  }


  onSignals (signals : Partial<IWidgetSignalableListeners<P , E>>) : this {
    Object.entries(signals).forEach(({0: name , 1: callback}) =>
      this.onSignal(name as keyof IWidgetSignalableListeners<P , E> , callback));
    return this;
  }

  render () : this {

    this.signal.dispatch('initialize' , createWidgetSignalableDispatcher<typeof this , P , E>(this , this));

    if (this.props.signal) this.onSignals(this.props.signal);

    if (this.props.ref) this.props.ref.use(this);

    if (this.props.style) this.style(this.props.style);

    if (this.props.className) this.className(this.props.className);

    if (this.props.data) this.data(this.props.data);

    if (this.props.ns) this.ns(this.props.ns);

    if (this.props.child) this.child(this.props.child);

    if (this.props.on) this.ons(this.props.on);

    if (this.props.listen) this.listens(this.props.listen);


    Object.entries(this.props).forEach(
      ({0: name , 1: value}) =>
        Coreable.setAttribuable<P , E>(this , name , value) ,
    );

    this._ready = true;

    this.signal.dispatch('ready' , createWidgetSignalableDispatcher<typeof this , P , E>(this , this));

    return this;

  }

}