import "./App.css";
import MyButton from "./MyButton";
import MyButton2 from "./MyButton2";
import {t_StateApp, useStateApp} from "l_state/app";
import {AppBus, reactive} from "l_common";
import {CountLable} from "l_components/a01base/CountLabel";
import {UserList} from "l_components/a01base/UserList";
import {useEffect} from "react";
import {useWindowSize} from "../local_modules/common/hooks/useWindowSize";

function App() {
    const StateApp: t_StateApp = useStateApp();
    AppBus("StateApp", StateApp);

    const state = reactive({count: 0});

    const inputProperty = {
        value: StateApp.b1.b2.b3,
        style: {color: "green", width: "100px"},
        onInput: (e: React.FormEvent<HTMLInputElement>) =>
            (StateApp.b1.b2.b3 = e.currentTarget.value),
    };

    const size = useWindowSize()
    useEffect(() => {
        console.log(StateApp.b1.b2.b3);
    });

    return (
        <div className="App">
            <header className="App-header">
                <CountLable/>
                <UserList/>
                <div className="flex middle">
                    <button onClick={() => state.count++}>{state.count}</button>
                    <input {...inputProperty} />
                    <MyButton async={false}/>
                    <MyButton async={true}/>
                </div>
                <h3>StateApp.b1.b2.a3: {StateApp.b1.b2.a3}</h3>
                <h3>size: {JSON.stringify(size)}</h3>
                <pre className="demo-title">
          <code>{JSON.stringify(AppBus("StateApp"), null, 2)}</code>
        </pre>
                <MyButton2/>
            </header>
        </div>
    );
}

export default App;


