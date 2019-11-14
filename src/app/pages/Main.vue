<template>
  <q-layout view="hHh LpR lFf">
    <Title />
    <Side />
    <Page />
  </q-layout>
</template>

<script>
import Title from "./component/Title";
import Side from "./component/Side";
import Page from "./component/Page";
export default {
  data() {
    return {};
  },
  components: {
    Title,
    Side,
    Page
  }
};
</script>