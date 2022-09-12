<template>
  <CInputFile :placeholder="UploadImageSelectedStr" custom :horizontal="horizontal" :required="isRequired" accept="image/*" @change="GetUploadImage" :id="safeId" class="form-group">
    <!-- Label -->
    <template v-if="horizontal" #label>
      <span :class="LabelGridClass">
        {{ label }}
        <span v-if="isRequired" class="text-danger">*</span>
      </span>
    </template>
    <!-- 圖片預覽 -->
    <template #description>
      <div v-show="ImagePreviewSrc" class="mt-2">
        <!-- --小標題-- -->
        <small class="d-block">{{ ImagePreviewTitle }}</small>
        <!-- --圖片-- -->
        <label :for="safeId" class="position-relative img-thumbnail bg-white">
          <img :src="ImagePreviewSrc" alt="" :style="`max-width:${maxPreview}`" />
          <!-- --刪除上傳圖片的按鈕-- -->
          <CButton v-show="UploadImage" color="danger" shape="pill" @click="removeUploadImage" class="align-top p-1">
            <CIcon name="cil-x" size="sm" class="m-0" />
          </CButton>
        </label>
      </div>
    </template>
  </CInputFile>
</template>

<script>
import { makeUid } from "@coreui/utils/src";

export default {
  name: "ImageInput",
  props: {
    value: {
      type: String,
    },
    label: {
      type: String,
      default: "",
    },
    wasValidated: Boolean,
    // 橫向排版(CInput的)
    horizontal: {
      type: [Boolean, Object],
      default: false,
    },
    // 原有圖片
    oldImage: {
      type: String,
      default: "",
    },
    // 上傳的檔案大小限制
    limitSize: {
      type: Number,
    },
    // 上傳的檔案大小限制之單位
    limitUnit: {
      type: String,
      default: "KB",
    },
    // 預覽圖的最大寬度
    maxPreview: {
      type: String,
      default: "100%",
    },
  },
  watch: {
    value(val) {
      this.UploadImage = val;
    },
    UploadImage(val) {
      this.$emit("update:value", val);
    },
  },
  data() {
    return {
      // 上傳的圖片(base64字串)
      UploadImage: "",
      // 上傳的圖片的檔名
      UploadImageName: "",
    };
  },
  computed: {
    // 產生id
    safeId() {
      if (this.id || this.$attrs.id) {
        return this.id || this.$attrs.id;
      }
      return makeUid();
    },
    // 是否需要必填
    isRequired() {
      if (this.oldImage == "") {
        return true;
      }
      return false;
    },
    // Label排版的class
    LabelGridClass() {
      if (this.horizontal === true) {
        return "col-sm-3 col-form-label";
      } else if (this.horizontal instanceof Object) {
        return this.horizontal.label + " col-form-label";
      }
      return;
    },
    // 選擇檔案所顯示的文字
    UploadImageSelectedStr() {
      if (this.UploadImageName == "") {
        return "尚未選擇檔案";
      }
      return this.UploadImageName;
    },
    // 預覽圖片區塊的小標題
    ImagePreviewTitle() {
      if (this.oldImage && !this.UploadImage) {
        return "現有影像";
      }
      if (this.UploadImage) {
        return "上傳預覽";
      }
    },
    // 預覽圖片的src
    ImagePreviewSrc() {
      if (this.oldImage && !this.UploadImage) {
        return this.oldImage;
      }
      if (this.UploadImage) {
        return this.UploadImage;
      }
      return "";
    },
  },
  methods: {
    // 檔案上傳與圖片預覽
    GetUploadImage(files, event) {
      // const file = e.target.files.item(0);
      // --(CInputFile傳過來的已經是e.target.files)
      const file = files.item(0);
      if (file) {
        // valid:檢查圖片限制的結果
        let valid = this.limitSize ? this.Validfile(file, "image", this.limitSize, this.limitUnit) : true;
        // 顯示預覽圖、圖片存入data
        if (valid) {
          //--建立 reader 變數為一個檔案讀取器物件
          this.UploadImageName = file.name;
          const reader = new FileReader();
          //--先準備好讀取器讀取檔案後要執行的工作
          reader.addEventListener("load", (e) => {
            //----將 e.target.result (也就是讀取器接收到的檔案資訊)存入data
            this.UploadImage = e.target.result;
          });
          //--讀取器讀取上傳的檔案內容
          reader.readAsDataURL(file);
        } else {
          // 檢查不通過
          this.removeUploadImage();
        }
      }
    },
    // 檢查圖片檔案大小
    Validfile(file, type, size, unit) {
      switch (unit) {
        case "Byte":
          var fileUnit = 1;
          break;
        case "KB":
          var fileUnit = 1024;
          break;
        case "MB":
          var fileUnit = 1024 * 1024;
          break;
        case "GB":
          var fileUnit = 1024 * 1024 * 1024;
          break;
        default:
          break;
      }
      let fileSize = (file.size / fileUnit).toFixed(0);
      let fileType = file.name.substring(file.name.lastIndexOf("."));

      switch (type) {
        case "image":
          if (!fileType.match(/.jpg|.jpeg|.png|.svg/i)) {
            alert("請上傳圖片檔案(.jpg|.jpeg|.png|.svg)");
            return false;
          }
          break;
        default:
          console.error("type_參數設置錯誤！");
          return false;
          break;
      }
      if (fileSize > size) {
        alert("檔案不能超過" + size + unit);
        return false;
      }
      return true;
    },
    // 移除上傳的圖片
    removeUploadImage() {
      this.UploadImage = "";
      this.UploadImageName = "";
      document.getElementById(this.safeId).value = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.img-thumbnail {
  img {
    width: 100%;
    height: auto;
  }
  .btn {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -40%);
    line-height: 1;
    opacity: 0.6;
    &:hover {
      opacity: 1;
    }
  }
}
</style>
