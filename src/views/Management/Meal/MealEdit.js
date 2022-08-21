import AjaxService from "@/services/ajaxService.js";
import draggable from "vuedraggable";

export default {
  name: "MealEdit",
  components: {
    draggable,
  },
  data() {
    return {
      // 當前餐點類別ID
      currId: this.$route.params.id,
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
      AjaxService.get(
        "/server/menu/meal/" + this.currId,
        (successResp) => {
          if (successResp.restData) {
            let resultData = successResp.restData;
            // 處理期間限定的日期值
            let limit_date = resultData.limitDate.toString();
            let Y = limit_date.substr(0, 4),
              M = limit_date.substr(4, 2),
              D = limit_date.substr(6, 2);
            limit_date = `${Y}-${M}-${D}`;
            // 處理是否公開的值
            let public_str = resultData.public ? "show" : "hidden";
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
              public: public_str,
            };
            console.log("查詢餐點成功!");
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
      AjaxService.get(
        "/server/mealCate/cate",
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
      AjaxService.get(
        "/server/mealCate/sub",
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
        let url = "/server/menu/save";
        // 處理圖片資料
        let image = this.UploadImage != "" ? this.UploadImage : this.mealData.image;
        // 處理期間限定資料
        let limit_date = this.mealData.limit_date.replace(/-/g, "");
        // 處理是否公開的值
        let public_val = this.mealData.public == "show" ? true : false;
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

        AjaxService.post(
          url,
          sendData,
          (successResp) => {
            console.log("修改餐點類別成功!");
            this.$router.push("/mngt/meal");
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
      let subList = this.mealSubCateList[this.mealData.category];
      if (subList === undefined) {
        subList = [
          // {
          //   value: '',
          //   label: '請先選擇類別',
          //   disabled: true,
          // },
        ];
      } else {
        // subList = subList.map((item) => {
        //   let sub = {
        //     value: item.id,
        //     label: item.zhName,
        //   };
        //   return sub;
        // });
      }
      return subList;
    },
    priceInvalidStr() {
      return this.mealData.price == "" ? "必填" : "不可為負值";
    },
    UploadImageSelectedStr() {
      if (this.UploadImageName == "") {
        return "尚未選擇檔案";
      }
      return this.UploadImageName;
    },
  },
};
