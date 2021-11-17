import { Button } from "@alicloudfe/components";

import { t_StateApp, useStateApp } from "l_state/app";
import { AppBus } from "l_common";
import { useEffect } from "react";

export default (props: { async: boolean }) => {
  const clickHandler = props.async
    ? useStateApp.mutations.addCount
    : useStateApp.actions.addCount;

  const StateApp = AppBus<t_StateApp>("StateApp");

  useEffect(() => {
    // 每次 render 完一定执行
    console.log("MyButton re-rendered", StateApp.count);
  }, [StateApp]);
  const text = props.async ? "async" : "sync";
  return (
    <Button type="primary" onClick={clickHandler}>
      {text} state count is: {StateApp.count}
    </Button>
  );
};
