# [reacthooks4fun](https://shonesinglone.github.io/reacthooks4fun/)

## [Fake Data API](https://reqres.in/)

## NOTE

![hooks学习只是图谱](./public/a.png)

Hooks 带来的最大好处：逻辑复用

## 内置useState、useEffect、useCallback、useMemo、useRef、useContext

## useEffect

- 每次 render 后执行：不提供第二个依赖项参数。比如
`useEffect(() => {})`
- 仅第一次 render 后执行：提供一个空数组作为依赖项。比如
`useEffect(() => {}, [])。//onece`
- 第一次以及依赖项发生变化后执行：提供依赖项数组。比如
`useEffect(() => {}, [deps])。//watch`
- 组件 unmount 后执行：返回一个回调函数。比如
`useEffect() => { return () => {} }, [])`

依赖项中定义的变量一定是会在回调函数中用到的，否则声明依赖项其实是没有意义的。
依赖项一般是一个常量数组，而不是一个变量。因为一般在创建 callback 的时候，你其实非常清楚其中要用到哪些依赖项了。
React 会使用浅比较来对比依赖项是否发生了变化，所以要特别注意数组或者对象类型。如果你是每次创建一个新对象，即使和之前的值是等价的，也会被认为是依赖项发生了变化。这是一个刚开始使用 Hooks 时很容易导致 Bug 的地方。例如下面的代码：

## Hooks使用原则

- Hooks 要在顶层作用域中使用
- Hooks一定要被执行到
- Hooks一定是按顺序执行

## useCallback 缓存回调函数

`useCallback(fn, deps)`

## useMemo 缓存计算结果（computed）

`useMemo(fn, deps)`
可以用useMemo 实现 useCallback
useMemo return fn

## useRef 单独保存数据的引用（DOM）

```jsx
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // current 属性指向了真实的 input 这个 DOM 节点，从而可以调用 focus 方法
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

## 设计原则

状态改变导致UI变化，更加纯粹

### 状态最小化原则

即Vue的计算属性用useMemo自己实现

### 避免中间状态，确保唯一数据源

比如，参数都是根据URL上的来，不管多少次，结果都应该是一致的。单向数据流 url变化=>watch=>setState=>UI change=>event=>url=>...

## API Client

- 拦截
  - 一些通用的 Header。比如 Authorization Token。
  - 请求未认证的处理。比如如果 Token 过期了，需要有一个统一的地方进行处理，这时就会弹出对话框提示用户重新登录。
- 服务器地址的配置。前端在开发和运行时可能会连接不同的服务器，比如本地服务器或者测试服务器，此时这个 API Client 内部可以根据当前环境判断该连接哪个 URL。
- 方法
- 参数

```js
import axios from "axios";
// 定义相关的 endpoint
const endPoints = {
  test: "https://60b2643d62ab150017ae21de.mockapi.io/",
  prod: "https://prod.myapi.io/",
  staging: "https://staging.myapi.io/"
};
// 创建 axios 的实例
const instance = axios.create({
  // 实际项目中根据当前环境设置 baseURL
  baseURL: endPoints.test,
  timeout: 30000,
  // 为所有请求设置通用的 header
  headers: { Authorization: "Bear mytoken" }
});

// 定义拦截器预处理所有请求
instance.interceptors.response.use(
  (res) => {
    // 可以假如请求成功的逻辑，比如 log
    return res;
  },
  (err) => {
    if (err.response.status === 403) {
      // 统一处理未授权请求，跳转到登录界面
      document.location = '/login';
    }
    return Promise.reject(err);
  }
);
export default instance;
```

### Hooks的应用思路

hooks提供状态，逻辑处理都封装在内部

hooks组件中只根据数据状态来做视图的展示


## xItem

## datagrid
