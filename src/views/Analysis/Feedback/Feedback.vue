<template>
  <div>
    <CCard>
      <CCardHeader class="h5 font-weight-bold">
        <CIcon name="cil-bar-chart" class="mt-0" />
        意見回饋總數量
      </CCardHeader>
      <CCardBody>
        <h5 class="ml-4 pl-2 font-weight-bold">總數量：{{ totalCount }}</h5>
        <CChartBar class="bar-chart" labels="months" :datasets="barDatasets" :options="{ maintainAspectRatio: false }"></CChartBar>
      </CCardBody>
    </CCard>

    <CCard>
      <CCardHeader class="h5 font-weight-bold">
        <CIcon name="cil-chart-line" class="mt-0" />
        每月用餐時段數量
      </CCardHeader>
      <CCardBody>
        <CChartLine class="line-chart" labels="months" :datasets="lineDatasets" :options="{ maintainAspectRatio: false }"></CChartLine>
      </CCardBody>
    </CCard>

    <CCard>
      <CCardHeader class="h5 font-weight-bold">
        <CIcon name="cil-heart" class="mt-0" />
        顧客感受評分
      </CCardHeader>
      <CCardBody>
        <h5 class="ml-4 pl-2 font-weight-bold">平均分數：{{ avgRate }}</h5>
        <CChartDoughnut class="doughnut-chart" :labels="doughnutLabels" :datasets="doughnutDatasets" :options="{ maintainAspectRatio: false }"></CChartDoughnut>
      </CCardBody>
    </CCard>
  </div>
</template>
<script src="./Feedback.js"></script>
<style lang="scss" scoped>
.bar-chart {
  height: 380px;
}
.line-chart {
  height: 380px;
}
.doughnut-chart {
  height: 420px;
}
</style>
