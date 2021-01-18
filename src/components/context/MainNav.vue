<template>
  <div class="home">
    <!-- 导航栏-->
    <Nav>
      <nav-item>
       <div slot="center">购物街</div>
      </nav-item>
    </Nav>
  </div>

</template>

<script>
import Nav from "@/components/common/nav/Nav";
import NavItem from "@/components/common/nav/NavItem";

export default {
  name: "MainNav",
  components: {
    Nav,
    NavItem,
  },
}
</script>

<style scoped>
.home {
  /*设置背景颜色*/
  background-color: var(--color-tint);
  color: #f2f2f2;
}

</style>
