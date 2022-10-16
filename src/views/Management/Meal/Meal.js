import ApiUrl from "@/const/apiUrl.js";
import AjaxService from "@/services/ajaxService.js";
import draggable from "vuedraggable";
import ProcessButtons from "@/components/ProcessButtons";

export default {
  name: "Meal",
  components: {
    draggable,
    ProcessButtons,
  },
  data() {
    return {
      // demo用的預設資料(餐點的id為小於2211010000000的)
      delLockMealId: 2211010000000,
      // 當前餐點類別ID
      currCateId: this.$route.query.cate,
      // 當前餐點類別slug
      currCateSlug: "",
      // 所有餐點類別 (id和中文名稱)
      mealCateList: [],
      // 當前類別的所有餐點
      mealList: [],
      // 是否曾經改動過
      changed: false,
    };
  },
  beforeRouteLeave(to, from, next) {
    if (this.checkChanged()) {
      next();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getMealCateList();
    },
    // 取得所有餐點類別，並取得目前類別的所有餐點(執行getMealList)
    getMealCateList() {
      this.$store.commit("set", ["globalLoading", true]);
      let url = ApiUrl.getUrl("mealCate", "getAll");
      AjaxService.get(
        url,
        (successResp) => {
          if (successResp.restData) {
            let resultList = successResp.restData;
            // 所有餐點類別資料
            this.mealCateList = resultList.map((item) => {
              let cate = {
                id: item.id,
                name_zh: item.zhName,
                slug: item.name,
              };
              return cate;
            });
            console.log("查詢餐點類別成功!");

            // 是否有需要顯示的類別，若無則顯示第一個類別
            if (!this.currCateId) {
              this.currCateId = this.mealCateList[0].id;
            }
            this.currCateChanged(this.currCateId);
            this.$store.commit("set", ["globalLoading", false]);
          }
        },
        (errorResp) => {
          console.log("查詢餐點類別失敗!");
          console.log(errorResp);
        }
      );
    },
    // 取得當前類別的所有餐點
    getMealList() {
      this.$store.commit("set", ["globalLoading", true]);
      let url = ApiUrl.getUrl("meal", "getAll") + this.currCateId;
      AjaxService.get(
        url,
        (successResp) => {
          if (successResp.restData) {
            this.mealList = successResp.restData;
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
    // 處理期間限定的日期值
    limitDateFormat(date) {
      let limit_date = date.toString();
      let Y = limit_date.substr(0, 4),
        M = limit_date.substr(4, 2),
        D = limit_date.substr(6, 2);
      return `${Y}.${M}.${D}`;
    },
    // 切換餐點類別
    currCateChanged(id) {
      this.currCateId = id;
      // 當前餐點類別的slug
      let currCate = this.mealCateList.find((item) => item.id == id);
      this.currCateSlug = currCate.slug;

      this.getMealList();
      this.$router.replace("/mngt/meal?cate=" + id);
    },
    // 檢查頁面內容是否曾修改過
    checkChanged() {
      if (this.changed) {
        if (confirm("頁面內容曾修改過，尚未儲存修改的變更將會捨棄！\n是否確定要執行？")) {
          // 確定執行(會重新query)
          return true;
        }
        return false;
      }
      // 未曾修改=>確定執行(會重新query)
      return true;
    },
    // 前往新增餐點
    addMeal() {
      if (this.checkChanged()) {
        this.$router.push("/mngt/meal/create?cate=" + this.currCateId);
      }
    },
    // 送出排序資料儲存
    saveSort() {
      this.$store.commit("set", ["globalLoading", true]);
      let sortData = [];
      this.mealList.forEach((subCute) => {
        subCute.meals.forEach((item, idx) => {
          sortData.push({
            id: item.id,
            sort: idx + 1,
          });
        });
      });
      let url = ApiUrl.getUrl("meal", "saveSort");
      AjaxService.put(
        url,
        sortData,
        (successResp) => {
          this.$store.commit("set", ["globalLoading", false]);
          console.log("修改餐點排序成功!");
          this.changed = false;
          this.getMealList();
        },
        (errorResp) => {
          console.log("修改餐點排序失敗!");
          console.log(errorResp);
        }
      );
    },
  },
  computed: {
    website() {
      return `${process.env.VUE_APP_WEBSITE}/menu/${this.currCateSlug}`;
    },
  },
};
