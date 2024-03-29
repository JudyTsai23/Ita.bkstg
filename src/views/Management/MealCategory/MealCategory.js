import ApiUrl from "@/const/apiUrl.js";
import AjaxService from "@/services/ajaxService.js";
import draggable from "vuedraggable";
import ProcessButtons from "@/components/ProcessButtons";

export default {
  name: "MealCategory",
  components: {
    draggable,
    ProcessButtons,
  },
  data() {
    return {
      // demo用的預設資料(類別的id到6)
      delLockCateId: 6,
      // 所有餐點類別
      mealCateList: [],
      // 所有餐點子類別
      mealSubCateList: [],
      // 當前展開的餐點類別ID
      activeCate: "",
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
      this.getMealSubCateList();
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
                id: item.id,
                name: item.name,
                name_zh: item.zhName,
                icon: item.icon,
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
            // this.mealSubCateList = successResp.restData;
            successResp.restData.forEach((item) => {
              this.mealSubCateList[item.categoryId] = item.subCateList;
            });
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
    // 取得當前餐點類別的子類別
    currSubCateList(id) {
      return this.mealSubCateList.find((item) => item.categoryId === id);
    },
    // 切換餐點類別展開的項目
    activeCateChanged(id) {
      this.activeCate = this.activeCate == id ? "" : id;
    },
    // 比對是否為當前展開的項目
    checkActiveCate(id) {
      return this.activeCate == id ? true : false;
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
    // 前往新增類別
    addCate() {
      if (this.checkChanged()) {
        this.$router.push("/mngt/meal/cate/create");
      }
    },
    // 送出排序資料儲存
    saveSort() {
      this.$store.commit("set", ["globalLoading", true]);
      let sortData = this.mealCateList.map((item, idx) => {
        let data = {
          id: item.id,
          sort: idx + 1,
        };
        return data;
      });
      let url = ApiUrl.getUrl("mealCate", "saveSort");
      AjaxService.put(
        url,
        sortData,
        (successResp) => {
          this.$store.commit("set", ["globalLoading", false]);
          console.log("修改餐點類別排序成功!");
          this.changed = false;
          this.init();
        },
        (errorResp) => {
          console.log("修改餐點類別排序失敗!");
          console.log(errorResp);
        }
      );
    },
  },
};
