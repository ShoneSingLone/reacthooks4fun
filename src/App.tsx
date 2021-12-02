import { useCallback } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import { LayoutLeftContent } from "l_components/layout/LeftContent/LayoutLeftContent";
import { t_StateApp, useStateApp } from "l_state/app";
import { useEffect } from "react";
import { aBus, reactive } from "l_common";
import { Button } from "@alicloudfe/components";
import { ConsoleNav } from "l_modules/console/ConsoleNav";
import { ConsoleMain } from "l_modules/console/ConsoleMain";
import "./App.less";

const routes = [];

export function App() {
  /* App级别的数据 redux一些列状态管理器*/
  /* 多次调用只会影响最后一次调用的节点渲染的内容，不会触发其他的组件，所以只能放在root组件的Hooks中调用，即 app module page component 不同级别的共享，useStateApp()这种调用应该只出现在父级，父级应该是唯一的 */
  const StateApp = useStateApp();
  /* 上车 */
  aBus("StateApp", StateApp);
  /* App 销毁时 下车 */
  useEffect(() => () => aBus.remove("StateApp"), []);

  return <LayoutLeftContent nav={<ConsoleNav />} main={<ConsoleMain />} />;
}
