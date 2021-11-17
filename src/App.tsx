import "./App.css";
import MyButton from "./MyButton";
import MyButton2 from "./MyButton2";
import { t_StateApp, useStateApp } from "l_state/app";
import { AppBus, reactive } from "l_common";
import { useEffect } from "react";

function App() {
  const StateApp = useStateApp();
  AppBus("StateApp", StateApp);


  const state = reactive({ count: 0 });

  const inputProperty = {
    value: StateApp.other,
    style: { color: "red", width: "100px" },
    onInput: (e: React.FormEvent<HTMLInputElement>) =>
      (StateApp.other = e.currentTarget.value),
  };
  


  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => state.count++}>{state.count}</button>
        <input {...inputProperty} />
        <MyButton async={false} />
        <MyButton async={true} />
        <h1 className="demo-title">
          {JSON.stringify(AppBus("StateApp"))}StateApp.count: {StateApp.count}
        </h1>
        <MyButton2 />
      </header>
    </div>
  );
}

export default App;
