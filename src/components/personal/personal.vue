<template>
<div>
  <div class="personalContainer">
    <!-- 头部的设置 -->
    <div class="personalHeader">
      <div class="back">
        <i class="iconfont icon-left"></i>
      </div>
      <div class="home">
         <i class="iconfont icon-icon_home"></i>
      </div>
      <!-- 登录与注册 -->
      <div class="loginor" @click="$router.push('/login')">
        <span>注&nbsp;册</span>
        <span class='border-l'>|</span>
        <span>登&nbsp;录</span>
      </div>

        <!-- 用户头像设置 -->
      <div class="userHeader" v-if="false">
        <div class="userImg">
          <img src="../../comment/images/use_name.jpg" alt="">
        </div>
        <div class="userVip">
          <img src="../../comment/images/arrow.png" alt="">
          <span>银卡会员</span>
        </div>
        <p>13394412016</p>
      </div>
    </div>
    
    <!-- 分类列表的设置 -->
    <div class="personalCate">
        <div class="personalCateItem">
          <div class="iconfontContainer">
           <i class="iconfont icon-iconjiesuan"></i>
          </div>
          <p>待付款</p>
        </div>
        <div class="personalCateItem">
          <div class="iconfontContainer">
            <i class="iconfont icon-icon-delivery"></i>
          </div>
          <p>待收货</p>
        </div>
        <div class="personalCateItem">
          <div class="iconfontContainer">
            <i class="iconfont icon-dingdan"></i>
          </div>
          <p>全部订单</p>
        </div>
      </div>
    </div>
    <!-- 内容区的设置 -->
    <div class='hr'></div>
    <div class="personalContent">
       <!-- 上方的内容 -->
      <div>
        <div class="contentItemTop" v-for="(item ,index) in contantTop" :key='index'>
          <span>{{item}}</span><span class="icon"><i class="iconfont icon-right"></i></span>
        </div>
      </div>
      <!-- 下方的内容 -->
      <div>
        <div class="contentItemBottom" v-for="(item,index) in contentBottom" :key='index'>
          <span>{{item}}</span><span class="icon"><i class="iconfont icon-right"></i></span>
        </div>
      </div>
    </div> 
    <div class='hr'></div>
    <div class="itemInner">
      <span>退出登录</span>
    </div>
    <!-- 底部的设置 -->
    <div class="personalBottom">
      <div class="bottomContentTop">
        <span class="shouye">唯品会首页</span>
        <span class='shouye'>关于我们</span>
        <div class="denglu">
          <span>登录</span>
          <span class="zhuce">注册</span>
        </div>
      </div>
      <div class="bottomContentMiddle">
        <p>Copyright © 2008-2017 m.vip.com, All Rights Reserved 粤ICP备08114786号</p>
      </div>
      <div class="bottomContentBottom">
        <img src="../../comment/images/police.png" alt="">
        <span>粤公网安备 44010302000068号</span>
      </div>
    </div>

  </div>  
</div>  
</template>

<script>
  export default {
    data() {
      return {
        contantTop:[
          '我的收藏',
          '购物车历史',
          '浏览历史',
          '申请退款',
          '零钱'
        ],
        contentBottom:[
          '优惠券',
          '我的唯品币',
          '收货地址',
          '修改登录密码',
          '管理支付密码',
          '绑定手机',
          '实名认证',
          '我的银行卡'
        ] 
      }
    },
}
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
body
  overflow scroll
  overflow-x hidden
  .personalContainer
     //头部的样式
    .personalHeader
      background-image url('../../comment/images/personal-bg.png')
      background-position 0 0 
      background-repeat no-repeat
      background-size cover
      width 100%
      height 205px
      position relative
      &.changebg
        background-image url('../../comment/images/user-login-bg.png')
      .iconfont
        font-size 24px
      .back
        position absolute
        top 5px
        left 15px
        height 44px
        width 44px
      .home
        position absolute
        top 5px
        right 15px
        height 44px
        width 44px
      .loginor
        position absolute
        top 50%
        right 50%
        transform translate(50%,50%)
        font-size 14px
        .border-l
          color #ddd
          margin-left 20px
          margin-right 20px
      //用户头像设置
      .userHeader
        position absolute
        top 50px
        left 50%
        transform translateX(-50%)
        //头像的图片
        .userImg
          background-image url(../../comment/images/gold.png)
          background-repeat no-repeat
          background-size 80px 80px
          width 80px
          height 80px
          img 
            width 70px
            height 70px
            border-radius 50%
            position absolute
            top 5px
            left 5px
        //会员的容器
        .userVip
          img
            width 24px
            height 24px
            vertical-align middle
            span 
              vertical-align middle
        p
          margin-top 10px
  //分类的样式
  .personalCate
    height 80px
    display flex
    border-bottom 1px #eee solid  
    .personalCateItem
      height 100%
      width 33%
      position relative
      .iconfont
        font-size 24px
      .iconfontContainer
        width 30px
        height 30px
        border-radius 50%
        background-color #fcf9f1
        position absolute
        top 0
        left 0
        bottom 0
        right 0
        margin auto 
      p
        position absolute
        bottom 10px
        left 50%
        transform translateX(-50%)
  .hr
    height 15px
    border-bottom 1px #ccc solid 
  //个人中心的内容 
  .personalContent
    margin-top 15px
    border-bottom 1px #eee solid 
    //内容的上半部分
    .contentItemTop
      height 50px
      font-size 16px
      margin-left 20px
      color #555
      position relative
      vertical-align middle
      .icon
        position absolute
        top 0
        right 20px  
        vertical-align middle
    //内容的下半部分
    .contentItemBottom
      height 50px
      font-size 16px
      margin-left 20px
      color #555
      position relative
      border-top 1px #ccc solid 
      vertical-align middle
      line-height 50px
      .icon
        position absolute
        top 50%
        transform translateY(-50%)
        right 20px 
        vertical-align middle
  //退出登录
  .itemInner
    height 53px
    line-height 53px
    text-align center
    font-size 16px
    color #555
    display none 
    &.itemInneron
      display block     
  //底部的设置
  .personalBottom
    height 145px
    width 100%
    background-color #f3f4f5
    .bottomContentTop
      height 30px
      padding 10px
      font-size 14px
      position relative
      color #555
      .shouye
        margin-left 10px
      .denglu
        position absolute
        top 10px
        right 10px
        .zhuce
          margin-left 10px
    .bottomContentMiddle
      height 20px
      margin 10px
      font-size 12px
      color #cccccc
      text-align center
    .bottomContentBottom
      height 20px
      margin 30px 0 0 0
      font-size 12px
      color #cccccc
      text-align center
      img
        width 20px
        height 20px
        vertical-align middle
      




        
        
        
          
               
</style>