<template>
  <CButtonToolbar justify>
    <IconButton color="warning" size="sm" icon="cil-pencil" @clickFn="edit()" class="text-white mr-2">編輯</IconButton>
    <IconButton color="danger" size="sm" icon="cil-trash" @clickFn="del()" class="text-white mr-2">刪除</IconButton>
  </CButtonToolbar>
</template>

<script>
import AjaxService from '@/services/ajaxService.js';

export default {
  name: 'ProcessButtons',
  props: {
    // 是否曾經改動過
    isChange: {
      type: Boolean,
      default: false,
    },
    // 編輯頁面的url
    editUrl: {
      type: String,
    },
    // 刪除的url
    delUrl: {
      type: String,
    },
    // 刪除的提醒說明
    delMsg: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
  methods: {
    checkChanged() {
      if (this.isChange) {
        if (confirm('頁面內容曾修改過，尚未儲存修改的變更將會捨棄！\n是否確定要離開此頁面？')) {
          // 確定離開
          return true;
        }
        return false;
      }
      // 未曾修改=>確定離開
      return true;
    },
    edit() {
      if (this.checkChanged()) {
        this.$router.push(this.editUrl);
      }
    },
    del() {
      if (confirm(this.delAlertStr)) {
        if (this.checkChanged()) {
          AjaxService.delete(
            this.delUrl,
            (successResp) => {
              if (successResp.restData) {
                window.location.reload();
              }
            },
            (errorResp) => {
              console.log('刪除餐點類別失敗!');
              console.log(errorResp);
            }
          );
        }
      }
    },
  },
  computed: {
    delAlertStr() {
      return this.delMsg + '是否確定要刪除？';
    },
  },
};
</script>

<style lang="scss" scoped></style>
