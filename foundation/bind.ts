import type {IComponentConstruct , IElementSignal , IParameters , IWidget} from '../types';
import {decamelize} from '../utilities';
// import {WidgetElement} from './elements';
import {Environment} from './environment';
import {ISignalables , Signalables} from '@protorians/signalable';


export function Bind<Props extends IParameters> (name : string , component : IComponentConstruct<Props>) {
  name = decamelize(name , '-');

  if (Environment.Browser() && !customElements.get(name)) {
    customElements.define(name.includes('-') ? name : `widget-${name}` , class extends HTMLElement {

      use: IComponentConstruct<Props> | undefined = component;

      protected _props : Props = {} as Props;

      protected _composite : IComponentConstruct<Props> | undefined;

      signal : Readonly<ISignalables<Props , IElementSignal<Props>>>;

      widget : IWidget<any , any> | undefined;

      constructor () {
        super();
        this.sync();
        this.signal = new Signalables(this.props);
      }

      get props () {
        return this._props;
      }

      set props (props) {
        this._props = props;
      }

      get component () {
        return this._composite;
      }

      bootstrap () : this {
        return this;
      }

      mounted () {
      }

      unmounted () {
      }

      adopted () {
      }

      initialize () {

        return this.sync();

      }

      sync () {

        Object.values(this.attributes).forEach(attribute =>
          this.props[attribute.name as keyof Props] = attribute.value as Props[ keyof Props]);

        if (this.signal) this.signal.dispatch('synchronized' , this.props);

        return this;

      }

      mount (component? : IComponentConstruct<Props>) {

        if (component) {
          this._composite = component;
          this.initialize();
          this.innerHTML = '';
          this.widget = this._composite(this.props).render();
          this.append(this.widget.element);
          this.signal.dispatch('mounted' , this);
          this.mounted();
        }

        return this;

      }

      connectedCallback () : void {
        this.bootstrap().mount(this.use);
        this.signal.dispatch('connected' , this);
      }

      disconnectedCallback () {
        this.signal.dispatch('disconnected' , this);
        this.unmounted();
      }

      adoptedCallback () {
        this.signal.dispatch('adopted' , this);
        this.adopted();
      }

    });
  }
  return component;

}