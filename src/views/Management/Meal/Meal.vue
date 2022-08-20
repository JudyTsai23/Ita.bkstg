<template>
  <CCard>
    <CCardHeader class="h5 font-weight-bold">
      <CIcon name="cil-restaurant" />
      餐點管理
    </CCardHeader>

    <CCardBody>
      <!-- 餐點類別標籤 -->
      <ul class="nav nav-tabs mb-3">
        <li class="nav-item" v-for="cate in mealCateList" :key="cate.id" :active="currCateId == cate.id">
          <a href="#" class="nav-link" :class="{ active: currCateId == cate.id }" @click.prevent="currCateChanged(cate.id)">{{ cate.name_zh }}</a>
        </li>
        <IconButton color="dark" variant="outline" size="sm" icon="cil-pencil" @clickFn="editCate()" class="align-self-center ml-3 py-0">修改類別</IconButton>
      </ul>
      <!-- 提醒訊息 -->
      <CAlert color="info" closeButton>
        如需更換餐點所屬的子類別，請點擊該餐點的
        <span class="border border-dark rounded px-1">編輯</span>
        按鈕前往頁面進行修改
      </CAlert>
      <!-- 各個餐點子類別 -->
      <div v-for="subCate in mealList" :key="`subCate${subCate.subCateId}`">
        <p class="h4 font-weight-bold mt-4">
          {{ subCate.subCateName }}
        </p>
        <!-- 餐點子類別中的餐點列表 -->
        <draggable tag="ul" :list="subCate.meals" handle=".move-icon" :animation="200" @change="changed = true" class="list-unstyled px-4">
          <transition-group name="flip-list">
            <!-- 一項餐點 -->
            <li v-for="meal in subCate.meals" :key="meal.id" class="row align-items-center border mb-3">
              <CIcon name="cil-elevator" customClasses="move-icon border-right" />

              <div class="col text-left">{{ meal.name }}</div>

              <ProcessButtons :is-change="changed" :edit-url="`/mngt/meal/edit/${meal.id}`" :del-url="`/server/mealcate/${meal.id}`" @del-method="deleteCate(meal.id)" />
            </li>
          </transition-group>
        </draggable>
      </div>
    </CCardBody>

    <CCardFooter align="right">
      <CButton color="info" class="mr-2" @click="addMeal()">新增餐點</CButton>
      <CButton color="success" @click="saveSort()">儲存排序</CButton>
    </CCardFooter>
  </CCard>
</template>
<script src="./Meal.js"></script>
<style lang="scss" scoped></style>
