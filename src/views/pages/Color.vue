<template>
  <CCard bodyWrapper>
    <h3>.bg-*</h3>
    <div v-for="color in colors" :key="color" class="d-inline-block mr-3">
      <div :class="`bg-${color}`" class="square"></div>
      <div>{{ color }}</div>
    </div>
    <h5 class="mt-2">-light</h5>
    <div v-for="color in colors_light" :key="color" class="d-inline-block mr-3">
      <div :class="`bg-${color}`" class="square"></div>
      <div>{{ color }}</div>
    </div>

    <hr />

    <h3>.text-*</h3>
    <div v-for="color in colors" :key="color" :class="`text-${color}`">培訓來說簡體和他，是他之後毫不有了證券窗口外面出席，圖像化，取得事務心理打了發言留言有什麼一個警。</div>
    <h5 class="mt-2">-light</h5>
    <div v-for="color in colors_light" :key="color" :class="`text-${color}`">培訓來說簡體和他，是他之後毫不有了證券窗口外面出席，圖像化，取得事務心理打了發言留言有什麼一個警。</div>

    <hr />

    <h3>Alert</h3>
    <CAlert v-for="color in colors" :key="color" :color="color" closeButton>{{ color }}</CAlert>
    <h5 class="mt-2">-light</h5>
    <CAlert v-for="color in colors_light" :key="color" :color="color" closeButton>{{ color }}</CAlert>

    <hr />

    <h3>Button</h3>
    <p>
      <CButton v-for="color in colors" :key="color" :color="color" class="mr-3 mb-3">{{ color }}</CButton>
    </p>
    <p>
      <CButton v-for="color in colors" :key="color" :color="color" variant="outline" class="mr-3 mb-3">{{ color }}</CButton>
    </p>
    <h5 class="mt-2">-light</h5>
    <p>
      <CButton v-for="color in colors_light" :key="color" :color="color" class="mr-3 mb-3">{{ color }}</CButton>
    </p>
    <p>
      <CButton v-for="color in colors_light" :key="color" :color="color" variant="outline" class="mr-3 mb-3">{{ color }}</CButton>
    </p>

    <hr />

    <h3>Badge</h3>
    <CBadge v-for="color in colors" :key="color" :color="color" class="mr-3 mb-3">{{ color }}</CBadge>
    <h5 class="mt-2">-light</h5>
    <CBadge v-for="color in colors_light" :key="color" :color="color" class="mr-3 mb-3">{{ color }}</CBadge>
  </CCard>
</template>
<script>
export default {
  name: "Color",
  data() {
    return {
      colors: ["primary", "secondary", "success", "info", "warning", "danger", "light", "dark"],
      colors_light: ["primary-light", "secondary-light", "success-light", "info-light", "warning-light", "danger-light"],
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.square {
  width: 80px;
  height: 80px;
}
</style>
