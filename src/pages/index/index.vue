<template>
  <div>
    <div class="customService">
      <div class="indexImg"><!-- <img src="./index.png"> --></div>
    </div>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        
      }
    },
    components:{}
  }
</script>

<style lang="less">
.customService{
    display: flex;
    align-items: center;
    justify-content: center;
  .indexImg{
    width: 437px;
    height: 401px;
    margin: 120px auto 0 auto;
    display: block;
    img{
      width: 100%;
    }
  }
}
</style>