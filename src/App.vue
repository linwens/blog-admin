<template>
  	<div id="app">
    	<router-view></router-view>
  	</div>
</template>

<script>
export default {
  	name: 'app',
  	data(){
  		return{
  			themeColor:'#409EFF'
  		}
  	},
  	created(){

  	},
  	methods:{
  		genColor(){
  			const colorMap={
  				'#409EFF':'primary',//默认主题蓝色
  				'#66b1ff':'btnPrimaryHover',//按钮hover
  				'#3a8ee6':'btnPrimaryActive',//按钮active
  				'#f56c6c':'badgeBg',//标记背景色
  				'#c6e2ff':'btnFcHvBd',//el-button:focus,.el-button:hover border-color
  				'#ecf5ff':'btnFcHvBg',//el-button:focus,.el-button:hover background-color
  				'#ecf5ff':'btnPrimaryPlainBg',//
  				'#b3d8ff':'btnPrimaryPlainBd',//
  				'#ecf5ff':'menuItemFcHv',//菜单栏条目被选中
  				'':'',//
  				'':'',//
  				'':'',//
  				'':'',//
  				'':'',//
  				'':'',//
  			}
  		}
  	}
}
</script>

<style>
#app {
  height: 100%;
}
</style>
