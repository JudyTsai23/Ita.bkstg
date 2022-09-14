<template>
  <CButton :color="color" :size="size" :shape="shape" :variant="variant" @click="clickFn()" class="d-flex align-items-center" :class="customClass">
    <CIcon :name="icon" class="my-0 mr-1" />
    <slot name="default"></slot>
  </CButton>
</template>

<script>
export default {
  name: "IconButton",
  props: [
    // CButton的color
    "color",
    // CButton的size
    "size",
    // CButton的shape
    "shape",
    // CButton的variant
    "variant",
    // icon
    "icon",
    // 自訂class
    "customClass",
  ],
  data() {
    return {};
  },
  methods: {
    clickFn() {
      this.$emit("clickFn");
    },
  },
};
</script>

<style lang="scss" scoped></style>
