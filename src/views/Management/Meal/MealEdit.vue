<template>
  <CCard>
    <CCardHeader class="h5 font-weight-bold">{{ this.$route.name }}</CCardHeader>

    <CCardBody>
      <CForm id="updateForm" class="needs-validation">
        <!-- 類別 -->
        <CRow form>
          <CCol sm="3" class="col-form-label"><label>類別</label></CCol>
          <CCol sm="9" class="form-row mx-0">
            <CSelect placeholder="請選擇類別" invalidFeedback="必填" v-model="mealData.category" required :options="mealCateList" class="col-6 pl-0 pr-1" />
            <!-- FIXME currSubCateList沒有id -->
            <CSelect placeholder="請選擇子類別" invalidFeedback="必填" v-model="mealData.sub_category" required :options="currSubCateList" class="col-6 pl-1 pr-0" />
          </CCol>
        </CRow>
        <!-- 名稱欄位 -->
        <CInput label="名稱" placeholder="請填寫餐點名稱" invalidFeedback="必填" v-model="mealData.name" horizontal required maxlength="15" />
        <!-- 描述欄位 -->
        <CTextarea label="描述" placeholder="請描述餐點介紹" invalidFeedback="必填" v-model="mealData.description" horizontal required maxlength="250" rows="6" />
        <!-- 內容物欄位 -->
        <CTextarea label="內容物" placeholder="請列舉內容物" invalidFeedback="必填" v-model="mealData.ingredient" horizontal required maxlength="250" rows="6" />
        <!-- 備註欄位 -->
        <CInput label="備註" placeholder="請填寫餐點備註" v-model="mealData.note" horizontal maxlength="255" />
        <!-- 價格欄位 -->
        <CInput type="number" label="價格" placeholder="請填寫餐點價格" :invalidFeedback="priceInvalidStr" v-model="mealData.price" horizontal required min="0" />
        <!-- 照片 -->
        <CInputFile label="照片" :placeholder="UploadImageSelectedStr" custom horizontal :required="mealData.image == ''" accept="image/*" @change="getUploadImage" class="form-group">
          <template #label>
            <span class="col-sm-3 col-form-label">照片</span>
          </template>
          <!-- --照片預覽-- -->
          <template #description>
            <div v-if="mealData.image && !UploadImage" class="mt-2">
              <small>現有照片</small>
              <!-- FIXME 圖檔位置 -->
              <img :src="mealData.image" alt="" class="img-thumbnail" />
            </div>
            <div v-if="UploadImage" class="mt-2">
              <small>上傳預覽</small>
              <img :src="UploadImage" class="img-thumbnail" />
            </div>
          </template>
        </CInputFile>
        <!-- 限定日期欄位 -->
        <CInput type="date" label="限定日期" placeholder="請選擇期間限定之餐點的下架日期" description="此為期間限定的下架時間，若非限定餐點，則須清除日期。" v-model="mealData.limit_date" horizontal />
        <!-- 是否公開 -->
        <!-- TODO 未完成 -->
        <CRow form>
          <CCol sm="3" class="col-form-label"><label>是否公開</label></CCol>
          <CCol sm="9" class="form-row mx-0">
            <CInputRadioGroup
              custom
              inline
              :checked="mealData.public"
              :options="[
                { value: 'show', label: '顯示' },
                { value: 'hidden', label: '隱藏' },
              ]"
            ></CInputRadioGroup>
          </CCol>
        </CRow>
      </CForm>
    </CCardBody>

    <CCardFooter align="right">
      <CButton color="success" @click="save()">儲存設定</CButton>
    </CCardFooter>
  </CCard>
</template>

<script src="./MealEdit.js"></script>

<style lang="scss" scoped>
#updateForm::v-deep {
  // max-width: 800px;
  .col-form-label {
    max-width: 150px;
  }
}
.img-thumbnail {
  display: block;
  max-height: 300px;
  width: auto;
}
</style>
