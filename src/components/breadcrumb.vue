<template>
	<el-col :span="24" class="m-breadcrumb">
		<el-breadcrumb separator="|">
			<el-breadcrumb-item  v-for="(item, index) in breadcrumb" :key="index">
				<router-link :to="item.path">{{item.name}}</router-link>
			</el-breadcrumb-item>
		</el-breadcrumb>
	</el-col>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {
				breadcrumb: []
			}
		},
		methods: {
			getBreadcrumb() {
				let names = this.$route.matched.filter(value => value.name);
				if(names[0] && names[0].name != '首页') {
					names = [{name: '首页', path: '/'}].concat(names);
				}
				return names
			}
		},
		mounted() {
			this.breadcrumb = this.breadcrumb.length > 0 ? this.breadcrumb : this.getBreadcrumb(); 
		},
		watch:{
			$route() {
				this.breadcrumb = this.getBreadcrumb();
			}
		}
	}
</script>
<style lang="less">
	.m-breadcrumb{
		.el-breadcrumb{
			height: 30px;
			line-height: 30px;
			font-size: 13px;
			padding: 10px 0 0 10px;
		}
		.el-breadcrumb__item__inner{
			
		}
	}
</style>