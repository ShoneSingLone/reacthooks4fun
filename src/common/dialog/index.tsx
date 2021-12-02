import { Dialog as AliDialog } from "@alicloudfe/components";
import { genId, reactive } from "l_common";
import { useEffect, useState } from "react";
import { render } from "react-dom";
import $ from "jquery";
import _ from "lodash";

export type t_dialogDefaultState = {
  visible: boolean;
  currentDialogId: string;
};

let count = 1;
const dialogIdQueue: any[] = [];
export const Dialog = {
  open(options: {
    title: string;
    body: Function;
    onOk: Function;
    props?: object;
    onClose?: Function;
  }) {
    const currentDialogId = genId("dialog");
    let $target = $("<div/>", { id: currentDialogId }).appendTo($("#root"));
    let Wrapper: any = function () {
      const wrapperState = reactive({ visible: true });
      Wrapper.state = wrapperState;

      Wrapper.onOk = async () => {
        try {
          await options.onOk();
          wrapperState.visible = false;
        } catch (error) {}
      };
      Wrapper.onClose = async () => {
        if (_.isFunction(options.onClose)) {
          await options.onClose();
        }
        wrapperState.visible = false;
      };
      /* destory */
      useEffect(() => {
        if (wrapperState.visible) {
          return;
        }
        $target.remove();
        $target = null;
        Wrapper = null;
      }, [wrapperState.visible]);

      useEffect(() => {
        console.log("dialog render", count++, currentDialogId);
      });

      return (
        <AliDialog
          title={options.title}
          visible={wrapperState.visible}
          onOk={Wrapper.onOk}
          onCancel={Wrapper.onClose}
          onClose={Wrapper.onClose}
          size="small"
        >
          <options.body {...{ Wrapper, ...options }} />
        </AliDialog>
      );
    };
    Wrapper.$target = $target;
    Wrapper.id = currentDialogId;

    dialogIdQueue.push(Wrapper);
    render(<Wrapper />, $target[0]);
    return Wrapper;
  },
  hide(Wrapper: any) {
    if (dialogIdQueue.length <= 0) return;
    let index = dialogIdQueue.length - 1;
    if (Wrapper) {
      const index = _.findIndex(dialogIdQueue, (i) => i === Wrapper);
    }
    Wrapper = dialogIdQueue.splice(index, 1);
    Wrapper.onClose();
  },
};
