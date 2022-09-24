import ApiUrl from "@/const/apiUrl.js";
import AjaxService from "@/services/ajaxService.js";
import draggable from "vuedraggable";
import ImageInput from "@/components/ImageInput";

export default {
  name: "MealCateEdit",
  components: {
    draggable,
    ImageInput,
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
      // DB中的當前餐點類別資料
      db_mealCateData: {},
      // 上傳的圖片(base64字串)
      UploadImage: "",
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
            // 紀錄db的原始資料
            this.db_mealCateData = { ...this.mealCateData };
            this.db_mealCateData.subCateList = resultData.subCateList.map((item) => {
              return { ...item };
            });
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
      let cateChanged = JSON.stringify(this.mealCateData) != JSON.stringify(this.db_mealCateData);
      // 是否有 修改過排序 或 修改過input欄位資料 或 選擇圖檔
      if (this.changed || cateChanged || this.UploadImage) {
        if (confirm("頁面內容曾修改過，尚未儲存修改的變更將會捨棄！\n是否確定要離開此頁面？")) {
          // 確定離開
          return true;
        }
        return false;
      }
      // 未曾修改=>確定離開
      return true;
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
        if (confirm("將會連同類別中的餐點一並刪除！是否確定要刪除？\n***** 請注意！刪除後無法復原！*****")) {
          if (this.checkChanged()) {
            this.$store.commit("set", ["globalLoading", true]);
            let url = ApiUrl.getUrl("mealCate", "deleteSub") + this.subCateList[idx].id;
            AjaxService.delete(
              url,
              (successResp) => {
                this.$store.commit("set", ["globalLoading", false]);
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
      form.classList.add("was-validated");
      if (form.checkValidity() === true) {
        this.$store.commit("set", ["globalLoading", true]);
        // 處理子類別排序
        let subData = this.subCateList.map((item, idx) => {
          item.sort = idx + 1;
          return item;
        });
        // 處理圖片資料
        let image = this.UploadImage != "" ? this.UploadImage : this.mealCateData.icon;
        // 最終資料
        let sendData = {
          id: this.mealCateData.id,
          name: this.mealCateData.name,
          zhName: this.mealCateData.name_zh,
          icon: image,
          sort: this.mealCateData.sort,
          subCateList: subData,
        };

        let url = ApiUrl.getUrl("mealCate", "save");
        AjaxService.post(
          url,
          sendData,
          (successResp) => {
            this.$store.commit("set", ["globalLoading", false]);
            console.log("修改餐點類別成功!");
            this.$router.push("/mngt/meal/cate");
          },
          (errorResp) => {
            console.log("修改餐點類別失敗!");
            console.log(errorResp);
            if ((errorResp.appCode = "ERROR_002")) {
              this.$store.commit("set", ["globalLoading", false]);
              const errorMsg = errorResp.response.data.appMsg;
              // 錯誤的input
              let $input = errorMsg == "Slug 不得重複" ? this.$refs.inputSlug : this.$refs.inputName;
              // 加樣式、訊息、focus
              $input.addInputClasses = "is-invalid";
              $input.invalidFeedback = errorMsg;
              document.getElementById($input.safeId).focus();
              // 避免和form驗證結果的樣式衝突
              form.classList.remove("was-validated");
              alert(errorMsg);
            }
          }
        );
      } else {
        document.querySelector("input:invalid,select:invalid,textarea:invalid").focus();
      }
    },
    del() {
      if (confirm("將會連同類別中的餐點一並刪除！ 是否確定要刪除？\n***** 請注意！刪除後無法復原！*****")) {
        this.$store.commit("set", ["globalLoading", true]);
        let url_base = ApiUrl.getUrl("mealCate", "delete");
        AjaxService.delete(
          url_base + this.mealCateData.id,
          (successResp) => {
            this.$store.commit("set", ["globalLoading", false]);
            console.log("刪除成功!");
            this.$router.push("/mngt/meal/cate");
          },
          (errorResp) => {
            console.log("刪除失敗!");
            console.log(errorResp);
          }
        );
      }
    },
  },
  computed: {
    // 餐點子類別
    subCateList() {
      return this.mealCateData.subCateList;
    },
  },
};
