"use strict";
var FormHandler = /*#__PURE__*/ function() {
  function FormHandler() {
    _classCallCheck(this, FormHandler);
  }

  _createClass(FormHandler, [{
    key: "validate",
    value: function validate(name, mail, phone, message) {
      var valid = true;

      if (name === "") {
        valid = false;
        this.showFormError("fname");
      } else
        this.showFormCorrect("fname");

      if (!this.validateEmail(mail)) {
        valid = false;
        this.showFormError("fmail");
      } else
        this.showFormCorrect("fmail");

      if (!this.validatePhone(phone)) {
        valid = false;
        this.showFormError("fphone");
      } else
        this.showFormCorrect("fphone")

      if (message === "") {
        valid = false;
        this.showFormError("fmessage");
      } else
        this.showFormCorrect("fmessage")

      valid ? null : alert("格式不正確!");
      return valid;
    }
  }, {
    key: "validateEmail",
    value: function validateEmail(mail) {
      var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return mail.match(mailFormat) ? true : false;
    }
  }, {
    key: "validatePhone",
    value: function validatePhone(phone) {
      var phoneFormat = /^09[0-9]{8}$/;
      return phone.match(phoneFormat) ? true : false;
    }
  }, {
    key: "showFormError",
    value: function showFormError(name) {
      var mailSpan = $('#contact-form [for="' + name + '"]');
      mailSpan.removeClass('bg-text-blue');
      mailSpan.addClass('bg-red-700');
    }
  }, {
    key: "showFormCorrect",
    value: function showFormCorrect(name) {
      var mailSpan = $('#contact-form [for="' + name + '"]');
      mailSpan.removeClass('bg-red-700');
      mailSpan.addClass('bg-text-blue');
    }
  }]);

  return FormHandler;
}();