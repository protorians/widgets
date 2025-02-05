import {IComponentPayload, IView, IViewCollection, IWidgetCollection, IWidgetNode} from "./types";
import {ViewWidget} from "./view";
import {extractComponentName, ucFirstLetter} from "./helpers";
import {View, Widget} from "./collection";
import {WidgetException} from "./errors";
import {WidgetNode} from "./widget-node";
import {Mount} from "./component";


export function getVariableName(variable: any) {
  return Object.keys({variable})
}


const Make = {
  composable: {
    view: {
      initialize(target: any, collection?: IWidgetCollection | IViewCollection, collectionKey?: string) {
        const identifier = extractComponentName(target.name, collectionKey)
        const id = ucFirstLetter(identifier);
        collection = collection || View;
        if (collection[id]) throw (new WidgetException(`This composable < ${id} > has already been defined`)).show()
        collection[id] = (props: any) => this.definition<any>(target, props)

      },
      definition: <S extends IComponentPayload<any, any>>(target: any, props: S['props']) => {
        const view = new target() as IView<S>;
        const widget = view.body(props);
        widget?.signal.listen('mount', view.mounted.bind(view))
        widget?.signal.listen('unmount', view.unmounted.bind(view))
        return widget || undefined
      },
    },
    widget: {
      initialize(target: any, collection?: IWidgetCollection | IViewCollection, collectionKey?: string) {
        const identifier = extractComponentName(target.name, collectionKey)
        const id = `${identifier[0].toUpperCase()}${identifier.substring(1)}`;
        collection = collection || Widget;
        if (collection[id]) throw (new WidgetException(`This composable < ${id} > has already been defined`)).show()
        collection[id] = (attributes: any) => this.definition(target, attributes);
      },
      definition(target: any, store: any) {
        return (new target(store)) as IWidgetNode<any, any>;
      }
    }
  }
}

export function Composable(
  collection?: IWidgetCollection | IViewCollection,
  collectionKey?: string
) {
  return function (target: any) {
    if (target.prototype instanceof ViewWidget) {
      Make.composable.view.initialize(target, collection, collectionKey);
    } else if (target.prototype instanceof WidgetNode) {
      Make.composable.widget.initialize(target, collection, collectionKey);
    } else throw (new WidgetException(`< ${target.name} > is not a composable`)).show()

  }
}

export function Mountable() {
  return function (target: any) {
    const name = extractComponentName(target.name)
    if (target.prototype instanceof ViewWidget) {
      Mount(`View${ucFirstLetter(name)}`, (props) =>
        Make.composable.view.definition(target, props) || (new WidgetNode({children: ''}))
      );
    } else if (target.prototype instanceof WidgetNode) {
      Mount(`Widget${ucFirstLetter(name)}`, (store) =>
        Make.composable.widget.definition(target, store)
      )
    }
  }
}

export function Override() {
  return function (target: any) {
    console.log('Override', target);
  }
}
