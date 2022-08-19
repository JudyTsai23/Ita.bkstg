<template>
  <CCard>
    <CCardHeader class="h5 font-weight-bold">
      <CIcon name="cil-list-numbered" />
      餐點類別管理
    </CCardHeader>

    <CCardBody>
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
                  <!-- FIXME 圖檔位置 -->
                  <img
                    src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/344/external-image-interface-kiranshastry-lineal-kiranshastry-1.png"
                    alt=""
                    class="img-thumbnail bg-white align-top"
                  />
                </CCol>
                <CCol sm="8" md="9" class="pb-4">
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
                    <span v-else v-for="(subCate, idx) in mealSubCateList[cate.id]" :key="`cate${cate.id}_${idx}`" class="d-inline-block border rounded p-2 mb-2 mr-2">{{ subCate }}</span>
                  </p>
                  <!-- 修改/刪除 按鈕 -->
                  <ProcessButtons
                    :is-change="changed"
                    :edit-url="`/mngt/meal/cate/edit/${cate.id}`"
                    :del-url="`/server/mealCate/cate/${cate.id}`"
                    del-msg="將會連同類別中的餐點一並刪除！ "
                    @del-method="deleteCate(cate.id)"
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
.btn-toolbar {
  position: absolute;
  bottom: 0;
  right: 15px;
}
</style>
