import "./App.css";
import MyButton from "./MyButton";
import MyButton2 from "./MyButton2";
import { t_StateApp, useStateApp } from "l_state/app";
import { AppBus, reactive } from "l_common";
import { useEffect } from "react";

function App() {
  const StateApp:t_StateApp = useStateApp();
  AppBus("StateApp", StateApp);

  
  const state = reactive({ count: 0 });

  const inputProperty = {
    value: StateApp.b1.b2.b3,
    style: { color: "red", width: "100px" },
    onInput: (e: React.FormEvent<HTMLInputElement>) => StateApp.b1.b2.b3 = e.currentTarget.value,
  };

  useEffect(() => {
    console.log(StateApp.b1.b2.b3);
  })


  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => state.count++}>{state.count}</button>
        <input {...inputProperty} />
        <MyButton async={false} />
        <MyButton async={true} />
        <h1 className="demo-title">
          {JSON.stringify(AppBus("StateApp"))}StateApp.b1.b2.a3: {StateApp.b1.b2.a3}
        </h1>
        <MyButton2 />
      </header>
    </div>
  );
}

export default App;
