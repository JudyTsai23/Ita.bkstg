<template>
  <CCard>
    <CCardHeader class="h5 font-weight-bold">{{ this.$route.name }}</CCardHeader>

    <CCardBody>
      <CRow tag="form" id="updateForm" class="needs-validation">
        <!-- 餐點類別資訊 -->
        <CCol sm="6" md="5">
          <div class="cate-info rounded p-3 mb-5 mb-sm-0">
            <!-- 名稱欄位 -->
            <CInput label="名稱" placeholder="請填寫類別名稱" invalidFeedback="必填" v-model="mealCateData.name_zh" horizontal required />

            <!-- Slug欄位 -->
            <CInput placeholder="請填寫Slug" invalidFeedback="必填" v-model="mealCateData.name" horizontal required id="inputSlug">
              <template #label>
                <label class="col-sm-3 col-form-label" for="inputSlug">
                  Slug
                  <CIcon name="cil-lightbulb" v-c-tooltip="'網址使用的別名'" class="icon-circle bg-warning text-white" />
                </label>
              </template>
            </CInput>

            <!-- 圖示欄位 -->
            <CInputFile label="圖示" addInputClasses="custom-file-input" horizontal :required="mealCateData.icon == ''" accept="image/*" @change="getUploadImage" id="inputIcon">
              <template #label>
                <span class="col-sm-3 col-form-label">圖示</span>
              </template>
              <template #label-after-input>
                <label class="custom-file-label">{{ UploadImageSelectedStr }}</label>
              </template>
              <!-- --圖示預覽-- -->
              <template #description>
                <div v-if="mealCateData.icon && !UploadImage" class="mt-2">
                  <small>現有圖示</small>
                  <!-- FIXME 圖檔位置 -->
                  <img
                    src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/344/external-image-interface-kiranshastry-lineal-kiranshastry-1.png"
                    alt=""
                    class="img-thumbnail bg-white"
                  />
                </div>
                <div v-if="UploadImage" class="mt-2">
                  <small>上傳預覽</small>
                  <img :src="UploadImage" class="img-thumbnail bg-white" />
                </div>
              </template>
            </CInputFile>
          </div>
        </CCol>
        <!-- 餐點類別資訊 END -->
        <!-- 餐點類別 子類別 -->
        <CCol sm="6" md="7">
          <p class="d-flex justify-content-between align-items-center h5 font-weight-bold">
            子類別
            <IconButton size="sm" color="info" icon="cil-playlist-add" @clickFn="addSubCate()" class="text-white mr-2">新增子類別</IconButton>
          </p>
          <p v-show="subCateList.length == 0" class="text-muted text-center my-4">尚無子類別</p>
          <!-- 子類別列表-可拖曳 -->
          <draggable tag="ul" :list="subCateList" handle=".move-icon" :animation="200" @change="changed = true" class="list-unstyled px-4">
            <transition-group name="flip-list">
              <li v-for="(subCate, idx) in subCateList" :key="`subCate${idx}`" class="row align-items-center border list-group-item-info mb-3">
                <CIcon name="cil-elevator" customClasses="move-icon" />
                <CInput placeholder="請填寫子類別名稱" addInputClasses="input-subCate" v-model="subCate.name" required class="col p-0 mb-0" />
                <CButton @click="delSubCate(idx)" class="del-btn"><CIcon name="cil-trash" /></CButton>
              </li>
            </transition-group>
          </draggable>
        </CCol>
        <!-- 餐點類別 子類別 END -->
      </CRow>
    </CCardBody>

    <CCardFooter align="right">
      <CButton color="success" @click="save()">儲存設定</CButton>
    </CCardFooter>
  </CCard>
</template>

<script src="./MealCateEdit.js"></script>

<style lang="scss" scoped>
@import '~@coreui/coreui/scss/variables/colors';

.cate-info {
  background-color: $warning-25;
}
.img-thumbnail {
  display: block;
  width: 120px;
  height: auto;
}
.del-btn {
  color: inherit;
  padding: 10px;
  margin: 0 5px;
}
.del-btn .c-icon {
  width: 1.25em;
  height: 1.25em;
  margin: 0;
}
</style>
