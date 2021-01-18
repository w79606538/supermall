<template>
  <div class="context">
    <slot>
    </slot>
  </div>
</template>

<script>
export default {
  name: "RecommendCom"
}
</script>

<style scoped>
.context{
  flex: 1;
  text-align: center;
  padding: 20px 0 20px 0;
}
.context img{
  width: 80px;
  height:80px;
  margin-bottom: 10px;
}
.context div{
  font-size: 14px;

}
</style>
