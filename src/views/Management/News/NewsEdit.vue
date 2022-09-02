<template>
  <CCard>
    <CCardHeader class="h5 font-weight-bold">
      <CIcon name="cil-bullhorn" />
      {{ this.$route.name }}
    </CCardHeader>

    <CCardBody>
      <CForm id="updateForm" class="needs-validation">
        <!-- 類別 -->
        <CSelect label="訊息類別" placeholder="請選擇類別" invalidFeedback="必選" v-model="newsData.type" horizontal required :options="newsTypeList" />
        <!-- 標題欄位 -->
        <CInput label="標題" placeholder="請填寫訊息標題" invalidFeedback="必填" v-model="newsData.title" horizontal required maxlength="15" />
        <!-- 描述欄位 -->
        <CTextarea label="描述" placeholder="請簡述訊息內容" invalidFeedback="必填" v-model="newsData.description" horizontal required maxlength="250" rows="6" />
        <!-- 內文欄位 -->
        <CTextarea label="內文" placeholder="請撰寫訊息內容" invalidFeedback="必填" v-model="newsData.content" horizontal required rows="6" />
        <!-- 封面圖片 -->
        <CInputFile
          label="封面圖片"
          :placeholder="uploadImageSelectedStr"
          custom
          horizontal
          :required="newsData.image == ''"
          accept="image/*"
          @change="getUploadImage"
          id="photoInput"
          class="form-group"
        >
          <template #label>
            <span class="col-sm-3 col-form-label">封面圖片</span>
          </template>
          <!-- --封面圖片預覽-- -->
          <template #description>
            <div v-show="imagePreviewSrc" class="mt-2">
              <small class="d-block">{{ imagePreviewTitle }}</small>
              <label for="photoInput"><img :src="imagePreviewSrc" alt="" class="img-thumbnail" /></label>
            </div>
          </template>
        </CInputFile>
        <!-- 發布日期欄位 -->
        <CInput type="date" label="發布日期" placeholder="請選擇訊息公開發布的日期" v-model="newsData.publish_date" horizontal required />
        <!-- 是否公開 -->
        <CRow form class="form-group">
          <CCol sm="3" class="col-form-label">
            是否公開
            <span class="text-danger">*</span>
          </CCol>
          <CCol sm="9" class="form-row justify-content-start mx-0">
            <CInputRadioGroup
              custom
              inline
              :checked.sync="newsData.public"
              :options="[
                { value: true, label: '公開' },
                { value: false, label: '隱藏' },
              ]"
            />
          </CCol>
        </CRow>
        <!-- 是否置頂 -->
        <CRow form class="form-group">
          <CCol sm="3" class="col-form-label">是否置頂</CCol>
          <CCol sm="9" class="form-row justify-content-start align-items-center mx-0">
            <CSwitch color="danger" size="sm" shape="pill" labelOn="是" labelOff="否" :checked.sync="newsData.top" />
          </CCol>
        </CRow>
      </CForm>
    </CCardBody>

    <CCardFooter align="right">
      <CButton color="secondary" variant="outline" to="/mngt/news" class="mr-3">取消</CButton>
      <CButton color="success" @click="save()">儲存設定</CButton>
    </CCardFooter>
  </CCard>
</template>

<script src="./NewsEdit.js"></script>

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
.img-thumbnail {
  max-height: 300px;
  width: auto;
}
</style>
