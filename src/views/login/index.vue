<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="titile">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>
      <div class="from">
        <div class="form-item">
          <input
            v-model="mobile"
            class="inp"
            maxlength="11"
            placeholder="13811112222"
            type="text"
          />
        </div>
        <div class="form-item">
          <input
            v-model="picCode"
            class="inp"
            maxlength="5"
            placeholder="请输入图形验证码"
            type="text"
          />
          <!-- 这里是确认有图片再加载图片，不用报图片加载失败的logo -->
          <img v-if="picUrl" :src="picUrl" @click="getPicCode" alt="" />
        </div>
        <div class="form-item">
          <input
            v-model="msgCode"
            class="inp"
            placeholder="短信验证码246810"
            type="text"
          />
          <button @click="getCode">
            {{
              second === totalSecond
                ? "获取验证码"
                : second + "秒后重新发送验证码"
            }}
          </button>
        </div>
      </div>
      <div @click="login" class="login-btn">登录</div>
    </div>
  </div>
</template>

<script>
// 不需要了，import request from "@/utils/request.js";
// 按需导入-获取刷新图形验证码api图片-getPicCodeApi
// 按需导入-获取短信验证码验证码api图片-gerMsgCodeApi
// 按需导入-登录api-codeLogin
import {
  getPicCodeApi,
  gerMsgCodeApi,
  codeLogin,
  Denglu,
} from "@/api/login.js";

export default {
  name: "LoginIndex",

  data() {
    return {
      //创建接受手机号与输入验证码
      mobile: "", //手机号码
      picCode: "", //图片验证码数字
      // 创建验证码图片与key
      picKey: "", //图片唯一标识
      picUrl: "", //图片链接地址
      // 验证码倒计时刷新
      totalSecond: 60, //短信验证码倒计时总秒数
      second: 60, //短信验证码倒计时当前秒数
      timer: null, //定时器id
      //短信验证码
      msgCode: "",
    };
  },

  async created() {
    this.getPicCode();
  },

  methods: {
    // 获取图形验证码
    async getPicCode() {
      const res = await getPicCodeApi();
      this.picUrl = res.data.base64;
      this.picKey = res.data.key;
    },

    // 校验手机号与图形验证码正误
    validFn() {
      // 校验手机号
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast("请输入正确的手机号");
        return false;
      }
      // 图形验证码
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast("请输入正确的图形验证码");
        return false;
      }
      return true;
    },
    // 获取短信验证码
    async getCode() {
      // 获取短信验证码前，判断手机与图形验证码是否正确
      if (!this.validFn()) {
        return;
      }
      // 当前倒计时未开(没有timer) && totalSecond=second 就开始倒计时
      if (!this.timer && this.second === this.totalSecond) {
        // 获取短信验证码
        await gerMsgCodeApi({
          captchaCode: this.picCode,
          captchaKey: this.picKey,
          mobile: this.mobile,
        });
        this.$toast("短信验证码发送成功，请注意查收");

        // 开启倒计时
        this.timer = setInterval(() => {
          this.second--;
          // 秒数小于等于0，重开定时器,重获timer
          if (this.second <= 0) {
            clearImmediate(this.timer);
            this.timer = null;
            this.second = this.totalSecond;
          }
        }, 1000);
      }
    },
    // 登录
    async login() {
      // 先验证有无用户不填写手机号，图形验证码，直接点击登录
      if (!this.validFn) {
        return;
      }
      // 验证手机短信是否符合6位规范
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast("请输入正确的短信验证码");
        return;
      }
      // ✅老师的对了，我是哪里写错了吧
      const res = await codeLogin(this.mobile, this.msgCode);
      // this.$router.push("/");
      // console.log(res);
      this.$store.commit("user/setUserInfo", res.data);
      this.$toast("登录成功");

      // ✅自己写的
      // 发起登录请求（自己json-server写的登录请求）,
      // 登陆成功后会返回唯一的token值和id，用于登录后的一些操作
      // 将token和id值存入vuex用于随时调用
      // const res = await Denglu();
      // this.$store.commit("user/setUserInfo", res[0]);
      // console.log(res);
      // this.$toast("登录成功");

      // 判断地址栏有无回跳地址backUrl参数
      // 如果有，说明是其他页面拦截登录跳转回来的；登录后在跳去回跳地址
      // 如果没有，正常去首页即可
      const url = this.$route.query.backUrl || "/"; //获取导航栏参数,没有就用/跳转去首页
      // this.$router.push(url); //用push回保留原来的登录页，点击返回会回到登录页；
      this.$router.replace(url); //用replace直接替换网页，不会有历史记录，push会有历史记录
    },
  },

  // 离开页面清除定时器
  destoryed() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="less" scoped>
.container {
  // border: solid 1px black;
  padding: 49px 29px;
  margin-top: 60px;

  .titile {
    margin-bottom: 20px;
    // border: solid 1px black;

    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }
  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;

    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
      // border: solid 1px black;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }
  .login-btn {
    width: 100%;
    height: 42px;
    // border: solid 1px black;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>