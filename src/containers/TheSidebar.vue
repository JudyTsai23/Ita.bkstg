<template>
  <CSidebar fixed :minimize="minimize" :show="show" @update:show="(value) => $store.commit('set', ['sidebarShow', value])">
    <CSidebarBrand class="d-md-down-none logo d-flex flex-column text-decoration-none py-3" to="/">
      <!-- <CIcon 
        class="c-sidebar-brand-full" 
        name="logo" 
        size="custom-size" 
        :height="35" 
        viewBox="0 0 556 134"
      />
      <CIcon 
        class="c-sidebar-brand-minimized" 
        name="logo" 
        size="custom-size" 
        :height="35" 
        viewBox="0 0 110 134"
      /> -->
      <img src="@/assets/img/logo/logo-rmbg.png" />
      <div class="d-inline-flex align-items-center">
        <h4 class="mb-1">C</h4>
        <span class="mr-1">ontent</span>
        <h4 class="mb-1">M</h4>
        <span class="mr-1">anagement</span>
        <h4 class="mb-1">S</h4>
        <span>ystem</span>
      </div>
    </CSidebarBrand>

    <CRenderFunction flat :content-to-render="$options.nav" />
    <CSidebarMinimizer class="d-md-down-none" @click.native="$store.commit('set', ['sidebarMinimize', !minimize])" />
  </CSidebar>
</template>

<script>
import nav from "./_nav";

export default {
  name: "TheSidebar",
  nav,
  computed: {
    show() {
      return this.$store.state.sidebarShow;
    },
    minimize() {
      return this.$store.state.sidebarMinimize;
    },
  },
};
</script>
<style lang="scss" scoped>
.logo {
  img {
    width: 40%;
  }
}
</style>
