import { useState } from "react";
import { isInput } from "./validate";
import _ from "lodash";

/* 不接受原始类型的参数 */
export function reactive(state: object) {
  const [reactState, setReactState] = useState(state);
  const handler = {
    get: (obj: any, prop: string): any => {
      const target = obj[prop];
      if (_.isPlainObject(target)) {
        /* 代理嵌套子对象 */
        return new Proxy(target, handler);
      }
      return target;
    },
    set: function (obj: any, prop: string, value: any, receiver: any) {
      obj[prop] = value;
      setReactState(Object.assign({}, reactState));
      return true;
    },
  };
  /* reactiveState */
  return new Proxy(reactState, handler);
}

const AppBusCollection: { [prop: string]: any } = {};

/* TODO:必须填入泛型 */
/* 全局总线,理解为bus也可以;四处运东西,想去哪去哪 */
export function aBus<T>(key: string, value?: any): T {
  /* set */
  if (key && isInput(value)) {
    AppBusCollection[key] = value;
  }
  /* get */
  return AppBusCollection[key];
}
