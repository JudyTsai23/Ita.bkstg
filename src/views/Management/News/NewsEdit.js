import ApiUrl from "@/const/apiUrl.js";
import AjaxService from "@/services/ajaxService.js";
import NewsType from "@/const/newsType.js";

export default {
  name: "NewsEdit",
  data() {
    return {
      // 當前訊息ID
      currId: this.$route.params.id,
      // 當前訊息資料
      newsData: {
        id: "",
        type: "",
        title: "",
        description: "",
        content: "",
        image: "",
        publish_date: "",
        public: true,
        top: false,
      },
      // 訊息類別清單
      newsTypeList: NewsType.getOptions(),
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
        this.getNewsData();
      }
      this.addRequiredMark();
    },
    // 取得當前餐點資料
    getNewsData() {
      this.$store.commit("set", ["globalLoading", true]);
      let url = ApiUrl.getUrl("news", "getOne") + this.currId;
      AjaxService.get(
        url,
        (successResp) => {
          if (successResp.restData) {
            let resultData = successResp.restData;
            // 處理期間限定的日期值
            let publish_date = "";
            if (resultData.publishDate) {
              publish_date = resultData.publishDate.toString();
              let Y = publish_date.substr(0, 4),
                M = publish_date.substr(4, 2),
                D = publish_date.substr(6, 2);
              publish_date = `${Y}-${M}-${D}`;
            }
            // 最終資料
            this.newsData = {
              id: resultData.id,
              type: resultData.type,
              title: resultData.title,
              description: resultData.description,
              content: resultData.content,
              image: resultData.image,
              publish_date: publish_date,
              public: resultData.public,
              top: resultData.top,
            };
            this.$store.commit("set", ["globalLoading", false]);
            console.log("查詢餐點成功!");
          }
        },
        (errorResp) => {
          console.log("查詢餐點失敗!");
          console.log(errorResp);
        }
      );
    },
    // 添加CInput、CTextarea的必填*標記
    addRequiredMark() {
      const requiredInputs = document.querySelectorAll("input[required],textarea[required],select[required]");
      console.log(requiredInputs);
      requiredInputs.forEach((element) => {
        element.parentElement.previousElementSibling.innerHTML += `<span class="text-danger">*</span>`;
      });
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
        let image = this.UploadImage != "" ? this.UploadImage : this.newsData.image;
        // FIXME 圖片上傳的內容未確定
        image = "";
        // 處理發布時間資料
        let publish_date = this.newsData.publish_date.replace(/-/g, "");
        // 最終資料
        let sendData = {
          id: this.newsData.id,
          type: this.newsData.type,
          title: this.newsData.title,
          description: this.newsData.description,
          content: this.newsData.content,
          image: image,
          publishDate: publish_date,
          public: this.newsData.public,
          top: this.newsData.top,
          updUser: "Judy",
        };

        let url = ApiUrl.getUrl("news", "save");
        console.log(sendData);
        AjaxService.post(
          url,
          sendData,
          (successResp) => {
            console.log("修改餐點類別成功!");
            this.$router.push("/mngt/news");
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
    uploadImageSelectedStr() {
      if (this.UploadImageName == "") {
        return "尚未選擇檔案";
      }
      return this.UploadImageName;
    },
    // 預覽圖片區塊的小標題
    imagePreviewTitle() {
      if (this.newsData.image && !this.UploadImage) {
        return "現有照片";
      }
      if (this.UploadImage) {
        return "上傳預覽";
      }
    },
    // 預覽圖片的src
    imagePreviewSrc() {
      // FIXME 圖檔位置待確認
      if (this.newsData.image && !this.UploadImage) {
        return this.newsData.image;
      }
      if (this.UploadImage) {
        return this.UploadImage;
      }
    },
  },
};
