<template>
    <div id="addTags">
        <div class="tagBox">
            <span v-for="(item, index) in tags" key='index' @click="remove(index)">{{item}}</span>
        </div>
        <el-form ref="form" label-width="180px">
            <el-form-item label="请输入标签(按空格键确定)">
                <el-input v-model="tag" @keyup.enter="add"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'addTags',
    data: function(){
        return{
            tags:[],
            tag:''
        }
    },
    components:{},
    methods:{
        add(){
            console.log('按了回车');
            this.tags.push(this.tag);
            this.tag='';
            this.$emit('getTags',this.tags)
        },
        remove(index){
            this.tags.splice(index,1);
            this.$emit('getTags',this.tags)
        }
    },
    mounted () {}

}
</script>
    
<style>
    
</style>