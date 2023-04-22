<template>
  <div class="shade">
    <el-form :model="userInfo" ref="formEl" :rules="rules">
      <div class="login">
        <div class="logo">MUSIC</div>
        <el-form-item class="form-item" prop="phone">
          <el-input
            class="ipt"
            type="text"
            clearable
            v-model="userInfo.phone"
            placeholder="请输入网易云账号"
          ></el-input>
        </el-form-item>
        <el-form-item class="form-item" prop="password">
          <el-input
            class="ipt"
            type="password"
            clearable
            show-password
            v-model="userInfo.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-button class="form-item" type="primary" @click="submit">登录</el-button>
      </div>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";

import { useRouter } from "vue-router";

import type { FormInstance, FormRules } from "element-plus";

import { Message } from "@/utils/Message.ts";

//路由
const router = useRouter();

//用户数据类型
type U = {
  phone: string;
  password: string;
};

//用户数据
const userInfo = reactive<U>({
  phone: "",
  password: "",
});

//from表单refs
const formEl = ref<FormInstance>();

//手机号校验
const validatorPhone = (rule: any, value: any, callback: any) => {
  let re = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/;

  if (!userInfo.phone) {
    callback(new Error("请输入手机号"));
  } else if (!re.test(userInfo.phone)) {
    callback(new Error("手机号格式不正确"));
  } else {
    callback();
  }
};

//表单校验规则
const rules = reactive<FormRules>({
  phone: [{ validator: validatorPhone, trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

//登录
const submit = () => {
  if (!formEl.value) return;
  formEl.value.validate((valid) => {
    if (valid) {
      //调接口，进行登录
      Message({ message: "登录成功", type: "success" });
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }
  });
};
</script>
<style scoped lang="scss">
.shade {
  width: 100%;
  height: 100vh;
  background: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F4b190939-06e4-4900-a83b-891e4e4593cb%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1684475160&t=6fb2cdbf44447b05ea6b1c353ee0b3f4");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  .login {
    width: 30vw;
    height: 40vh;
    background-color: #fff;
    margin: auto;
    transform: translateY(50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    .logo {
      text-align: center;
      font-weight: 600;
      font-family: Tahoma;
      font-size: 24px;
      color: #409eff;
      padding: 30px 0;
    }
    .form-item {
      width: 90%;
      margin-bottom: 30px;
    }
  }
}
</style>
