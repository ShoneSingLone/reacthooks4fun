import { reactive } from "l_common";

let state_app = {
  a1: 0,
  b1: {
    a2: 0,
    b2: {
      a3: 0,
      b3: ""
    }
  }
};

export type t_StateApp = typeof state_app;
export function useStateApp() {
  state_app = reactive(state_app);
  return state_app;
}

useStateApp.actions = {
  addCount() {
    state_app.b1.b2.a3++;
  },
};

useStateApp.mutations = {
  addCount() {
    setTimeout(() => {
      state_app.b1.b2.a3++;
    }, 1000 * 2);
  },
};
