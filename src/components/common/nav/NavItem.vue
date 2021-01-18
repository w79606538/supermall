<template>
  <div class="navItem">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavItem"
}
</script>

<style scoped>
.left,.right{
  width: 60px;
}

.center{
  /*flxe=1独占left和right剩余的部分*/
  flex: 1;
}
.navItem {
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
}

</style>
