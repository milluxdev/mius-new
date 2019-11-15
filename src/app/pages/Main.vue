<template>
  <q-layout view="hHh LpR lFf">
    <Side />
    <Page />
  </q-layout>
</template>

<script>
import Side from "./component/Side";
import Page from "./component/Page";
export default {
  data() {
    return {};
  },
  components: {
    Side,
    Page
  }
};
</script>