import type {IApplication, IApplicationConfig, IRouterBaseScheme, IWidgetNode} from "./types";
import {Views} from "./view";
import {Mount} from "./component";
import {Section} from "./overlay";

export class ApplicationMain<RouterScheme extends IRouterBaseScheme> implements IApplication<RouterScheme> {
  protected widgetMain: IWidgetNode<any, any>;

  constructor(
    public readonly config: IApplicationConfig<RouterScheme>
  ) {
    this.widgetMain = Section({
      children: 'Loading...'
    })
  }

  run() {

    Mount(this.config.target, () => this.widgetMain)

    this.config.router
      .signal
      .listen('navigate', ({route, params}) => {
        this.widgetMain.clear().content(
          Views.render(
            new route.view(route.options || {}),
            params,
            Views.useMockup
          )
        )
      })

    this.config.router.run()
    return this;
  }

}

export function Application<RouterScheme extends IRouterBaseScheme>(
  config: IApplicationConfig<RouterScheme>
) {
  return (new ApplicationMain<RouterScheme>(config))
}