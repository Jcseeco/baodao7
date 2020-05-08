"use strict"; // for handling api requests

function _instanceof(left, right) {
  if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var AjaxHandler = /*#__PURE__*/ function() {
  function AjaxHandler() {
    _classCallCheck(this, AjaxHandler);

    this.classesUrl = "https://api.baodao7.com/web/classes/info";
    this.classUrl = "https://api.baodao7.com/web/classes";
    this.lessionsUrl = "https://api.baodao7.com/web/class_details/list";
    this.lessionUrl = "https://api.baodao7.com/web/class_details";
    this.teachersUrl = "https://api.baodao7.com/web/teacher/list";
  } // 取得課程列表


  _createClass(AjaxHandler, [{
    key: "getClasses",
    value: async function getClasses() {
      var cat_id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var teacher_id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var order_column = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'created_at';
      var order_type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'desc';
      var offset = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var data = {
        offset: offset,
        order_column: order_column,
        order_type: order_type,
        class_id: null,
        teacher_id: teacher_id,
        class_catalog_id: cat_id
      };
      var response = await this.postRequest(this.classesUrl, data);
      return response.data;
    } // 取得該課程資料

  }, {
    key: "getClass",
    value: async function getClass(id) {
      var response = await this.postRequest(this.classUrl, {
        id: id
      });
      return response.data;
    } // 取得所有集數資料
    // param class_id: 需求課程之id *必填*

  }, {
    key: "getLessons",
    value: async function getLessons(class_id) {
      var order_column = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
      var order_type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'asc';
      var offset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 12;
      var data = {
        class_id: class_id,
        order_column: order_column,
        order_type: order_type,
        offset: offset
      };
      var response = await this.postRequest(this.lessionsUrl, data);
      return response.data;
    }
  }, {
    key: "getTotal",
    value: async function getTotal(class_id) {
      var data = {
        class_id: class_id
      };
      var total = null;
      await this.postRequest(this.lessionsUrl, data).then(function(response) {
        total = response.total;
      });
      return total;
    } // 取得該集資料

  }, {
    key: "getLesson",
    value: async function getLesson(id) {
      var response = await this.postRequest(this.lessionUrl, {
        id: id
      });
      return response.data;
    } // 取得老師資料

  }, {
    key: "getTeacher",
    value: async function getTeacher(cat_id) {
      var ret_array = [];
      await this.postRequest(this.teachersUrl, {
        class_catalog_id: cat_id
      }).then(function(response) {
        var data = response.data;

        for (var i = 0; i < data.length; i++) {
          var id = data[i].id;
          var name = data[i].name;
          var date_ym = data[i].created_at.split("-")[0] + "_" + data[i].created_at.split("-")[1];
          var picture_url = "https://image.baodao7.com/upload/" + date_ym + "/" + data[i].picture_filename;
          var info = data[i].info;
          ret_array.push({
            id: id,
            name: name,
            picture_url: picture_url,
            info: info
          });
        }
      });
      return ret_array;
    } // request to api

  }, {
    key: "postRequest",
    value: function postRequest(url, data) {
      return fetch(url, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
      }).then(function(response) {
        return response.json();
      }).catch(function(error) {
        console.log('There has been a problem: ', error.message);
      });
    }
  }]);

  return AjaxHandler;
}();