import ApiUrl from "@/const/apiUrl.js";
import AjaxService from "@/services/ajaxService.js";
import draggable from "vuedraggable";
import ImageInput from "@/components/ImageInput";

export default {
  name: "MealEdit",
  components: {
    draggable,
    ImageInput,
  },
  data() {
    return {
      // 當前餐點ID
      currId: this.$route.params.id,
      // 返回的URL
      backTo: "/mngt/meal",
      // 當前餐點類別資料
      mealData: {
        id: "",
        category: "",
        sub_category: "",
        name: "",
        description: "",
        ingredient: "",
        note: "",
        price: "",
        image: "",
        limit_date: "",
        public: true,
      },
      // 所有餐點類別
      mealCateList: [],
      // 所有餐點子類別
      mealSubCateList: [],
      // 上傳的圖片(base64字串)
      UploadImage: "",
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.currId !== undefined) {
        this.getMealData();
      }
      this.getMealCateList();
      this.getMealSubCateList();
    },

    // 取得當前餐點資料
    getMealData() {
      this.$store.commit("set", ["globalLoading", true]);
      let url = ApiUrl.getUrl("meal", "getOne") + this.currId;
      AjaxService.get(
        url,
        (successResp) => {
          if (successResp.restData) {
            let resultData = successResp.restData;
            // 處理期間限定的日期值
            let limit_date = "";
            if (resultData.limitDate) {
              limit_date = resultData.limitDate.toString();
              let Y = limit_date.substr(0, 4),
                M = limit_date.substr(4, 2),
                D = limit_date.substr(6, 2);
              limit_date = `${Y}-${M}-${D}`;
            }
            // 最終資料
            this.mealData = {
              id: resultData.id,
              category: resultData.category,
              sub_category: resultData.subCategory,
              name: resultData.name,
              description: resultData.description,
              ingredient: resultData.ingredient,
              note: resultData.note,
              price: resultData.price,
              image: resultData.image,
              limit_date: limit_date,
              public: resultData.public,
            };
            this.$store.commit("set", ["globalLoading", false]);
            console.log("查詢餐點成功!");

            // "返回"按鈕的連結帶參數
            this.backTo += `?cate=${this.mealData.category}`;
          }
        },
        (errorResp) => {
          console.log("查詢餐點失敗!");
          console.log(errorResp);
        }
      );
    },
    // 取得所有餐點類別
    getMealCateList() {
      this.$store.commit("set", ["globalLoading", true]);
      let url = ApiUrl.getUrl("mealCate", "getAll");
      AjaxService.get(
        url,
        (successResp) => {
          if (successResp.restData) {
            let resultList = successResp.restData;
            this.mealCateList = resultList.map((item) => {
              let cate = {
                value: item.id,
                label: item.zhName,
              };
              return cate;
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
    // 取得所有餐點子類別
    getMealSubCateList() {
      this.$store.commit("set", ["globalLoading", true]);
      let url = ApiUrl.getUrl("mealCate", "getAllSub");
      AjaxService.get(
        url,
        (successResp) => {
          if (successResp.restData) {
            this.mealSubCateList = successResp.restData;
            this.$store.commit("set", ["globalLoading", false]);
            console.log("查詢餐點子類別成功!");
          }
        },
        (errorResp) => {
          console.log("查詢餐點子類別失敗!");
          console.log(errorResp);
        }
      );
    },
    // 禁止換行(輸入時不回傳此按鍵的值)
    reject(e) {
      e.returnValue = false;
    },
    // 送出資料儲存
    save() {
      const form = document.querySelector("#updateForm");
      form.classList.add("was-validated");
      if (form.checkValidity() === true) {
        this.$store.commit("set", ["globalLoading", true]);
        // 處理圖片資料
        let image = this.UploadImage != "" ? this.UploadImage : this.mealData.image;
        // 處理期間限定資料
        let limit_date = this.mealData.limit_date.replace(/-/g, "");
        // 最終資料
        let sendData = {
          id: this.mealData.id,
          category: this.mealData.category,
          subCategory: this.mealData.sub_category,
          name: this.mealData.name,
          description: this.mealData.description,
          ingredient: this.mealData.ingredient,
          note: this.mealData.note,
          price: this.mealData.price,
          image: image,
          limitDate: limit_date,
          isPublic: this.mealData.public,
        };

        let url = ApiUrl.getUrl("meal", "save");
        AjaxService.post(
          url,
          sendData,
          (successResp) => {
            this.$store.commit("set", ["globalLoading", false]);
            console.log("修改餐點類別成功!");
            this.$router.push("/mngt/meal?cate=" + this.mealData.category);
          },
          (errorResp) => {
            console.log("修改餐點類別失敗!");
            console.log(errorResp);
          }
        );
      } else {
        document.querySelector("input:invalid,select:invalid,textarea:invalid").focus();
      }
    },
    del() {
      if (confirm("是否確定要刪除？\n***** 請注意！刪除後無法復原！*****")) {
        this.$store.commit("set", ["globalLoading", true]);
        let url_base = ApiUrl.getUrl("meal", "delete");
        AjaxService.delete(
          url_base + this.mealData.id,
          (successResp) => {
            this.$store.commit("set", ["globalLoading", false]);
            console.log("刪除成功!");
            this.$router.push("/mngt/meal?cate=" + this.mealData.category);
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
    currSubCateList() {
      let subList = [];
      let data = this.mealSubCateList.find((item) => item.categoryId === this.mealData.category);

      if (this.mealData.category == "") {
        subList = [
          {
            value: "_",
            label: "請先選擇大類別",
            disabled: true,
          },
        ];
      } else if (data === undefined) {
        subList = [
          {
            value: 0,
            label: "無",
          },
        ];
      } else {
        subList = data.subCateList.map((item) => {
          let sub = {
            value: item.id,
            label: item.name,
          };
          return sub;
        });
      }
      return subList;
    },
    priceInvalidStr() {
      return this.mealData.price == "" ? "必填" : "不可為負值";
    },
  },
};
