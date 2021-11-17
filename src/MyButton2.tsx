import { Button } from "@alicloudfe/components";
import { AppBus } from "l_common";
import { useEffect } from 'react';
import { t_StateApp } from 'l_state/app';


export default () => {
  const StateApp = AppBus<t_StateApp>("StateApp")

  useEffect(() => {
    // 每次 render 完一定执行
    console.log('MyButton2 re-rendered');
  },[StateApp]);

  return (
    <Button>{StateApp.count}</Button>
  );
};
