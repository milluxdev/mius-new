<template>
  <div class="page">
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </div>
</template>
<script>
  export default {
    name: "Page",
    data() {
      return {};
    },
    methods: {}
  };
</script>
<style>
  .page {
    padding-top: 15px;
    padding-left: 200px;
    width: 100%;
  }
</style>