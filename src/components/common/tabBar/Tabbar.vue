<template>
  <div>
    <div id="tarBar">
      <!-- 定义插槽-->
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabbar"
}
</script>

<style>

#tarBar {
  /*使用flex布局*/
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f2f2f2;
  box-shadow:0 10px 10px 5px #888888;;
}

</style>
