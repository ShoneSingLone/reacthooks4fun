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
import { MenuLeft } from "l_modules/console/MenuLeft";
import "./App.css";

const routes = [];

export function App() {
  /* App级别的数据 redux一些列状态管理器*/
  /* 多次调用只会影响最后一次调用的节点渲染的内容，不会触发其他的组件，所以只能放在root组件的Hooks中调用，即 app module page component 不同级别的共享，useStateApp()这种调用应该只出现在父级，父级应该是唯一的 */
  const StateApp = useStateApp();
  /* 上车 */
  aBus("StateApp", StateApp);
  /* 下车 */
  useEffect(() => () => aBus.remove("StateApp"), []);

  return (
    <LayoutLeftContent
      left={<MenuLeft />}
      content={
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<PublicPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/protected"
              element={
                <RequireAuth>
                  <ProtectedPage />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      }
    />
  );
}

function Layout() {
  const StateApp = aBus<t_StateApp>("StateApp");
  return (
    <div>
      StateApp{StateApp?.device}
      <AuthStatus />
      <Outlet />
      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>
    </div>
  );
}

function AuthStatus() {
  const StateApp = aBus<t_StateApp>("StateApp");
  const navigate = useNavigate();
  const signout = useCallback(() => {
    useStateApp.mutations.signout().then(() => {
      navigate("/");
    });
  }, []);

  if (!StateApp.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {StateApp.user}!
      <Button onClick={signout}>
        Sign out {StateApp.isLoading ? "..." : ""}
      </Button>
    </p>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const StateApp = aBus<t_StateApp>("StateApp");
  let location = useLocation();

  if (!StateApp.user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

function LoginPage() {
  let navigate = useNavigate();
  const StateApp = aBus<t_StateApp>("StateApp");
  let location = useLocation();
  const state = reactive({ tips: "" });

  let from = location.state?.from?.pathname || "/";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let username = formData.get("username") as string;
    try {
      await useStateApp.mutations.signin(username);
      navigate(from, { replace: true });
    } catch (error) {
      state.tips = error.message;
    }
  }

  return (
    <div>
      <p>You must log in to view the page at {from}</p>
      <p>{state.tips}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}
