class FromHandler {



  validate(name, mail, phone, message) {
    // alert(name + ", " + mail + ", " + phone + ", " + message);
    var valid = true;

    if (name === "") {
      valid = false;
      this.showFormError("fname");
    }

    if (!this.validateEmail(mail)) {
      valid = false;
      this.showFormError("fmail");
    }
    if (!this.validatePhone(phone)) {
      valid = false;
      this.showFormError("fphone");
    }

    if (message === "") {
      valid = false;
      this.showFormError("fmessage");
    }

    (valid) ? null: alert("格式不正確!");

    return valid;
  }

  validateEmail(mail) {
    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return (mail.match(mailFormat)) ? true : false;
  }

  validatePhone(phone) {
    var phoneFormat = /^09[0-9]{8}$/;
    return (phone.match(phoneFormat)) ? true : false;
  }

  showFormError(name) {
    let mailSpan = $('#contact-form [for="' + name + '"]');
    mailSpan.removeClass('bg-text-blue');
    mailSpan.addClass('bg-red-700');
  }
}