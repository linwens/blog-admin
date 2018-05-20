<template>
  <div id="header">
      <el-col :span="4" class="u-logo">
      </el-col>
      <el-col :span="20">
          <el-col :span="16">
              <h2>linwens的后台系统</h2>
          </el-col>
          <el-col :span="8" class="u-userInfo">
              <i class="iconfont icon-dingbulan-wo"></i>
              <span>linwens</span>
              <el-button type="text" @click="logout"><i class="iconfont icon-dingbulan-zhuxiao"></i></el-button>
          </el-col>
      </el-col>
  </div>
</template>

<script>
export default {
  name: 'header',
  data: function(){
    return{

    }
  },
  components:{},
  methods:{
    logout (){
      this.$store.dispatch('USER_LOGOUT')
      //退出跳转到登录页
      window.location.reload();
      this.$router.replace({ path: '/login' })
    },
  },
  mounted () {}

}
</script>

<style lang="less">
#header{
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    color: #ccc;
    background: #03A9F4;
    z-index: 9;
    .u-logo{
      height: 60px;
      line-height: 60px;
      text-align: center;
      overflow: hidden;
    }
    h2{
      display: inline-block;
      line-height: 30px;
      padding-left: 10px;
      border-left: 2px solid #fff;
      font-size: 20px;
      font-weight: normal;
      color: #fff;
    }
    .u-userInfo{
      text-align: right;
      color: #fff;
      span{
          font-size: 20px;
      }
      .icon-dingbulan-wo{
        margin-right: 5px;
      }
      .icon-dingbulan-wo, .icon-dingbulan-zhuxiao{
        font-size: 22px;
        color: #fff;
      }
    }
    .u-userAvator{
      width: 30px;
      height: 30px;
      vertical-align: middle;
      border-radius: 150px;
      margin-right: 10px;
    }
    button{
      margin:0 32px 0 28px;
      padding:0 0 0 30px;
      border-left: 1px solid #fff;
      border-radius: 0;
    }
  }

</style>