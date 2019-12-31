<template>
  <div class="loginContainer">
    <!-- 登录页面的头部 -->
    <div class="loginHeader">
      <div class="iconerr">
        <i class="iconfont icon-searchclose" @click="$router.replace('/personal')"></i>
      </div>
      <img src="../../comment/images/mg-logo.png" alt="">
    </div>
    <!-- 手机号登录显示 -->
    <div class="showPhone" :class="{on:!isShowPwd}">
      <!-- 手机号码格式错误 -->
      <div class="verifyPhone" :class="{verifyPhoneon:isverifyPhoneon}">
        <span><i class='iconfont icon-Iconinfoicon-'></i> 手机号码格式错误</span>
      </div>
      <!-- 验证码格式错误 -->
      <div class="verifyWord" :class="{verifyWordon:isverifyWordon}">
        <span><i class='iconfont icon-Iconinfoicon-'></i> 验证码格式错误</span>
      </div>

        <!-- 手机号的输入框 -->
      <div class="mobileContainer">
        <label for="mobileText">手机号</label>
        <input type="tel" class='mobileText' placeholder="请输入手机号" v-model="phone" maxlength="11" @input="verifyB">
        <div class="icon-Iconinfoicon-ContainerA"  v-show="isShowPhone" @click="phone = ''">
          <i class='iconfont icon-Iconinfoicon-'></i>
        </div>
      </div>
       <!-- 验证码的输入框 -->
      <div class="yanzhengContainer">
        <label for="yanzhengText">验证码</label>
        <input class='yanzhengText' placeholder="请输入验证码" v-model="yanzhengma" maxlength="6" @input="verifyC">
        <div class="icon-Iconinfoicon-ContainerB"  v-show="isShowYanzheng" @click="yanzhengma = ''">
          <i class='iconfont icon-Iconinfoicon-'></i>
        </div>
        <button :class="{showYanzhengma:this.phone.length>0,offYanzhengma:computeTime>0}" :disabled="isRightPhone && computeTime>0" @click.prevent="sendCode">
           {{computeTime>0 ? `${computeTime}秒后重新获取` : '发送验证码'}}</button>
      </div>
      <!-- 手机号登陆注册 -->
      <div class="phoneZhuce" @click="verifyA">
        <button :class="{showphoneZhuce:this.yanzhengma.length>0 && this.phone.length>0}">手机号注册登录</button>
      </div>
      <!-- 同意条件 -->
      <div class="agree">
        <div class="agreeBtn">
          <input type="checkbox" name="" checked="checked">
          <span>同意 《唯品会服务条款》、《隐私条款》、《唯品支付用户服务协议》</span>
        </div>
      </div>
       <!-- 密码登录 -->
      <div class="btnContainer" @click="isShowPwd=true">
        <button>密码登录</button>
      </div>
    </div>
    <!-- 密码登录显示 -->
    <div class="showPwd" :class="{on:isShowPwd}">
      <!-- 登录名 -->
      <div class="userContainer">
        <label for="userText">登录名</label>
        <input type="text" class='userText' placeholder="请输入手机号或邮箱" v-model="userWord">
        <div class="icon-Iconinfoicon-ContainerC" @click="userWord = ''" v-show="isShowUser">
          <i class='iconfont icon-Iconinfoicon-'></i>
        </div>
      </div>
      <!-- 密码登录 -->
      <div class="pwdContainer">
        <label for="pwdText">密码</label>
        <input :type="isShowWord ? 'text' : 'password'" class='pwdText'
         v-model="pwd"
         placeholder="请输入密码">
        <div class="icon-Iconinfoicon-Container" @click="pwd = ''" v-show="isShowDelete">
          <i class='iconfont icon-Iconinfoicon-'></i>
        </div>
        <div class="icon-eyes-copy-copyContainer" @click="isShowWord = !isShowWord" 
        :class="{eyes:!isShowWord}">
          <i class='iconfont icon-eyes-copy-copy'></i> 
        </div>
      </div>
      <!-- 忘记密码 -->
      <div class="forget">
        <span>忘记密码</span>
      </div>
      <!-- 手机号登陆注册 -->
      <div class="pwdDenglu">
        <button :class="{showpwdDenglu:this.userWord.length>0 && this.pwd.length>0}">登录</button>
      </div>
        <!-- 手机号注册登录 -->
      <div class="btnContainerB" @click="isShowPwd=false">
        <button>手机号注册登录</button>
      </div>
    
    </div>
  </div>  
