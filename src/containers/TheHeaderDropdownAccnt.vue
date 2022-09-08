<template>
  <CDropdown inNav class="c-header-nav-items" placement="bottom-end" add-menu-classes="pt-0">
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar my-1">
          <img src="@/assets/img/user.png" class="c-avatar-img user" />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="primary-light">
      <strong>Account</strong>
    </CDropdownHeader>
    <CDropdownItem class="d-flex align-items-center" @click="logout()"> <CIcon class="mr-3" name="cil-https" /> Logout </CDropdownItem>
  </CDropdown>
</template>

<script>
export default {
  name: "TheHeaderDropdownAccnt",
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.commit("set", ["globalLoading", true]);
      sessionStorage.removeItem("il");
      this.$router.push({ name: "登入" });
      this.$store.commit("set", ["globalLoading", false]);
    },
  },
};
</script>

<style scoped>
.c-icon {
  margin-right: 0.3rem;
}
.user:hover {
  opacity: 0.7;
}
</style>
