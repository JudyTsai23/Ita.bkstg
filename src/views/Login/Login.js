import AjaxService from "@/services/ajaxService.js";

export default {
  name: "Login",
  data() {
    return {
      acct: "",
      pxd: "",
      loginFail: false,
    };
  },
  methods: {
    // 登入
    login() {
      const form = document.querySelector("#loginForm");
      if (form.checkValidity() === true) {
        let loginData = {
          acct: this.acct,
          pxd: this.pxd,
        };
        AjaxService.post(
          "/server/auth",
          loginData,
          (successResp) => {
            if (successResp.restData) {
              // TODO globalLoading
              let loginResult = successResp.restData.login;
              if (loginResult) {
                console.log("登入成功");
                sessionStorage.setItem("il", true);
                this.$router.push({ name: "內容管理" });
              }
            }
          },
          (errorResp) => {
            if (errorResp.restData) {
              console.log("登入失敗");
              let loginResult = errorResp.restData.login;
              this.loginFail = !loginResult;
            }
          }
        );
      }
      form.classList.add("was-validated");
    },
  },
};
