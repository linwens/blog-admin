<template>
	<div id="home">
		<el-row style="height:60px;">
			<v-header></v-header>
		</el-row>
		<el-row>
			<el-col :span="4" style="position: fixed;top:60px;left:0;height: 100%;" :style="{backgroundColor:'#1e90ff'}">
				<v-sidebar></v-sidebar>
			</el-col>
			<el-col :span="20" style="margin-left:16.66667%;">
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

</style>