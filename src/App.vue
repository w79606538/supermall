<template>
  <div id="app">
    <router-view></router-view>
    <main-tarbar></main-tarbar>
  </div>
</template>

<script>
import MainTarbar from "@com/context/MainTarbar";

export default {
  name: 'App',
  components: {
    MainTarbar
  }
}
</script>

<style>
@import "./assets/css/base.css";
</style>
