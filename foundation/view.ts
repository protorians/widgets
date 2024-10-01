import {
  IAttributes ,
  IComponentConstruct ,
  IParameters ,
  IRouterSettings ,
  IRoutesScheme ,
  IView ,
  IViewOptions ,
  IViews ,
  IWidget ,
  IWidgetElements ,
} from '../types';
import {State , Widget} from '../facades';
import {RouterRequest} from './router-request';
import {defineClientRouter} from './router-client';
import {Component} from './component';


export function View<Props extends IParameters> (
  component : IComponentConstruct<Props> ,
  options ? : IViewOptions<Props> ,
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
  return Component<IRouterSettings<Routes>>('RouterViews' , () => {

    const router = defineClientRouter({
      index ,
      routes ,
      mode ,
      errors ,
      signals ,
    });
    const state = State<IWidget<IAttributes , IWidgetElements> | undefined>(undefined);
    const canvas = Widget({
      nsa: {w: {views: ''}} ,
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