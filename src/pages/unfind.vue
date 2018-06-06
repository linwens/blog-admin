<!-- 该项目每个vue文件的代码模板 -->
<template>
  <div id="unfind">
      <!-- http://wow.techbrood.com/fiddle/16556 3D太阳系 -->
      <div class="m-main">
        <div class="m-pic">404</div>
        <div class="m-tip">您访问的页面，或许正在开发中...</div>
        <el-row class="m-btns">
            <el-button plain @click="goPage('back')">返回上一页</el-button>
            <el-button type="primary" plain  @click="goPage('home')">返回首页</el-button>
        </el-row>
      </div>
  </div>
</template>

<script>
//import '@/assets/........' //引入less
//import { swiper, swiperSlide } from 'vue-awesome-swiper'  //引入vue插件,或其他组件
export default {
  name: 'unfind',
  data: function(){
    return{

    }
  },
  components:{},
  methods:{
    goPage(type){
      if(type==='back'){
        this.$router.back();
      }else if(type==='home'){
        this.$router.push('guests/index');
      }
    }
  },
  mounted () {
    console.log(this.$router);
  }

}
</script>

<style lang="less">
  #unfind{
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #F9FAFC;
    .m-main{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      text-align: center;
    }
    .m-pic{
      font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
      font-size: 200px;
      font-weight: bold;
      color: #597193;
    }
    .m-tip{
      font-size: 30px;
      margin: 0 auto 20px;
    }
  }
</style>