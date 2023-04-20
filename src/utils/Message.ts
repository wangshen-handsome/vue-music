import { ElMessage } from "element-plus";
import { Component, VNode } from "vue";

//调用Message函数传递的参数的类型
type D = {
  message: string;
  type?: "success" | "warning" | "info" | "error";
  icon?: string | Component;
};

//消息提示
export const Message = (data: D): void => {
  ElMessage(data);
};
