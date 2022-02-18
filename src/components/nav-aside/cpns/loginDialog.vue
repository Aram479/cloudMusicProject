<template>
  <div id="loginDialog">
    <!-- 登录对话框 -->
    <el-dialog
      custom-class="dialog"
      v-model="isDialog"
      @closed="handleDialogClosed"
      :modal="false"
    >
      <!-- 图片 -->
      <el-image
        src="https://music-player.immortalboy.cn/assets/login-bg.08c70680.png"
      ></el-image>
      <!-- 错误提示 -->
      <el-alert
        :closable="false"
        :title="errMsg || loginResErr"
        type="error"
        v-if="errMsg || loginResErr"
      />
      <el-form ref="formRef" :model="ruleForm" :rules="rules">
        <!-- 手机号 -->
        <el-form-item prop="phone">
          <el-input
            v-model="ruleForm.phone"
            placeholder="手机号"
            :prefix-icon="Iphone"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            placeholder="密码"
            :prefix-icon="Lock"
          ></el-input>
        </el-form-item>
        <!-- 提交 -->
        <el-form-item>
          <el-button @click="loginClick">登录</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useState } from "@/hooks/mapGet/index.js";
import { Iphone, Lock, Unlock } from "@element-plus/icons-vue";
import { ElForm } from "element-plus";
export default defineComponent({
  name: "loginDialog",
  setup() {
    let isDialog = ref(false); //是否显示对话框
    let errMsg = ref(""); //存储登录错误信息
    const store = useStore();
    const state: any = useState("Login", ["loginResErr"]);
    const formRef = ref<InstanceType<typeof ElForm>>();
    /* 验证手机号规则 */
    const checkPhone = (rule: any, value: string, callback: any) => {
      //验证手机号的正则表达式
      const regPhone =
        /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regPhone.test(value)) {
        //合法手机号
        return callback();
      }
      callback(new Error("请输入合法手机号"));
    };
    /* 输入框绑定值 */
    const ruleForm = reactive({
      phone: "",
      password: "",
    });
    /* 校验规则 */
    const rules = reactive({
      //手机号
      phone: [
        {
          required: true,
          message: "请输入手机号",
          trigger: "blur",
        },
        { validator: checkPhone, trigger: "blur" },
      ],
      // 密码
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    });
    /* 点击登录，校验 */
    const loginClick = () => {
      formRef.value?.validate((isLogin) => {
        //校验成功,获取登录接口
        if (isLogin) {
          store.dispatch("Login/getPhone", ruleForm).then((res) => {
            //登录成功
            if (res.code == 200) {
              isDialog.value = false; //关闭对话框
            } else {
              errMsg.value = "手机号或密码错误"; //错误提示信息
            }
          });
        }
      });
    };
    /* 对话框关闭事件,清空表单验证 */
    const handleDialogClosed = () => {
      if (isDialog.value) {
        formRef.value?.clearValidate(); //清除表单验证
        formRef.value?.resetFields(); //清空表单数据
        errMsg.value = ""; //清空登录错误提示
      }
    };

    return {
      isDialog,
      ...state,
      formRef,
      rules,
      ruleForm,
      errMsg,
      loginClick,
      handleDialogClosed,
      Iphone,
      Lock,
      Unlock,
    };
  },
  components: {},
});
</script>

<style scoped>
.el-form {
  margin: 20px 0px;
}

.el-button {
  width: 100%;
  height: 40px;
  background-color: #cd0101;
  color: white;
  border-radius: 5px;
  margin-top: 20px;
}
</style>
<style>
/* .el-input__inner:focus {
  border-color: #cd0101;
}
.el-input__prefix-inner,.el-input__suffix-inner {
  pointer-events: all;
  display: inline-flex;
  align-items: center;
} */

</style>
