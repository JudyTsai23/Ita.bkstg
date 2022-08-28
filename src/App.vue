<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("queryMenuCategory");
  },
};
</script>

<style lang="scss">
// Import Main styles for this application
@import "assets/scss/style";
</style>
