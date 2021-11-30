import "./App.css";
import MyButton from "./MyButton";
import MyButton2 from "./MyButton2";
import { t_StateApp, useStateApp } from "l_state/app";
import { AppBus, reactive } from "l_common";
import { CountLable } from "l_components/a01base/CountLabel";
import { UserList } from "l_components/a01base/UserList";
import { useEffect } from "react";
import { useWindowSize } from "../local_modules/common/hooks/useWindowSize";

function App() {
  /* App级别的数据 */
  const StateApp: t_StateApp = useStateApp();
  console.log("🚀 ~ file: App.tsx ~ line 14 ~ App ~ StateApp", StateApp);
  /* 多次调用只会影响最后一次调用的Hooks渲染的内容，不会触发其他的组件，所以只能放在root组件的Hooks中调用 */
  /* 上车 */
  AppBus("StateApp", StateApp);

  const state = reactive({ count: 0 });

  const inputProperty = {
    value: `${StateApp.b1.b2.b3}`,
    style: { color: "green", width: "100px" },
    onInput: (e: React.FormEvent<HTMLInputElement>) => {
      StateApp.b1.b2.b3 = e.currentTarget.value;
      /* 可以动态追加(不提前在StateApp中声明)，但是不推荐 */
      StateApp.append = { append: e.currentTarget.value };
    },
  };

  const size = useWindowSize();
  useEffect(() => {
    console.log(StateApp.b1.b2.b3);
  });

  return (
    <div className="App">
      <div className="App-header">
        <h2>
          StateApp.append:
          <input {...inputProperty} />
          {StateApp.append && StateApp.append.append}
        </h2>

        <CountLable />
        <UserList />
        <div className="flex middle">
          <button onClick={() => state.count++}>{state.count}</button>
          <div>
            StateApp.isLoading{StateApp.isLoading ? "..." : "done"}
            <button onClick={() => useStateApp.actions.addCount()}>
              {" "}
              {StateApp.b1.b2.a3}{" "}
            </button>
            <button onClick={() => useStateApp.mutations.addCount()}>
              {" "}
              {state.count}{" "}
            </button>
          </div>
          <MyButton async={false} />
          <MyButton async={true} />
        </div>
        <h3>StateApp.b1.b2.a3: {StateApp.b1.b2.a3}</h3>
        <h3>size: {JSON.stringify(size)}</h3>
        <pre className="demo-title">
          <code>{JSON.stringify(AppBus("StateApp"), null, 2)}</code>
        </pre>
        <MyButton2 />
      </div>
    </div>
  );
}

export default App;
