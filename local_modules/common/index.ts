import { useState } from "react";
import { isInput } from "./validate";

export function reactive(state: any):typeof state {
  const [reactState, setReactState] = useState(state);
  const handler = {
    get: (obj: any, prop: string) => {
      return reactState[prop];
    },
    set: function (obj: any, prop: string, value: any) {
      obj[prop] = value;
      setReactState(Object.assign({}, obj));
      return true;
    },
  };
  /* reactiveState */
  const _state: typeof state = new Proxy(reactState, handler);
  return _state;
}

const AppBusCollection: { [prop: string]: any } = {};

/* TODO:必须填入泛型 */
export function AppBus<T>(key: string, value?: any): T {
  /* set */
  if (key && isInput(value)) {
    AppBusCollection[key] = value;
  }
  /* get */
  return AppBusCollection[key];
}
