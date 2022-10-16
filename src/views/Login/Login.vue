<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8" lg="7" xl="6" xxl="5">
          <CCard class="pt-2 px-5 pb-4">
            <CCardBody>
              <CForm id="loginForm" class="needs-validation">
                <div class="text-center mb-4">
                  <!-- <div class="d-flex align-items-center justify-content-center"> -->
                  <img class="logo" src="@/assets/img/logo/msita_bkstg_icon.png" />
                  <!-- <h1 class="text-dark">Ms.Ita</h1> -->
                  <!-- </div> -->
                  <h2 class="text-primary">Login</h2>
                </div>
                <CInput placeholder="Email" invalidFeedback="必填" :value.sync="acct" required addInputClasses="rounded-right">
                  <template #prepend-content><CIcon name="cil-user" /></template>
                </CInput>
                <CInput placeholder="Password" invalidFeedback="必填" type="password" :value.sync="pxd" required addInputClasses="rounded-right">
                  <template #prepend-content><CIcon name="cil-https" /></template>
                </CInput>
                <CAlert color="danger" :show="loginFail">
                  <div class="d-flex align-items-center">
                    <CIcon class="mr-3" name="cil-user-unfollow" />
                    <span>請輸入正確的帳號及密碼！</span>
                  </div>
                </CAlert>
                <CRow>
                  <CCol col="6" class="mt-2 text-left">
                    <CButton color="link" class="px-0" v-c-tooltip="{ content: '在下面哦!', placement: 'bottom' }">Forgot password?</CButton>
                  </CCol>
                  <CCol col="6" class="text-right">
                    <CButton color="primary" class="px-4" @click="login()">Login</CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
          <div class="d-flex flex-column text-center text-primary">
            <span>帳號：juyu@gmail.com</span>
            <span class="mb-2">密碼：yu60441</span>
            <span>練習用網站，不為商業所用，如有侵權敬請告知</span>
            <span>Ms.Ita © 2022</span>
          </div>
        </CCol>
      </CRow>
    </CContainer>

    <div class="footer w-100 d-flex justify-content-around text-primary">
      <!-- <div class="d-flex flex-column">
      </div> -->
    </div>
    <CElementCover v-if="$store.state.globalLoading" :opacity="0.8" />
  </div>
</template>
<script src="./Login.js"></script>
<style lang="scss" scoped>
.logo {
  width: 30%;
  margin-bottom: 5px;
  // margin-right: 15px;
}

.footer {
  position: fixed;
  bottom: 0;
  height: 100px;
  // border-top: rgb(210, 210, 210) 1px solid;
}
</style>
