<template>
  <div class="nav-bar">
    <!-- 定义插槽-->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Nav",
  components:{
  }
}
</script>

<style>

.nav-bar{
  box-shadow:0 5px 10px -5px #888888;;
}

</style>
