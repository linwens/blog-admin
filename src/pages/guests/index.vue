<template>
    <div id="Guest_index">
        这里是游客首页,我希望放的东西有：
        <p>1、用户基本信息(头像，昵称，登录时间，登录ip)</p>
        <p>2、数据汇总展示(已发文章数量，待发文章数量，用户访问量,详情按钮跳到vChart)</p>
        <p>3、网站样式切换开关</p>
        <p>4、事件备忘录(三列展示：灵光一现~pre、就是干~doing、你好棒棒~done，拖入拖出实现增删)Vue.Draggable</p>
        <p>5、项目计划表+项目进度条(点击进度条展示相应计划表)</p>
        
    </div>
</template>
<script>
    //import '@/assets/........' //引入less
    //import { markdownEditor } from 'vue-simplemde';
    export default{
        name:'Guest_index',
        data: function(){
            return {
                basedata:0,
            }
        }
    }
</script>
<style lang="less">
    #Guest_index{

    }
</style>