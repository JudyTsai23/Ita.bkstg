import Axios from "axios";

const CLASS_NAME = "[AjaxService] ";

function changeUrl(url) {
  let mode = process.env.NODE_ENV;
  // 判斷執行模式為測試還是正式
  if (mode === "development") {
    // 若為測試環境則直接回傳
    return url;
  } else {
    // 若為正式則修改為正式的後端網址
    return url.replace("/server", "http://joyu.libra-tw.org:8080/ita/");
  }
}

const AjaxService = {
  // post request 傳參數
  post(url, param, successCallBack, failCallBack) {
    // 轉換 url
    url = changeUrl(url);

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
    // 轉換 url
    url = changeUrl(url);

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
    // 轉換 url
    url = changeUrl(url);

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
    // 轉換 url
    url = changeUrl(url);

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
