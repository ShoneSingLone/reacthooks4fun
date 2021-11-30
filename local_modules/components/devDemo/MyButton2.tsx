import { aBus } from "l_common";
import { useEffect } from 'react';
import { t_StateApp } from 'l_state/app';
import { Button } from "@alicloudfe/components";


export default () => {
  const StateApp = aBus<t_StateApp>("StateApp")

  useEffect(() => {
    // 每次 render 完一定执行
    console.log('MyButton2 re-rendered');
  },[StateApp]);

  return (
    <Button>{StateApp.b1.b2.a3}</Button>
  );
};
