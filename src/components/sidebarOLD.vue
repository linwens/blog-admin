<template>
    <div id="sidebar" class="clearfix">
        <el-menu mode="vertical" theme="dark" :default-active="$route.meta.isAction ? $route.meta.isAction : $route.path" unique-opened>
            <template v-for="item in promissRouter" v-if="!item.hidden">
                <el-submenu :index="item.name" v-if="!item.noDropdown">
                    <template slot="title">
                        <i v-if='item.icon' :class="item.icon"></i>
                        {{item.name}}
                    </template>
                    <router-link v-for="child in item.children" :key="child.path" v-if="!child.hidden"
                             class="title-link" :to="item.path+'/'+child.path">
                        <el-menu-item :index="item.path+'/'+child.path">
                            {{child.name}}
                        </el-menu-item>
                    </router-link>
                </el-submenu>
                <router-link v-if="item.noDropdown" class="title-link" :to="item.path">
                    <el-menu-item :index="item.path">
                        <i v-if='item.icon' :class="item.icon"></i>
                        {{item.name}}
                    </el-menu-item>
                </router-link>
            </template>
        </el-menu>
  </div>
</template>

<script>
export default {
    name: 'sidebar',
    data: function(){
        return{
            promissRouter: [],
        }
    },
    created() {
        const router = this.$router.options.routes;
        this.promissRouter = router.filter(v => {
            return true
        });
    },
    mounted() {}
}
</script>

<style lang="less">
    #sidebar{
        background-color: #1f2d3d;
        .iconfont{
            margin-right: 5px;
        }
        .el-menu{
            background-color: inherit;
            .el-menu-item, .el-submenu__title {
                color: #fff;
            }
            .el-submenu{
                .el-menu-item {
                    text-align: center;
                }
            }
            .is-active {
                background-color: #314255;
                .el-menu-item {
                    background-color: #0f1923;
                }
                .el-submenu__title {
                    color: #fff;
                    background-color: #46596f;
                }
                .is-active {
                    background-color: #314255;
                    position: relative;
                    text-align: center;
                    &:before {
                        content: '●';
                        position: absolute;
                        margin-left: -15px;
                    }
                    &:after{
                        content: '';
                        position: absolute;
                        width: 5px;
                        height: 100%;
                        right: 0;
                        top: 0;
                        background-color: #039BE5;
                    }
                }
            }
            .el-submenu__title{
                &:hover{
                    background-color: #46596f;
                }
            }
            .el-submenu>.el-submenu__title .el-submenu__icon-arrow{
                transform: rotateZ(270deg);
            }
            .el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow{
                transform: rotateZ(360deg);
            }
        }
    }
</style>