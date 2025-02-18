import type {IApplication, IApplicationConfig, IRouterBaseScheme, IViewStack, IWidgetNode} from "./types";
import {Views} from "./view";
import {Mount} from "./component";
import {Image, Layer, Section, SmallerText, Text,} from "./overlay";


export class ApplicationStyle {
  static main = {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  }

  static content = {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 1,
    width: '100%',
    height: '100%',
  }
}

export class Application<RouterScheme extends IRouterBaseScheme> implements IApplication<RouterScheme> {
  protected main: IWidgetNode<any, any>;

  constructor(
    public readonly config: IApplicationConfig<RouterScheme>
  ) {
    this.main = Section({
      style: ApplicationStyle.main,
      children: Layer({
        style: ApplicationStyle.content,
        children: [

          this.config.icon
            ? Image({
              src: `${this.config.icon}`
            })
            : undefined,

          this.config.name
            ? Text({
              children: `${this.config.name}`
            })
            : undefined,

          this.config.title
            ? SmallerText({
              children: `${this.config.title}`
            })
            : undefined,

        ]
      })
    })
  }

  run() {

    Mount(this.config.element, () => this.main)

    this.config.router
      .signal
      .listen('navigate', ({route, params}) => {

        if (Views.stacked) {
          Views.stacked.collection
            .forEach(widget => {
              if (widget && widget.context?.root) {
                widget.signal.dispatch('unmount', {
                  root: widget.context.root,
                  widget,
                  payload: undefined
                })
              }
            })
        }

        const stack: IViewStack = {
          route,
          collection: Views.render(
            new route.view(route.options || {}),
            params,
            Views.useMockup,
          )
        }

        Views.stacked = stack;

        this.main
          .clear()
          .content(stack.collection)
      })

    this.config.router.run()
    return this;
  }

}

export function createApplication<RouterScheme extends IRouterBaseScheme>(
  config: IApplicationConfig<RouterScheme>
) {
  return (new Application<RouterScheme>(config))
}