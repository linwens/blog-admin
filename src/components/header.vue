<template>
  <div id="v-header" :style="{backgroundColor:$store.state.theme.themeColor}">
      <el-col :span="24">
          <el-col :span="16">
              <h2>博客后台系统</h2>
          </el-col>
          <el-col :span="8" class="u-userInfo">
                <el-dropdown class="u-userName" trigger="click" placement="bottom">
                    <span class="el-dropdown-link">
                        {{nickName}}<i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>关于作者</el-dropdown-item>
                        <el-dropdown-item>项目地址</el-dropdown-item>
                        <el-dropdown-item divided><p @click="logout">退出登录</p></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div class="u-userAvator">
                    <img :src="avatorPic" alt="用户头像">
                </div>
          </el-col>
      </el-col>
  </div>
</template>

<script>
export default {
  name: 'v-header',
  data: function(){
    return{
        avatorImg:'',
        userType:this.$store.state.user.type
    }
  },
  computed:{
      nickName(){
        let nn = '';
        if(this.userType==='guests'){
          nn = 'admin';
        }else{
          nn = '努力的小林';
        }
        return nn;
      },
      avatorPic(){
        let ap = '';
        if(this.userType==='guests'){
          ap = 'http://otvt0q8hg.bkt.clouddn.com/luffy.jpg';
        }else{
          ap = 'http://osurqoqxj.bkt.clouddn.com/IMG_4106.jpg';
        }
        return ap;
      }
  },
  components:{},
  methods:{
    logout (){
      this.$store.dispatch('USER_LOGOUT')
      //退出跳转到登录页
      window.location.reload();
      //this.$router.replace({ path: '/login' })
    },
  },
  mounted () {}

}
</script>

<style lang="less">
#v-header{
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 70px;
    line-height: 70px;
    color: #ccc;
    /*background: #03A9F4;*/
    z-index: 9;
    .u-logo{
      height: 70px;
      line-height: 70px;
      text-align: center;
      overflow: hidden;
    }
    h2{
      display: inline-block;
      height: 70px;
      line-height: 70px;
      padding-left: 10px;
      font-size: 26px;
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
        font-size: 22px;
        color: #fff;
      }
    }
    .u-userAvator{
      float: right;
      position: relative;
      width: 40px;
      height: 40px;
      vertical-align: middle;
      border-radius: 30px;
      margin: 15px 10px 0 0;
      overflow: hidden;
      img{
        position: absolute;
        top: 50%;
        left: 50%;
        transform:translate(-50%,-50%);
        width: auto;  
        height: auto;  
        max-width: 100%;
      }
    }
    .u-userName{
        float: right;
        margin-right: 20px;
        color: #fff;
        .el-icon-caret-bottom{
            margin-left: 5px;
            font-size: 12px;
        }
        .el-popper[x-placement^=bottom]{
            margin-top: -14px;
        }
    }
    button{
      margin:0 32px 0 28px;
      padding:0 0 0 30px;
      border-left: 1px solid #fff;
      border-radius: 0;
    }
  }

</style>