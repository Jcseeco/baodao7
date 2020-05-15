function loginHandler() {
  return {
    client: new Client(),
    formShown: false,
    logged_in: false,
    success: false,
    error: false,
    msg: "",
    checkLogin() {
      this.logged_in = this.client.checkLogin();
    },
    // return username if exist in local storage
    getLocalUser() {
      let user = localStorage.getItem("username");
      return (user === null) ? false : user;
    },
    getLoginUrl() {
      let tk = new TokenHandler();

      return "https://baodao7.com/user/login?accesstoken=" + tk.getToken();
    },
    async login() {
      let user = $("#login_username").val();
      user = user.replace(/[^\w]/gi, ''); // filter string
      let pass = $("#login_password").val();
      pass = pass.replace(/[\*\/\\]/gi, ''); // filter string

      let response = await this.client.login(user, pass);
      if (this.analyzeResponse(response)) {
        // store username to local storage if checked
        console.log($("#login_remember").data('checked'));
        if ($("#login_remember").data('checked'))
          this.storeUser(user);
        else
          this.clearUser();

        this.logged_in = this.client.checkLogin(); // double check if logged in
        setTimeout(function() {
          location.reload();
        }, 200);

      } else {
        $("#login_username").val(user);
      }
    },
    logout() {
      this.client.logout();
      location.reload();
    },
    // update status of login active_section
    // return true if sucessfully logged in
    analyzeResponse(response) {
      if (response.success) {
        this.success = true;
        this.error = false;
      } else {
        this.success = false;
        this.error = true;
      }
      this.msg = response.msg;
      return response.success;
    },
    // store username to localstorage
    storeUser(user) {
      localStorage.setItem('username', user);
    },
    // clear username from localstorage
    clearUser() {
      localStorage.removeItem('username');
    }

  };
}