// 訊息種類
const type = [
  { name: "活動", value: 0 },
  { name: "公告", value: 1 },
];

const newsType = {
  // 取得下拉選單選項清單
  getOptions() {
    return type.map((item) => {
      return { label: item.name, value: item.value };
    });
  },
  // 取得對應的種類名稱
  getTypeNameByValue(value) {
    if (value instanceof Number) {
      let type = type.find((item) => item.value === value);
      if (type) {
        return type.name;
      }
    }
    return "";
  },
  // 取得對應的種類值
  getTypeValueByName(name) {
    if (name) {
      let type = type.find((item) => item.name === name);
      if (type) {
        return type.value;
      }
    }
    return null;
  },
};

export default newsType;
