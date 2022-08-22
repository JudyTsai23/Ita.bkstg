// 訊息種類
const api = {
  meal: {
    getAll: "/server/menu/meals/", //+餐點類別ID
    getOne: "/server/menu/meal/", //+ID
    save: "/server/menu/save",
    saveSort: "/server/menu",
    delete: "/server/menu/", //+ID
  },
  mealCate: {
    getAll: "/server/mealCate/cate",
    getAllSub: "/server/mealCate/sub",
    getOne: "/server/mealCate/", //+ID
    save: "/server/mealCate/save",
    saveSort: "/server/mealCate",
    delete: "/server/mealCate/", //+ID
    deleteSub: "/server/mealCate/sub/", //+餐點子類別ID
  },
};
const apiUrl = {
  // 取得對應的種類名稱
  getUrl(group, action) {
    if (group || action) {
      let value = api[group][action];
      return value !== undefined ? value : null;
    }
    return null;
  },
};

export default apiUrl;
