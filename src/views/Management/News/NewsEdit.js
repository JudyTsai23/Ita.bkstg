import ApiUrl from "@/const/apiUrl.js";
import AjaxService from "@/services/ajaxService.js";
import NewsType from "@/const/newsType.js";
import ImageInput from "@/components/ImageInput";

export default {
  name: "NewsEdit",
  components: {
    ImageInput,
  },
  data() {
    return {
      // demo用的預設資料(訊息的id為小於2211010000000的)
      delLockNewsId: 2211010000000,
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
    // 取得當前訊息資料
    getNewsData() {
      this.$store.commit("set", ["globalLoading", true]);
      let url = ApiUrl.getUrl("news", "getOne") + this.currId;
      AjaxService.get(
        url,
        (successResp) => {
          if (successResp.restData) {
            let resultData = successResp.restData;
            // 處理發布日期的日期值
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
            console.log("查詢訊息成功!");
          }
        },
        (errorResp) => {
          console.log("查詢訊息失敗!");
          console.log(errorResp);
        }
      );
    },
    // 添加CInput、CTextarea的必填*標記
    addRequiredMark() {
      const requiredInputs = document.querySelectorAll("input[required]:not([type='file']),textarea[required],select[required]");
      requiredInputs.forEach((element) => {
        element.parentElement.previousElementSibling.innerHTML += `<span class="text-danger">*</span>`;
      });
    },
    // 送出資料儲存
    save() {
      const form = document.querySelector("#updateForm");
      form.classList.add("was-validated");
      if (form.checkValidity() === true) {
        this.$store.commit("set", ["globalLoading", true]);
        // 處理圖片資料
        let image = this.UploadImage != "" ? this.UploadImage : this.newsData.image;
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
        };
        let url = ApiUrl.getUrl("news", "save");
        AjaxService.post(
          url,
          sendData,
          (successResp) => {
            this.$store.commit("set", ["globalLoading", false]);
            console.log("修改訊息成功!");
            this.$router.push("/mngt/news");
          },
          (errorResp) => {
            console.log("修改訊息失敗!");
            console.log(errorResp);
          }
        );
      } else {
        document.querySelector("input:invalid,select:invalid,textarea:invalid").focus();
      }
    },
    del() {
      const id = Number(this.newsData.id);
      if (id <= this.delLockNewsId) {
        // demo用的預設資料，不可刪除
        alert("此為前台DEMO用的預設資料，不可刪除！");
      } else if (confirm("是否確定要刪除？\n***** 請注意！刪除後無法復原！*****")) {
        this.$store.commit("set", ["globalLoading", true]);
        let url_base = ApiUrl.getUrl("news", "delete");
        AjaxService.delete(
          url_base + id,
          (successResp) => {
            this.$store.commit("set", ["globalLoading", false]);
            console.log("刪除成功!");
            this.$router.push("/mngt/news");
          },
          (errorResp) => {
            console.log("刪除失敗!");
            console.log(errorResp);
          }
        );
      }
    },
  },
};
