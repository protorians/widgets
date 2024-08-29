import {Component} from './component';
import {
  IComponentConstruct ,
  IObject ,
  IRouterSettings ,
  IRoutesScheme , IView , IViewOptions , IViews , IWidget ,
} from '../types';
import {takeState , Widget} from '../facades';
import {RouterRequest} from './router-request';
import {defineClientRouter} from './router-client';


export function View<Props extends IObject> (
  component : IComponentConstruct<Props> ,
  options ? : IViewOptions ,
) : IView<Props> {
  return {
    component ,
    options ,
  };
}

export function Views<Routes extends IRoutesScheme> (
  {
    index ,
    routes ,
    mode ,
    errors ,
    signals ,
  } : IRouterSettings<Routes> ,
) : IViews<Routes> {
  return Component<IRouterSettings<Routes>>(() => {

    const router = defineClientRouter({
      index ,
      routes ,
      mode ,
      errors ,
      signals ,
    });

    const state = takeState<IWidget<any , any> | undefined>(undefined);

    const canvas = Widget({
      nsa: {w: {views: 'exchanger'}} ,
      children: state.widget(() => {
        return state.value;
      }) ,
    });

    return canvas.manipulate(() =>
      router?.runtimes((route) => {
        if (route) {
          state.set(
            route.view.component(
              RouterRequest.merge(
                (route.parameters) ,
                (route.props) ,
              ) ,
            ).nsa({w: {view: ''}}) ,
          );
        } else if (errors && '404' in errors) {
          state.set(errors['404']({}));
        }
      }) ,
    );
  });
}