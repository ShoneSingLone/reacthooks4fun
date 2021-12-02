import { useState } from "react";
import { isInput } from "./validate";
import _ from "lodash";

/* TODO: 目前watch一次，后面的会替换前面的；有需要再改成可多次watch */
/*改成对象，并返回prop值，作为unwatch的索引 */
/* function watch(prop: string, callback: Function) {
  (this as any).$deep[prop] = callback;
} */

/* 不接受原始类型的参数 */
export function reactive(state: any) {
  const [reactState, setReactState] = useState(state);
  /* unwatch */

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
      /*  if (obj.$deep && _.isFunction(obj.$deep[prop])) {
        obj.$deep[prop](value);
      } */
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
  const target = AppBusCollection[key];
  if (!isInput(target)) {
    alert("useState的调用节点有误！");
  }
  return target;
}

aBus.remove = (key: string) => {
  delete AppBusCollection[key];
};

genId.idCount = 1;
genId.ID_COUNT_MAX = 40000;
genId.DATE_NOW = Date.now();

export function genId(category: string): string {
  if (genId.idCount > genId.ID_COUNT_MAX) {
    genId.idCount = 1;
    genId.DATE_NOW = Date.now();
  }
  return `${category}_${genId.DATE_NOW}_${genId.idCount++}`;
}

export const _sleep = (timeout: number) =>
  new Promise((r) => setTimeout(r, timeout));
