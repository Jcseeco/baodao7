function TokenHandler() {

  this.verifyToken = function() {
    let accessToken = localStorage.getItem('Access-Token');
    return (accessToken) ? accessToken : false;

  }

  this.storeToken = function(token) {
    localStorage.setItem('Access-Token', token);
  }

  this.clearToken = function() {
    localStorage.removeItem('Access-Token');
  }

  // 先檢查token狀態再回傳
  this.getToken = function() {
    let accessToken = this.verifyToken();
    if (accessToken) {
      return accessToken;
    } else {
      this.clearToken();
      return null;
    }
  }

  this.ajax = async function(url, header, data) {
    let headerOptions = {};
    Object.keys(header).map(function(key) {
      headerOptions[key] = header[key];
    });

    var requestOptions = {
      method: 'POST',
      headers: headerOptions,
      body: data,
    };

    return fetch(url, requestOptions)
      .then(response => response.json())
      .catch(error => showError(error));

  }

  this.showError = function(error) {
    console.log('error', error);
  }
}