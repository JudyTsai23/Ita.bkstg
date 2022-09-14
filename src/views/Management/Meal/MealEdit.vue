<template>
  <CCard>
    <CCardHeader class="h5 font-weight-bold">
      <CIcon name="cil-restaurant" class="mt-0" />
      {{ this.$route.name }}
    </CCardHeader>

    <CCardBody>
      <CForm id="updateForm" class="needs-validation">
        <!-- 類別 -->
        <CRow form>
          <CCol sm="3" class="col-form-label">
            <label>
              類別
              <span class="text-danger">*</span>
            </label>
          </CCol>
          <CCol sm="9" class="form-row mx-0">
            <CSelect placeholder="請選擇類別" invalidFeedback="必填" v-model="mealData.category" required :options="mealCateList" class="col-6 pl-0 pr-1" />
            <CSelect placeholder="請選擇子類別" invalidFeedback="必填" v-model="mealData.sub_category" required :options="currSubCateList" class="col-6 pl-1 pr-0" />
          </CCol>
        </CRow>
        <!-- 名稱欄位 -->
        <CInput label="名稱" placeholder="請填寫餐點名稱" invalidFeedback="必填" v-model="mealData.name" horizontal required maxlength="15">
          <template #label>
            <label class="col-sm-3 col-form-label">
              名稱
              <span class="text-danger">*</span>
            </label>
          </template>
        </CInput>
        <!-- 描述欄位 -->
        <CTextarea
          label="描述"
          placeholder="請描述餐點介紹"
          invalidFeedback="必填"
          v-model="mealData.description"
          horizontal
          required
          maxlength="220"
          rows="6"
          :description="`${mealData.description ? mealData.description.length : 0} / 220`"
          addWrapperClasses="limit-hint"
        >
          <template #label>
            <label class="col-sm-3 col-form-label">
              描述
              <span class="text-danger">*</span>
            </label>
          </template>
        </CTextarea>
        <!-- 內容物欄位 -->
        <CTextarea
          label="內容物"
          placeholder="請列舉內容物"
          invalidFeedback="必填"
          v-model="mealData.ingredient"
          horizontal
          required
          maxlength="100"
          rows="2"
          :description="`${mealData.ingredient ? mealData.ingredient.length : 0} / 100`"
          addWrapperClasses="limit-hint"
          @keydown.enter="reject"
        >
          <template #label>
            <label class="col-sm-3 col-form-label">
              內容物
              <span class="text-danger">*</span>
            </label>
          </template>
        </CTextarea>
        <!-- 備註欄位 -->
        <CInput
          label="備註"
          placeholder="請填寫餐點備註"
          v-model="mealData.note"
          horizontal
          maxlength="250"
          :description="`${mealData.note ? mealData.note.length : 0} / 250`"
          addWrapperClasses="limit-hint"
        />
        <!-- 價格欄位 -->
        <CInput type="number" label="價格" placeholder="請填寫餐點價格" :invalidFeedback="priceInvalidStr" v-model="mealData.price" horizontal required min="0">
          <template #label>
            <label class="col-sm-3 col-form-label">
              價格
              <span class="text-danger">*</span>
            </label>
          </template>
        </CInput>
        <!-- 照片 -->
        <ImageInput label="照片" horizontal :limitSize="300" limitUnit="KB" maxPreview="300px" :oldImage="mealData.image" :value.sync="UploadImage" />
        <!-- 限定日期欄位 -->
        <CInput type="date" label="限定日期" placeholder="請選擇期間限定之餐點的下架日期" description="此為期間限定的下架時間，若非限定餐點，則須清除日期。" v-model="mealData.limit_date" horizontal />
        <!-- 是否公開 -->
        <CRow form>
          <CCol sm="3" class="col-form-label">
            是否公開
            <span class="text-danger">*</span>
          </CCol>
          <CCol sm="9" class="form-row justify-content-start mx-0">
            <CInputRadioGroup
              custom
              inline
              :checked.sync="mealData.public"
              :options="[
                { value: true, label: '顯示' },
                { value: false, label: '隱藏' },
              ]"
            />
          </CCol>
        </CRow>
      </CForm>
    </CCardBody>

    <CCardFooter align="right">
      <IconButton v-if="currId" color="danger" icon="cil-trash" @clickFn="del()" class="float-left">刪除此餐點</IconButton>
      <CButton color="secondary" variant="outline" :to="backTo" class="mr-3">取消</CButton>
      <CButton color="success" @click="save()">儲存設定</CButton>
    </CCardFooter>
  </CCard>
</template>

<script src="./MealEdit.js"></script>

<style lang="scss" scoped>
#updateForm::v-deep {
  // XXX breakpoint使用scss的variables
  @media (min-width: 576px) {
    .form-row {
      justify-content: center;
    }
    .col-form-label {
      max-width: 100px;
    }
  }
}
</style>
