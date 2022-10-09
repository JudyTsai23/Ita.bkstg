import AjaxService from "@/services/ajaxService.js";

export default {
  name: "Feedback",
  data() {
    return {
      // 總回饋數量 bar chart
      totalCount: 0,
      barDatasets: [],

      // 時段數量 line chart
      lineDatasets: [],

      // 顧客評分 doughnut chart
      doughnutLabels: ["1分", "2分", "3分", "4分", "5分"],
      avgRate: 0,
      doughnutDatasets: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$store.commit("set", ["globalLoading", true]);

      this.getTotalCount()
        .then(this.getPeriodCount)
        .then(this.getCustRating)
        .then(this.$store.commit("set", ["globalLoading", false]))
        .catch((error) => console.log(error));
    },

    // 取得總數量
    getTotalCount() {
      return new Promise((resolve, reject) => {
        AjaxService.get(
          "/server/feedback",
          (successResp) => {
            if (successResp.restData) {
              let restData = successResp.restData;
              this.totalCount = restData.totalCount;
              let data = restData.countList.map((item) => item.count);
              this.barDatasets.push({
                label: "回饋數量",
                data: data,
                backgroundColor: "#cce0bb",
                borderColor: "#548c50",
                borderWidth: 1,
              });

              console.log("查詢總回饋數量成功!");
              resolve(true);
            }
          },
          (errorResp) => {
            console.log("查詢總回饋數量失敗!");
            reject(errorResp);
          }
        );
      });
    },

    // 取得用餐時段數量
    getPeriodCount() {
      return new Promise((resolve, reject) => {
        AjaxService.get(
          "/server/feedback/period",
          (successResp) => {
            if (successResp.restData) {
              let restData = successResp.restData;
              let lunchList = restData.lunchList.map((item) => item.count);
              let dinnerList = restData.dinnerList.map((item) => item.count);
              this.lineDatasets.push(
                {
                  label: "中午時段",
                  data: lunchList,
                  fill: false,
                  borderColor: "#43a3cc",
                  tension: 0.3,
                },
                {
                  label: "晚上時段",
                  data: dinnerList,
                  fill: false,
                  borderColor: "#f7ba59",
                  tension: 0.3,
                }
              );

              console.log("查詢用餐時段數量成功!");
              resolve(true);
            }
          },
          (errorResp) => {
            console.log("查詢用餐時段數量失敗!");
            reject(errorResp);
          }
        );
      });
    },

    // 取得顧客感受評分
    getCustRating() {
      return new Promise((resolve, reject) => {
        AjaxService.get(
          "/server/feedback/rating",
          (successResp) => {
            if (successResp.restData) {
              let restData = successResp.restData;
              this.avgRate = restData.avgRate;
              let data = restData.ratingList.map((item) => item.count);
              this.doughnutDatasets.push({
                label: "分數",
                data: data,
                backgroundColor: ["#ced0c6", "#fcefd8", "#cce0bb", "#cdbbcc", "#fabcb8"],
                hoverOffset: 30,
              });

              console.log("查詢顧客感受評分成功!");
              resolve(true);
            }
          },
          (errorResp) => {
            console.log("查詢顧客感受評分失敗!");
            reject(errorResp);
          }
        );
      });
    },
  },
};
