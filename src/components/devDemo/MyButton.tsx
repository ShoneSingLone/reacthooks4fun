import { t_StateApp, useStateApp } from "l_state/app";
import { aBus } from "l_common";
import { useEffect } from "react";
import { Button } from "@alicloudfe/components";

export default (props: { async: boolean }) => {
  const clickHandler = props.async
    ? useStateApp.actions.addCount
    : useStateApp.mutations.addCount;

  /* 观光 */
  const StateApp = aBus<t_StateApp>("StateApp");

  useEffect(() => {
    // 每次 render 完一定执行
    console.log("MyButton re-rendered", StateApp.b1.b2.a3);
  }, [StateApp]);
  const text = props.async ? "async" : "sync";
  return (
    <Button type="primary" onClick={clickHandler}>
      {text} state count is: {StateApp.b1.b2.a3}
    </Button>
  );
};
