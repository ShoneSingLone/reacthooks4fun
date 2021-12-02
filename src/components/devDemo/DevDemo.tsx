import MyButton from "./MyButton";
import MyButton2 from "./MyButton2";
import { t_StateApp, useStateApp } from "l_state/app";
import { aBus, reactive } from "l_common";
import { CountLable } from "l_components/a01base/CountLabel";
import { UserList } from "l_components/a01base/UserList";
import { useEffect, useMemo } from "react";
import { useWindowSize } from "l_common/hooks/useWindowSize";
import { Dialog, t_dialogDefaultState } from "l_common/dialog";
import { Button } from "@alicloudfe/components";

type t_state = {
  count: number;
};

function addCount(state: t_state) {
  state.count++;
}

function body({ Wrapper, props }: any) {
  const StateApp: t_StateApp = useStateApp();

  return (
    <Button
      onClick={() => {
        useStateApp.actions.addCount();
      }}
    >
      {StateApp.a1}
      {StateApp.b1.b2.a3}
    </Button>
  );
}

export function DevDemo() {
  /* App级别的数据 redux一些列状态管理器*/
  const StateApp = useStateApp();
  debugger;
  console.log("🚀 ~ file: App.tsx ~ line 14 ~ App ~ StateApp", StateApp);
  /* 多次调用只会影响最后一次调用的Hooks渲染的内容，不会触发其他的组件，所以只能放在root组件的Hooks中调用 */
  /* 上车 */
  useEffect(() => {
    aBus("StateApp", StateApp);
    return () => {
      debugger;
      aBus.remove("StateApp");
    };
  }, []);

  useEffect(() => {
    setInterval(() => StateApp.a1++, 1000);
  }, []);

  const state = reactive({ count: 0 });
  const size = useWindowSize();

  const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    StateApp.b1.b2.b3 = e.currentTarget.value;
    /* 可以动态追加(不提前在StateApp中声明)，但是不推荐 */
    StateApp.append = { append: e.currentTarget.value };
  };

  const inputProperty = {
    value: StateApp.b1.b2.b3,
    style: { color: "green", width: "100px" },
    onChange: onInputChange,
    // onInput: onInputChange,
  };

  useEffect(() => {
    console.log(StateApp.b1.b2.b3);
  });

  const divStyle = {
    style: {
      border: "1px solid black",
      margin: "16px",
      padding: "16px",
    },
  };

  return (
    <div className="App">
      <div className="App-header">
        <div {...divStyle}>
          <Button
            onClick={() => {
              const wrapper = Dialog.open({
                props: { StateApp },
                title: "Demo",
                body,
                onOk() {
                  console.log(wrapper.subState.a1);
                },
              });
            }}
          >
            open dialog
          </Button>
        </div>

        <div {...divStyle}>
          StateApp.append:
          <input {...inputProperty} />
          {StateApp.append && StateApp.append.append}
        </div>

        <div {...divStyle} className="flex">
          <pre className="demo-title">
            <code>{JSON.stringify(aBus("StateApp"), null, 2)}</code>
          </pre>
          <CountLable {...divStyle} />
          <UserList {...divStyle} />
        </div>
        <div {...divStyle}>
          <button onClick={() => addCount(state)}>
            {state.count} addCount
          </button>
        </div>
        <div {...divStyle}>
          <div>StateApp.isLoading: {StateApp.isLoading ? "..." : "done"}</div>
          <div>
            <div>
              StateApp.b1.b2.a3: <span>{StateApp.b1.b2.a3}</span>
            </div>
            <button onClick={() => useStateApp.actions.addCount()}>
              {"useStateApp.actions.addCount"}
            </button>
          </div>
          <button
            onClick={() => useStateApp.mutations.addCount()}
            disabled={StateApp.isLoading}
          >
            {"useStateApp.mutations.addCount"}
          </button>
        </div>
        <div {...divStyle}>
          <MyButton async={false} />
          <MyButton async={true} />
          <MyButton2 />
        </div>
        <h3>size: {JSON.stringify(size)}</h3>
      </div>
    </div>
  );
}
