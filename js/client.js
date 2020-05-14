function Client() {

  // returns object containing: 1. whether success or not 2. a message to show
  this.login = async function(user, pass) {
    var tk = new TokenHandler();

    let data = JSON.stringify({
      username: user,
      password: pass
    });

    let headerOptions = {
      'content-type': 'application/json'
    };
    let response = await tk.ajax('https://api.baodao7.com/v1/account/login', headerOptions, data);

    // error handling
    if (!response) return {
      success: false,
      msg: '請求異常!'
    };
    if (!response.success) return {
      success: false,
      msg: response.msg
    };

    // if success
    tk.storeToken(response.data["Access-Token"]);
    return {
      success: true,
      msg: "登入成功!"
    };
  }

  this.checkLogin = function() {
    var tk = new TokenHandler();
    return (tk.verifyToken()) ? true : false;
  }

  //
  this.logout = function() {
    var tk = new TokenHandler();

    let accessToken = tk.getToken();
    if (!accessToken) return;
    let header = {
      'content-type': 'application/json',
      'Access-Token': accessToken
    };
    tk.ajax('https://api.baodao7.com/v1/account/logout', header, {});
    tk.clearToken();
  }

  // return null when ajax failed
  this.verifyPurchase = async function(lessons) {
    var tk = new TokenHandler();

    let header = {
      'content-type': 'application/x-www-form-urlencoded'
    };
    // set header according to token
    // let accessToken = tk.getToken();
    let accessToken = "be39d275203a10f3d30cb26828799af7";
    if (accessToken) {
      header["Access-Token"] = accessToken;
    }

    // search data
    let urlencoded = new URLSearchParams();
    for (const id of lessons) {
      urlencoded.append("class_detail_id[]", "" + id);
    }

    let response = await tk.ajax('https://api.baodao7.com/v1/trade/classes/purchased', header, urlencoded);

    if (!response.success) return null;
    return response.data;
  }
}