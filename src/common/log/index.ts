import { Message } from "@alicloudfe/components";

export function logError(msg: string) {
  Message.error(msg);
  /* 有其他操作 */
  console.error(msg);
}
