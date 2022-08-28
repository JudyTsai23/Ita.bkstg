class MenuCategory {
  constructor(dataList) {
    this.category = dataList[0];
    this.subCateList = dataList[1];
  }

  // 取得類別清單
  getCategroyList() {
    return this.category;
  }

  // 依據中文名稱取得對應的類別id
  getCategoryIdByZhName(zhName) {
    let category = this.category.find((item) => item.zhName === zhName);
    if (category) {
      return category.id;
    }
    return 0;
  }

  // 依據id取得對應的類別中文名稱
  getCategoryZhNameById(id) {
    let category = this.category.find((item) => item.id === id);
    if (category) {
      return category.zhName;
    }
    return "";
  }

  // 依據類別id取得對應的子類別清單
  getSubCategoryList(categoryId) {
    let subCategoryList = this.subCateList.find((item) => item.categoryId === categoryId);
    if (subCategoryList) {
      return subCategoryList.subCateList;
    }
    return [];
  }
}
export default MenuCategory;
