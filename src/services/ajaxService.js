import Axios from "axios";

const CLASS_NAME = "[AjaxService] ";

const AjaxService = {
  // post request 傳參數
  post(url, param, successCallBack, failCallBack) {
    Axios.post(url, param, {})
      .then((resp) => {
        // 傳送完成，判斷 appCode
        let appCode = resp.data.appCode;
        if (isSuccessResponse(appCode)) {
          // 若為成功
          if (successCallBack) {
            successCallBack(resp.data);
            console.log(CLASS_NAME + "post success!");
          }
        } else {
          // 否為失敗
          if (failCallBack) {
            failCallBack(resp.data);
            console.log(CLASS_NAME + "post error!");
          }
        }
      })
      .catch((resp) => {
        // 傳送失敗
        console.log(CLASS_NAME + "post fail!");
        console.log(resp);
        if (failCallBack) {
          failCallBack(resp);
        }
      });
  },
  // get request
  get(url, successCallBack, failCallBack) {
    Axios.get(url, {})
      .then((resp) => {
        // 傳送完成，判斷 appCode
        let appCode = resp.data.appCode;
        if (isSuccessResponse(appCode)) {
          // 若為成功
          if (successCallBack) {
            successCallBack(resp.data);
            console.log(CLASS_NAME + "get success!");
          }
        } else {
          // 否為失敗
          if (failCallBack) {
            failCallBack(resp.data);
            console.log(CLASS_NAME + "get error!");
          }
        }
      })
      .catch((resp) => {
        // 傳送失敗
        console.log(CLASS_NAME + "get fail!");
        console.log(resp);
        if (failCallBack) {
          failCallBack(resp);
        }
      });
  },
  // put request 傳參數
  put(url, param, successCallBack, failCallBack) {
    Axios.put(url, param, {})
      .then((resp) => {
        // 傳送完成，判斷 appCode
        let appCode = resp.data.appCode;
        if (isSuccessResponse(appCode)) {
          // 若為成功
          if (successCallBack) {
            successCallBack(resp.data);
            console.log(CLASS_NAME + "put success!");
          }
        } else {
          // 否為失敗
          if (failCallBack) {
            failCallBack(resp.data);
            console.log(CLASS_NAME + "put error!");
          }
        }
      })
      .catch((resp) => {
        // 傳送失敗
        console.log(CLASS_NAME + "put fail!");
        console.log(resp);
        if (failCallBack) {
          failCallBack(resp);
        }
      });
  },
  // delete request
  delete(url, successCallBack, failCallBack) {
    Axios.delete(url, {})
      .then((resp) => {
        // 傳送完成，判斷 appCode
        let appCode = resp.data.appCode;
        if (isSuccessResponse(appCode)) {
          // 若為成功
          if (successCallBack) {
            successCallBack(resp.data);
            console.log(CLASS_NAME + "delete success!");
          }
        } else {
          // 否為失敗
          if (failCallBack) {
            failCallBack(resp.data);
            console.log(CLASS_NAME + "delete error!");
          }
        }
      })
      .catch((resp) => {
        // 傳送失敗
        console.log(CLASS_NAME + "delete fail!");
        console.log(resp);
        if (failCallBack) {
          failCallBack(resp);
        }
      });
  },
};
function isSuccessResponse(appCode) {
  if (appCode.includes("SUCCESS") || appCode === "AUTH_001") {
    return true;
  }
  return false;
}
export default AjaxService;
