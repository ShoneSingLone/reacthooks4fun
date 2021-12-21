import { _sleep, reactive } from "l_common";
import _ from "lodash";

/* NOTICE:singleton !!!  */
/* NOTICE:singleton !!!  */
/* NOTICE:singleton !!!  */

let state_app = {
  user: "",
  device: "desktop",
  isLoading: false,
  append: { append: "" },
  a1: 0,
  b1: {
    a2: 0,
    b2: {
      a3: 0,
      b3: "",
    },
  },
};

export type t_StateApp = typeof state_app;

export function useStateApp() {
  /* 重新赋值是必要的 */
  state_app = reactive(state_app);
  return state_app;
}

useStateApp.mutations = {
  addCount() {
    state_app.b1.b2.a3++;
  },
};

useStateApp.actions = {
  async addCount() {
    state_app.isLoading = true;
    await _sleep(1000);
    state_app.b1.b2.a3++;
    state_app.isLoading = false;
  },
  async signin(username: string) {
    state_app.isLoading = true;
    await _sleep(1000);
    if (!username) throw new Error("signin failed");
    state_app.user = username;
    state_app.isLoading = false;
  },
  async signout() {
    state_app.isLoading = true;
    await _sleep(1000);
    state_app.user = "";
    state_app.isLoading = false;
  },
};
