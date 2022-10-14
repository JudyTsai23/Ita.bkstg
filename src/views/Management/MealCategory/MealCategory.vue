<template>
  <CCard>
    <CCardHeader class="h5 font-weight-bold">
      <CIcon name="cil-list-numbered" class="mt-0" />
      餐點類別管理
    </CCardHeader>

    <CCardBody>
      <!-- 提醒訊息 -->
      <CAlert color="info" closeButton>
        拖曳前方的
        <span class="border border-dark px-1"><CIcon name="cil-elevator" class="align-text-bottom" /></span>
        來進行排序，修改後請按下方的
        <span class="border border-dark rounded px-1">儲存排序</span>
        。
      </CAlert>
      <draggable tag="ul" :list="mealCateList" handle=".move-icon" :animation="200" @change="changed = true" class="list-unstyled px-4">
        <transition-group name="flip-list">
          <li v-for="cate in mealCateList" :key="cate.id" class="row border mb-3">
            <!-- 排序拖曳區塊 -->
            <CIcon name="cil-elevator" customClasses="move-icon border-right" />

            <!-- 餐點類別名稱(展開收合內容按鈕) -->
            <CButton size="" @click="activeCateChanged(cate.id)" class="col text-left">
              {{ cate.name_zh }}
              <CIcon name="cil-caret-bottom" class="collapse-icon float-right" :class="{ open: checkActiveCate(cate.id) }" />
            </CButton>
            <!-- 餐點類別詳細資料(展開收合內容) -->
            <CCollapse :show="checkActiveCate(cate.id)" class="col-12 border-top p-3">
              <CRow>
                <CCol sm="4" md="3" class="mb-3 mb-sm-0">
                  圖示：
                  <img :src="cate.icon" alt="" class="img-thumbnail bg-white align-top" />
                </CCol>
                <CCol sm="8" md="9">
                  <p>
                    名稱：
                    <span class="font-weight-bold">{{ cate.name_zh }}</span>
                  </p>
                  <p>
                    Slug：
                    <span class="font-weight-bold">{{ cate.name }}</span>
                  </p>
                  <p>
                    子類別：
                    <span v-if="typeof mealSubCateList[cate.id] === 'undefined'" class="text-muted">無</span>
                    <span v-else v-for="subCate in mealSubCateList[cate.id]" :key="`subCate_${subCate.id}`" class="d-inline-block border rounded p-2 mb-2 mr-2">{{ subCate.name }}</span>
                  </p>
                </CCol>
                <CCol class="d-flex justify-content-between mt-3">
                  <!-- 前往此類別的餐點管理 按鈕 -->
                  <IconButton size="sm" color="info" icon="cil-arrow-right" :to="`/mngt/meal?cate=${cate.id}`" class="my-1">管理餐點</IconButton>
                  <!-- 修改/刪除 按鈕 -->
                  <ProcessButtons
                    :is-change="changed"
                    :item-id="cate.id"
                    item-group="mealCate"
                    edit-url="/mngt/meal/cate/edit/"
                    :del-lock-id="delLockCateId"
                    del-msg="將會連同類別中的餐點一並刪除！ "
                    @reloadFn="init"
                  />
                </CCol>
              </CRow>
            </CCollapse>
          </li>
        </transition-group>
      </draggable>
    </CCardBody>

    <CCardFooter align="right">
      <CButton color="info" class="mr-2" @click="addCate()">新增類別</CButton>
      <CButton color="success" @click="saveSort()">儲存排序</CButton>
    </CCardFooter>
  </CCard>
</template>
<script src="./MealCategory.js"></script>
<style lang="scss" scoped>
.collapse-icon {
  transition: transform 0.5s;
  &.open {
    transform: scaleY(-1);
  }
}
.img-thumbnail {
  max-width: 120px;
  width: calc(100% - 3rem);
}
</style>
