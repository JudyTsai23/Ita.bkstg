<template>
  <CFooter :fixed="true">
    <div class="d-flex flex-column text-left">
      <div>
        <span>Ms.Ita © 2022</span>
        ( <a target="_blank" :href="website">前台餐廳網站 <CIcon name="cil-external-link" size="sm" class="align-baseline" /></a> )
        <small class="ml-1">{{ version }}</small>
      </div>
      <small>Design by Joyu & Judy ( saiyuki0804@gmail.com )</small>
    </div>
    <div class="d-flex flex-column mfs-auto small text-right">
      <div>
        Icons & Logo by
        <a href="https://www.flaticon.com/" title="Flaticon">Flaticon.com</a>
        and
        <a target="_blank" href="https://icons8.com">Icons8</a>
      </div>
      <span>練習用網站，不為商業所用，如有侵權敬請告知</span>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: "TheFooter",
  computed: {
    website() {
      return process.env.VUE_APP_WEBSITE;
    },
    version() {
      return process.env.VUE_APP_VERSION;
    },
  },
};
</script>
