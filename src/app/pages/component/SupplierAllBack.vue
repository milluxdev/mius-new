<template>
  <div></div>
</template>
<script>
export default {
  data() {
    this.$router.replace({
      name: this.$route.params.name
    });
    return {};
  }
};
</script>
