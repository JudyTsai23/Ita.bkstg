import ApiUrl from "@/const/apiUrl.js";
import AjaxService from "@/services/ajaxService.js";
import draggable from "vuedraggable";

export default {
  name: "MealCateEdit",
  components: {
    draggable,
  },
  inject: ["reload"],
  data() {
    return {
      // 當前餐點類別ID
      currId: this.$route.params.id,
      // 當前餐點類別資料
      mealCateData: {
        id: "",
        name: "",
        name_zh: "",
        icon: "",
        sort: "",
        subCateList: Array(),
      },
      // 上傳的圖片(base64字串)
      UploadImage: "",
      // 上傳的圖片檔名
      UploadImageName: "",
      // 是否曾經改動過
      changed: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.currId !== undefined) {
        this.getMealCateData();
      }
    },
    // 取得當前餐點類別資料
    getMealCateData() {
      this.$store.commit("set", ["globalLoading", true]);
      let url = ApiUrl.getUrl("mealCate", "getOne") + this.currId;
      AjaxService.get(
        url,
        (successResp) => {
          if (successResp.restData) {
            let resultData = successResp.restData[0];
            this.mealCateData = {
              id: resultData.id,
              name: resultData.name,
              name_zh: resultData.zhName,
              icon: resultData.icon,
              sort: resultData.sort,
              subCateList: resultData.subCateList,
            };
            this.$store.commit("set", ["globalLoading", false]);
            console.log("查詢餐點類別成功!");
          }
        },
        (errorResp) => {
          console.log("查詢餐點類別失敗!");
          console.log(errorResp);
        }
      );
    },
    // 檢查頁面內容是否曾修改過
    checkChanged() {
      if (this.changed) {
        if (confirm("頁面內容曾修改過，尚未儲存修改的變更將會捨棄！\n是否確定要離開此頁面？")) {
          // 確定離開
          return true;
        }
        return false;
      }
      // 未曾修改=>確定離開
      return true;
    },
    // 檔案上傳與圖片預覽
    getUploadImage(e) {
      // const file = e.target.files.item(0);
      // --(CInputFile傳過來的已經是e.target.files)
      const file = e.item(0);
      if (!file) {
        this.UploadImage = "";
        this.UploadImageName = "";
      } else {
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
      }
    },
    // 增加子類別
    addSubCate() {
      this.subCateList.push({
        id: "",
        name: "",
        sort: "",
      });
      this.$nextTick(() => {
        let idx = this.subCateList.length - 1;
        document.querySelectorAll(".input-subCate").item(idx).focus();
      });
    },
    // 刪除子類別
    delSubCate(idx) {
      if (this.subCateList[idx].id != "") {
        if (confirm("將會連同類別中的餐點一並刪除！是否確定要刪除？")) {
          if (this.checkChanged()) {
            let url = ApiUrl.getUrl("mealCate", "deleteSub") + this.subCateList[idx].id;
            AjaxService.delete(
              url,
              (successResp) => {
                console.log("刪除餐點子類別成功!");
                this.reload();
              },
              (errorResp) => {
                console.log("刪除餐點子類別失敗!");
                console.log(errorResp);
              }
            );
          }
        }
      } else {
        this.subCateList.splice(idx, 1);
      }
    },
    // 送出資料儲存
    save() {
      const form = document.querySelector("#updateForm");
      if (form.checkValidity() === true) {
        let subData = this.subCateList.map((item, idx) => {
          item.sort = idx + 1;
          return item;
        });
        let sendData = {
          id: this.mealCateData.id,
          name: this.mealCateData.name,
          zhName: this.mealCateData.name_zh,
          icon: this.mealCateData.icon,
          sort: this.mealCateData.sort,
          subCateList: subData,
        };
        if (this.UploadImage != "") {
          // --用base64字串的方式上傳圖片
          this.mealCateData.icon = this.UploadImage;
        }

        let url = ApiUrl.getUrl("mealCate", "save");
        AjaxService.post(
          url,
          sendData,
          (successResp) => {
            console.log("修改餐點類別成功!");
            this.$router.push("/mngt/meal/cate");
          },
          (errorResp) => {
            console.log("修改餐點類別失敗!");
            console.log(errorResp);
          }
        );
      }
      form.classList.add("was-validated");
    },
  },
  computed: {
    // 餐點子類別
    subCateList() {
      return this.mealCateData.subCateList;
    },
    // 選擇檔案所顯示的文字
    uploadImageSelectedStr() {
      if (this.UploadImageName == "") {
        return "尚未選擇檔案";
      }
      return this.UploadImageName;
    },
    // 預覽圖片區塊的小標題
    imagePreviewTitle() {
      if (this.mealCateData.icon && !this.UploadImage) {
        return "現有圖示";
      }
      if (this.UploadImage) {
        return "上傳預覽";
      }
    },
    // 預覽圖片的src
    imagePreviewSrc() {
      // FIXME 圖檔位置待確認
      if (this.mealCateData.icon && !this.UploadImage) {
        return "https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/344/external-image-interface-kiranshastry-lineal-kiranshastry-1.png";
      }
      if (this.UploadImage) {
        return this.UploadImage;
      }
      return "";
    },
  },
};