</template>

<script>
  import { Toast, MessageBox } from 'mint-ui'
  
  export default {
    name:'Login',
    data() {
      return {
       isShowPwd:false,//显示手机登录为true ,显示密码登录为false
       isShowWord:false, //是否显示密码
       pwd: '', // 密码
       phone:'',//电话号
       yanzhengma:'',//验证码
       userWord:'',//用户名
       isShowDelete:false,
       isShowPhone:false,
       isShowYanzheng:false,
       isShowUser:false,
       computeTime: 0, // 计时剩余时间
       isverifyPhoneon:false, //手机号的验证格式
       isverifyWordon:false //验证码的验证格式
      }
    },
    methods: {
      async sendCode () {
        // 进行倒计时效果显示
        this.computeTime = 4
        const intervalId = setInterval(() => {
          this.computeTime--
          if (this.computeTime<=0) {
            this.computeTime = 0
            clearInterval(intervalId)
          }
        }, 1000);
        //发请求
        const result = await this.$API.reqSendCode(this.phone)
        if (result.code===0) {
          Toast('验证码短信已发送');
          console.log("验证码短信已发送")
        } else {
          // 停止倒计时
          this.computeTime = 0
          MessageBox('提示', result.msg || '发送失败');
          console.log("发送失败")
        }
      },

      verifyA(){ 
        if(!(/^1[3456789]\d{9}$/.test(this.phone))){ 
          this.isverifyPhoneon = true
        }
        if(!(/^[0-9]*$/.test(this.yanzhengma))&&(/^1[3456789]\d{9}$/.test(this.phone))){
          this.isverifyWordon = true
        }
      },
      verifyB(){
        this.isverifyPhoneon = false
      },
      verifyC(){
        this.isverifyWordon = false
      },

       
    },
    computed: {
      // 是否是一个正确的手机号
      isRightPhone () {
        return /^1[3456789]\d{9}$/.test(this.phone)
        console.log('isRightPhone')
      }
    },
    
    watch: {
      pwd(){
        this.isShowDelete = this.pwd.length?true : false
      },
      phone(){
        this.isShowPhone = this.phone.length?true : false
      },
      yanzhengma(){
        this.isShowYanzheng = this.yanzhengma.length?true : false
      },
      userWord(){
        this.isShowUser = this.userWord.length?true : false
      }

    },
}
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
  // 登陆的头部
  .loginHeader
    width 100%
    height 170px
    background-image url('../../comment/images/login-bg.png')
    position relative
    .iconerr
      position absolute
      top 10px
      right 10px
    img
      width 125px
      height 50px
      position absolute
      top 0 
      bottom 0 
      left 0 
      right 0 
      margin auto 
  //手机号登录显示
  .showPhone
    display none
    &.on
      display block
    //手机号码格式错误
    .verifyPhone
      margin-left 20px
      color #c93c29
      display none
      &.verifyPhoneon
        display block
    //验证码格式错误
    .verifyWord
      margin-left 20px
      color #c93c29
      display none
      &.verifyWordon
        display block
    // 手机号输入框
    .mobileContainer
      height 52px
      font-size 16px
      padding 0 0 0 15px
      line-height 52px 
      border-bottom 1px solid #e7e7e7
      position relative
      label
        margin 0 15px 0 0 
      input 
        height 20px 
        border none 
        padding 16px 0 15px
        outline none
      input::-webkit-input-placeholder
        color #CCCCCC
      .icon-Iconinfoicon-ContainerA
        color #eee
        margin-left 10px
        position absolute
        right 20px
        top 0
        .icon-Iconinfoicon-
          font-size 20px
    // 验证码
    .yanzhengContainer
      height 52px
      font-size 16px
      padding 0 0 0 15px
      line-height 52px 
      border-bottom 1px solid #e7e7e7
      position relative
      label
        margin 0 15px 0 0 
      input 
        height 20px 
        width 130px
        border none 
        padding 16px 0 15px
        outline none
      input::-webkit-input-placeholder
        color #CCCCCC
      .icon-Iconinfoicon-ContainerB
        color #eee
        margin-left 10px
        position absolute
        right 140px
        top 0
        .icon-Iconinfoicon-
          font-size 20px
      button 
        width 160px
        height 52px
        line-height 52px
        font-size 16px
        background-color transparent
        outline 0 none 
        border-left 1px solid #e7e7e7
        border none 
        color #98989f
        &.showYanzhengma
          color #4a90e2
        &.offYanzhengma
          color #98989f
    //手机号登录的按钮
    .phoneZhuce
      position relative
      button
        height 44px
        width 345px
        border none 
        background-color #caccd2
        border-radius 22px
        line-height 44px
        color #ffffff
        font-size 16px
        position absolute
        left 50%
        top 30px
        transform translateX(-50%)
        outline none
        &.showphoneZhuce
          background-color #de3d96
    // 同意条件
    .agree
      height 52px
      width 345px
      position absolute
      left 50%
      transform translateX(-50%)
      font-size 12px
      color #157efa
      margin-top 100px
      .agreeBtn
        width 345px
        height 52px
        input
          width 20px
          height 20px
          color #E5A9CA
          border none 
          background-color transparent
          vertical-align middle
          margin-right 5px
        span
          vertical-align middle
          pading 12px 0 0 24px
    //下方的按钮
    .btnContainer
      height 36px
      line-height 36px
      width 86px
      margin auto 
      margin-top 220px
      text-align center
      border-radius 22px
      border 1px solid #e4007f
      button 
        font-size 14px
        margin 0 auto 
        color #e4007f
        outline none 
        border none 
        background-color #fff
  //密码登录显示
  .showPwd
    display none
    &.on
      display block
     // 登录名
    .userContainer
      height 52px
      font-size 16px
      padding 0 0 0 15px
      line-height 52px 
      border-bottom 1px solid #e7e7e7
      position relative
      label
        margin 0 15px 0 0 
      input 
        height 20px 
        border none 
        padding 16px 0 15px
        outline none
      input::-webkit-input-placeholder
        color #CCCCCC
      .icon-Iconinfoicon-ContainerC
        color #eee
        margin-left 10px
        position absolute
        right 20px
        top 0
        .icon-Iconinfoicon-
          font-size 20px
    //密码登录
    .pwdContainer
      height 52px
      font-size 16px
      padding 0 0 0 15px
      line-height 52px 
      border-bottom 1px solid #e7e7e7
      position relative
      label
        margin 0 15px 0 0 
      input 
        height 20px 
        border none 
        padding 16px 0 15px
        outline none
        margin-left 17px
      input::-webkit-input-placeholder
        color #CCCCCC
      .icon-Iconinfoicon-Container
        color #eee
        margin-left 10px
        position absolute
        right 55px
        top 0
        .icon-Iconinfoicon-
          font-size 20px
      .icon-eyes-copy-copyContainer
        font-size 16px
        color #555
        position absolute
        right 8px
        bottom -2px
        &.eyes
          color #cccccc
        .icon-eyes-copy-copy
          font-size 30px
    
    // 忘记密码
    .forget
      font-size 14px
      color #0079ff
      position absolute
      right 10px
      top 370px
    //手机号登录的按钮
    .pwdDenglu
      position relative
      button
        height 44px
        width 345px
        border none 
        background-color #caccd2
        border-radius 22px
        line-height 44px
        color #ffffff
        font-size 16px
        position absolute
        left 50%
        top 30px
        transform translateX(-50%)
        outline none
        &.showpwdDenglu
          background-color #de3d96
    //手机登录注册的按钮
    .btnContainerB
      height 36px
      line-height 36px
      width 128px
      margin auto 
      margin-top 150px
      text-align center
      border-radius 22px
      border 1px solid #e4007f
      button 
        font-size 14px
        margin 0 auto 
        color #e4007f
        outline none 
        border none 
        background-color #fff

  
  
  
  
  
  
     




    

</style>