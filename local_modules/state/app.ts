import { reactive } from "l_common";
import _ from "lodash";

/* NOTICE:singleton !!!  */
/* NOTICE:singleton !!!  */
/* NOTICE:singleton !!!  */

let state_app = {
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

useStateApp.actions = {
  addCount() {
    state_app.b1.b2.a3++;
  },
};

const addCount = _.debounce(() => {
  state_app.b1.b2.a3++;
  state_app.isLoading = false;
}, 1000);

useStateApp.mutations = {
  addCount() {
    state_app.isLoading = true;
    addCount();
  },
};
