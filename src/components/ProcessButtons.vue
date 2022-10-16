<template>
  <CButtonToolbar justify>
    <IconButton color="warning" size="sm" icon="cil-pencil" :to="editTo" class="text-white my-1 mr-2">編輯</IconButton>
    <IconButton color="danger" size="sm" icon="cil-trash" @clickFn="del()" class="text-white my-1 mr-2">刪除</IconButton>
  </CButtonToolbar>
</template>

<script>
import ApiUrl from "@/const/apiUrl.js";
import AjaxService from "@/services/ajaxService.js";

export default {
  name: "ProcessButtons",
  props: {
    // 是否曾經改動過
    isChange: {
      type: Boolean,
      default: false,
    },
    // 處理中項目的ID
    itemId: {
      required: true,
    },
    // 處理中項目所屬的群組
    itemGroup: {
      type: String,
      required: true,
    },
    // 編輯頁面的url
    editUrl: {
      type: String,
      default: "",
    },
    // 刪除的url
    delUrl: {
      type: String,
      default: "",
    },
    // 不可刪除的最大id
    delLockId: {
      type: Number,
      default: 0,
    },
    // 刪除的提醒說明
    delMsg: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    checkChanged() {
      if (this.isChange) {
        if (confirm("頁面內容曾修改過，尚未儲存修改的變更將會捨棄！\n是否確定要執行？")) {
          // 確定執行(會重新query)
          return true;
        }
        return false;
      }
      // 未曾修改=>確定執行(會重新query)
      return true;
    },
    // 刪除的按鈕 先檢查是否修改過才執行 (編輯的按鈕是以beforeRouteLeave來檢查是否修改過，不須另寫)
    del() {
      const id = Number(this.itemId);
      if (id <= this.delLockId) {
        // demo用的預設資料，不可刪除
        alert("此為前台DEMO用的預設資料，不可刪除！\n如需測試功能，請先新增再進行測試。");
      } else if (confirm(this.delAlertStr)) {
        if (this.checkChanged()) {
          this.$store.commit("set", ["globalLoading", true]);
          let url_base = this.delUrl == "" ? ApiUrl.getUrl(this.itemGroup, "delete") : this.delUrl;
          AjaxService.delete(
            url_base + id,
            (successResp) => {
              this.$store.commit("set", ["globalLoading", false]);
              console.log("刪除成功!");
              this.$emit("reloadFn");
            },
            (errorResp) => {
              console.log("刪除失敗!");
              console.log(errorResp);
            }
          );
        }
      }
    },
  },
  computed: {
    delAlertStr() {
      return this.delMsg + "是否確定要刪除？\n***** 請注意！刪除後無法復原！*****";
    },
    editTo() {
      let url_base = this.editUrl == "" ? ApiUrl.getUrl(this.itemGroup, "edit") : this.editUrl;
      return url_base + this.itemId;
    },
  },
};
</script>

<style lang="scss" scoped></style>
