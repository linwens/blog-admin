<template>
	<div id="home">
		<el-row style="height:60px;">
			<v-header></v-header>
		</el-row>
		<el-row style="background-color:#eee;"><!-- 这里可以设置整个背景色 -->
			<el-col :span="toggleBar?1:4" :style="{backgroundColor:$store.state.theme.themeColor}" class="sidebar-container" :class="{toggleBar:toggleBar}">
				<v-sidebar></v-sidebar><!-- Jcolor：#1e90ff -->
			</el-col>
			<el-col :span="toggleBar?23:20" :class="[sMainBox, toggleBar?sBig:'']">
				<v-breadcrumb></v-breadcrumb>
				<el-col :span="24">
					<transition>
						<div class="contentStyle">
							<router-view name="page"></router-view>						
						</div>
					</transition>					
				</el-col>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	import sidebar from '@/components/sidebar';
	import header from '@/components/header';
	import breadcrumb from '@/components/breadcrumb';
	export default {
		name:'home',
		data:function(){
			return{
				// toggleBar:this.$store.state.theme.sideBarCol
				sMainBox:'s-mainBox',
				sBig:'s-big'
			}
		},
		computed:{
			toggleBar(){
				return this.$store.state.theme.sideBarCol
			},
			dynamicColor(){
				return this.colorFn.spin(this.$store.state.theme.themeColor,0.3,0.3);
			}
		},
		components:{
			'v-sidebar': sidebar,
			'v-header': header,
			'v-breadcrumb': breadcrumb
		},
		methods:{
			goPage (val) {//后期封装在vuex里做一个公共的方法
				this.$router.push({path:val})
			}
		}
	}
</script>
<style lang="less">
	#home{
		.sidebar-container{
			position: fixed;
			top:70px;
			left:0;
			height: 100%;
			transition: all 0.3s linear;
			&.toggleBar{
				width: 64px;
			}
		}
		.s-mainBox{
			margin-left: 16.66667%;
			transition: all 0.3s linear;
			&.s-big{
				margin-left: 64px;
			}
		}
	}
</style>