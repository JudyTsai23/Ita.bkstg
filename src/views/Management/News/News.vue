<template>
  <CCard>
    <CCardHeader class="h5 font-weight-bold">
      <CIcon name="cil-bullhorn" class="mt-0" />
      訊息管理
    </CCardHeader>

    <CCardBody>
      <CDataTable
        :items="newsList"
        :fields="fields"
        table-filter
        items-per-page-select
        :items-per-page="10"
        :noItemsView="{ noResults: '無符合的項目', noItems: '尚無任何訊息' }"
        :tableFilter="{ label: '尋找：', placeholder: '輸入關鍵字...' }"
        :itemsPerPageSelect="{ label: '每頁顯示筆數：' }"
        striped
        hover
        sorter
        pagination
      >
        <!-- 是否公開 -->
        <template #public="{ item }">
          <td>
            <CBadge v-if="item.public" color="success" class="label-badge">公開</CBadge>
            <CBadge v-else color="light" class="label-badge">隱藏</CBadge>
          </td>
        </template>
        <!-- 是否置頂 -->
        <template #top="{ item }">
          <td>
            <CBadge v-if="item.top" color="danger" class="label-badge">置頂</CBadge>
          </td>
        </template>
        <!-- 操作按鈕 -->
        <template #actions="{ item }">
          <td class="py-2">
            <ProcessButtons :item-id="item.id" item-group="news" edit-url="/mngt/news/edit/" @reloadFn="init" />
          </td>
        </template>
      </CDataTable>
    </CCardBody>

    <CCardFooter align="right">
      <CButton color="info" to="/mngt/news/create">新增訊息</CButton>
    </CCardFooter>
  </CCard>
</template>
<script src="./News.js"></script>
<style lang="scss" scoped>
.label-badge {
  font-size: 0.9em;
}
</style>
