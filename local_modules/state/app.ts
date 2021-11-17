import { reactive } from "l_common";

let state_app = { count: 0, other: "" };

export type t_StateApp = typeof state_app;
export function useStateApp() {
  state_app = reactive(state_app);
  return state_app;
}

useStateApp.actions = {
  addCount() {
    state_app.count++;
  },
};

useStateApp.mutations = {
  addCount() {
    setTimeout(() => {
      state_app.count++;
    }, 1000 * 2);
  },
};
