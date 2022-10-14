import ApiUrl from "@/const/apiUrl.js";
import AjaxService from "@/services/ajaxService.js";
import ProcessButtons from "@/components/ProcessButtons";

const fields = [
  { key: "title", label: "訊息標題" },
  { key: "publishDate", label: "發布日期" },
  { key: "type", label: "類別" },
  { key: "public", label: "是否公開", _style: "width:10%" },
  { key: "top", label: "是否置頂", _style: "width:10%" },
  // { key: "status", _style: "min-width:100px;" },
  {
    key: "actions",
    label: "操作",
    _style: "width:15%",
    sorter: false,
    filter: false,
  },
];

export default {
  name: "News",
  components: {
    ProcessButtons,
  },
  data() {
    return {
      // 所有訊息
      newsList: [],
      // 表格標題列
      fields,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getNewsList();
    },
    // 取得所有訊息
    getNewsList() {
      this.$store.commit("set", ["globalLoading", true]);
      let url = ApiUrl.getUrl("news", "getAll");
      AjaxService.get(
        url,
        (successResp) => {
          if (successResp.restData) {
            let resultList = successResp.restData;
            // 處理發布日期的日期值
            this.newsList = resultList.map((item) => {
              let publish_date = item.publishDate.toString();
              let Y = publish_date.substr(0, 4),
                M = publish_date.substr(4, 2),
                D = publish_date.substr(6, 2);
              item.publishDate = `${Y}-${M}-${D}`;

              return item;
            });
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
    //
    getBadge(type) {
      switch (type) {
        case "活動":
          return "info";
        case "公告":
          return "primary";
        default:
          "light";
      }
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
  },
  computed: {
    website() {
      return `${process.env.VUE_APP_WEBSITE}/news`;
    },
  },
};
