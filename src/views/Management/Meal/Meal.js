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
  inject: ["reload"],
  data() {
    return {
      // 當前餐點類別ID
      currCateId: 0,
      // 所有餐點類別 (id和中文名稱)
      mealCateList: [],
      // 當前類別的所有餐點
      mealList: [],
      // 是否曾經改動過
      changed: false,
    };
  },
  watch: {
    currCateId() {
      this.getMealList();
    },
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
            this.mealCateList = resultList.map((item) => {
              let cate = {
                id: item.id,
                name_zh: item.zhName,
              };
              return cate;
            });
            console.log("查詢餐點類別成功!");
            // 是否有需要顯示的類別，若無則顯示第一個類別
            let currCate = this.$route.query.cate;
            this.currCateId = currCate ? currCate : this.mealCateList[0].id;
            this.getMealList();
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
    // 切換餐點類別
    currCateChanged(id) {
      this.currCateId = id;
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
    // 前往修改餐點類別
    editCate() {
      if (this.checkChanged()) {
        this.$router.push("/mngt/meal/cate");
      }
    },
    // 前往新增餐點
    addMeal() {
      if (this.checkChanged()) {
        this.$router.push("/mngt/meal/create");
      }
    },
    // 送出排序資料儲存
    saveSort() {
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
          console.log("修改餐點排序成功!");
          // TODO 刷新後應該要顯示同一類別
          this.reload();
        },
        (errorResp) => {
          console.log("修改餐點排序失敗!");
          console.log(errorResp);
        }
      );
    },
  },
};
