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
  computed: {
    version() {
      return process.env.VUE_APP_VERSION;
    },
  },
  methods: {
    // 登入
    login() {
      // 先還原
      this.loginFail = false;
      const form = document.querySelector("#loginForm");
      if (form.checkValidity() === true) {
        this.$store.commit("set", ["globalLoading", true]);
        let loginData = {
          acct: this.acct,
          pxd: this.pxd,
        };
        AjaxService.post(
          "/server/auth",
          loginData,
          (successResp) => {
            if (successResp.restData) {
              let loginResult = successResp.restData.login;
              if (loginResult) {
                this.$store.commit("set", ["globalLoading", false]);
                console.log("登入成功");
                sessionStorage.setItem("il", true);
                this.$router.push({ name: "內容管理" });
              }
            }
          },
          (errorResp) => {
            if (errorResp.restData) {
              this.$store.commit("set", ["globalLoading", false]);
              console.log("登入失敗");
              let loginResult = errorResp.restData.login;
              this.loginFail = !loginResult;
            } else {
              console.log(errorResp);
            }
          }
        );
      }
      form.classList.add("was-validated");
    },
  },
};
