<template>
  <CCard>
    <CCardHeader class="d-flex align-items-center h5 font-weight-bold">
      <CIcon name="cil-restaurant" class="mt-0 mr-2" />
      餐點管理
      <CButton size="sm" color="primary-light" variant="ghost" :href="website" target="_blank" class="ml-auto">
        查看前台頁面
        <CIcon name="cil-external-link" size="sm" />
      </CButton>
    </CCardHeader>

    <CCardBody>
      <!-- 餐點類別標籤 -->
      <ul class="nav nav-tabs mb-3">
        <li class="nav-item" v-for="cate in mealCateList" :key="cate.id" :active="currCateId == cate.id">
          <a href="#" class="nav-link" :class="{ active: currCateId == cate.id }" @click.prevent="currCateChanged(cate.id)">{{ cate.name_zh }}</a>
        </li>
        <IconButton color="dark" variant="outline" size="sm" icon="cil-pencil" @clickFn="editCate()" class="align-self-center ml-3 py-0">修改類別</IconButton>
      </ul>
      <!-- 提醒訊息 -->
      <CAlert color="info" closeButton>
        <p>
          拖曳前方的
          <span class="border border-dark px-1"><CIcon name="cil-elevator" class="align-text-bottom" /></span>
          來進行排序，修改後請按下方的
          <span class="border border-dark rounded px-1">儲存排序</span>
          。
        </p>
        <p class="mb-0">
          如需更換餐點所屬的子類別，請點擊該餐點的
          <span class="border border-dark rounded px-1">編輯</span>
          按鈕前往頁面進行修改。
        </p>
      </CAlert>
      <p v-show="mealList.length == 0" class="text-muted text-center my-4">此類別中尚無餐點</p>
      <!-- 各個餐點子類別 -->
      <div v-for="subCate in mealList" :key="`subCate${subCate.subCateId}`">
        <p class="h4 font-weight-bold mt-4">
          {{ subCate.subCateName }}
        </p>
        <!-- 餐點子類別中的餐點列表 -->
        <draggable tag="ul" :list="subCate.meals" handle=".move-icon" :animation="200" @change="changed = true" class="list-unstyled px-4">
          <transition-group name="flip-list">
            <!-- 一項餐點 -->
            <li v-for="meal in subCate.meals" :key="meal.id" class="row align-items-center border mb-3">
              <CIcon name="cil-elevator" customClasses="move-icon border-right" />
              <!-- --餐點名稱-- -->
              <div class="col text-left">{{ meal.name }}</div>
              <!-- --公開、期間限定、價格-- -->
              <div class="col-auto d-flex align-items-center">
                <CBadge v-if="!meal.public" color="light" class="label-badge ml-3">隱藏</CBadge>
                <CBadge v-if="meal.limitDate" color="warning-light" class="small ml-3">
                  期間限定
                  <br />
                  {{ limitDateFormat(meal.limitDate) }}
                </CBadge>
                <span class="ml-3">$ {{ meal.price }}</span>
              </div>
              <!-- --操作按鈕-- -->
              <ProcessButtons :is-change="changed" :item-id="meal.id" item-group="meal" edit-url="/mngt/meal/edit/" @reloadFn="init" class="border-left pl-3" />
            </li>
          </transition-group>
        </draggable>
      </div>
    </CCardBody>

    <CCardFooter align="right">
      <CButton color="info" class="mr-2" @click="addMeal()">新增餐點</CButton>
      <CButton color="success" @click="saveSort()">儲存排序</CButton>
    </CCardFooter>
  </CCard>
</template>
<script src="./Meal.js"></script>
<style lang="scss" scoped>
.label-badge {
  font-size: 1em;
}
</style>
