<template>
  <CFooter :fixed="true">
    <div>
      <span>Ms.Ita © 2022</span>
      ( <a target="_blank" :href="website">前台餐廳網站 <CIcon name="cil-external-link" size="sm" class="align-baseline" /></a> )
    </div>
    <div class="d-flex flex-column mfs-auto small text-right">
      <span>練習用網站，不為商業所用，如有侵權敬請告知</span>
      <div>Icons by <a target="_blank" href="https://icons8.com">Icons8</a></div>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: "TheFooter",
  computed:{
    website(){
      return process.env.VUE_APP_WEBSITE;
    },
  },
};
</script>
