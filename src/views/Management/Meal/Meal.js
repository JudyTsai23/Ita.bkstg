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
                id: item.id,
                name_zh: item.zhName,
              };
              return cate;
            });
            console.log("查詢餐點類別成功!");
            this.currCateId = this.mealCateList[0].id;
            this.getMealList();
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
      let url = ApiUrl.getUrl("meal", "getAll") + this.currCateId;
      AjaxService.get(
        url,
        (successResp) => {
          if (successResp.restData) {
            this.mealList = successResp.restData;
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
      console.log(sortData);
      let url = ApiUrl.getUrl("meal", "saveSort");
      AjaxService.put(
        url,
        sortData,
        (successResp) => {
          console.log("修改餐點排序成功!");
          window.location.reload();
        },
        (errorResp) => {
          console.log("修改餐點排序失敗!");
          console.log(errorResp);
        }
      );
    },
  },
};
