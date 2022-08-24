import ApiUrl from "@/const/apiUrl.js";
import AjaxService from "@/services/ajaxService.js";
import draggable from "vuedraggable";

export default {
  name: "MealEdit",
  components: {
    draggable,
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
      UploadImageName: "",
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
      let url = ApiUrl.getUrl("mealCate", "getAllSub");
      AjaxService.get(
        url,
        (successResp) => {
          if (successResp.restData) {
            this.mealSubCateList = successResp.restData;
            console.log("查詢餐點子類別成功!");
          }
        },
        (errorResp) => {
          console.log("查詢餐點子類別失敗!");
          console.log(errorResp);
        }
      );
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
        console.log(this.UploadImage);
        //--讀取器讀取上傳的檔案內容
        reader.readAsDataURL(file);
      }
    },
    // 送出資料儲存
    save() {
      const form = document.querySelector("#updateForm");
      if (form.checkValidity() === true) {
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
            console.log("修改餐點類別成功!");
            this.$router.push("/mngt/meal?cate=" + this.mealData.category);
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
    currSubCateList() {
      let subList = [];
      let data = this.mealSubCateList[this.mealData.category];
      if (this.mealData.category == "") {
        subList = [
          {
            value: "none",
            label: "請先選擇大類別",
            disabled: true,
          },
        ];
      } else if (data === undefined) {
        subList = [
          {
            value: "0", // FIXME 確認後端做法後再調整
            label: "無",
            attrs: "selected",
          },
        ];
      } else {
        // FIXME 確認後端做法後再調整
        subList = data.map((item) => {
          let sub = {
            value: "0",
            label: item,
          };
          return sub;
        });
      }
      return subList;
    },
    priceInvalidStr() {
      return this.mealData.price == "" ? "必填" : "不可為負值";
    },
    uploadImageSelectedStr() {
      if (this.UploadImageName == "") {
        return "尚未選擇檔案";
      }
      return this.UploadImageName;
    },
    // 預覽圖片區塊的小標題
    imagePreviewTitle() {
      if (this.mealData.image && !this.UploadImage) {
        return "現有照片";
      }
      if (this.UploadImage) {
        return "上傳預覽";
      }
    },
    // 預覽圖片的src
    imagePreviewSrc() {
      // FIXME 圖檔位置待確認
      if (this.mealData.image && !this.UploadImage) {
        return this.mealData.image;
      }
      if (this.UploadImage) {
        return this.UploadImage;
      }
    },
  },
};
