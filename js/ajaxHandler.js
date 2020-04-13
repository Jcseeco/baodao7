// for handling api requests
class AjaxHandler {
  constructor() {
    this.classesUrl = "https://test7api.baodao7.com/web/classes/list";
    this.classUrl = "https://test7api.baodao7.com/web/classes";
    this.lessionsUrl = "https://test7api.baodao7.com/web/class_details/list";
    this.lessionUrl = "https://test7api.baodao7.com/web/class_details";
    this.teachersUrl = "https://test7api.baodao7.com/web/teacher/list";
  }

  // 取得課程列表
  async getClasses(cat_id = false, teacher_id = false, order_column = 'updated_at', order_type = 'desc', offset = 0) {
    var data = {
      offset: offset,
      order_column: order_column,
      order_type: order_type,
      class_id: null,
      teacher_id: teacher_id,
      class_catalog_id: cat_id
    };

    var ret_array = [];
    // var courseBoxes = this.courseBoxes;
    await this.postRequest(this.classesUrl, data).then(response => {
      var data = response.data;
      for (var i = 0; i < data.length; i++) {
        var id = data[i].id;
        var title = data[i].name;
        var date_ym = data[i].created_at.split("-")[0] + data[i].created_at.split("-")[1];
        var thumbnail_url = "https://image.baodao7.com/upload/" + date_ym + "/" + data[i].picture_filename;
        var updated_at = data[i].updated_at;
        var teacher_id = data[i].teacher_id;
        var cat_id = data[i].class_catalog_id;

        ret_array.push({
          id: id,
          cat_id: cat_id,
          title: title,
          thumbnail_url: thumbnail_url,
          teacher_id: teacher_id,
          updated_at: updated_at
        });
      }
    })

    return ret_array;
  }

  // 取得該課程資料
  getClass(id) {
    var ret_array = [];

    this.postRequest(this.classUrl, {
      id: id
    }).then(response => {
      var data = response.data;
      for (var i = 0; i < data.length; i++) {
        // console.log(data[i].id);
        var id = data[i].id;
        var title = data[i].name;
        var content = data[i].content;
        var teacher_id = data[i].teacher_id;
        var updated_at = data[i].updated_at;
        var price = Number(data[i].price_market);

        ret_array.push({
          id: id,
          title: title,
          content: content,
          teacher_id: teacher_id,
          updated_at: updated_at,
          price: price
        });
      }
    });

    return ret_array;
  }

  // 取得所有集數資料
  // param class_id: 需求課程之id *必填*
  getLessons(class_id, order_column = id, order_type = 'desc', offset = 0) {
    var data = {
      class_id: class_id,
      order_column: order_column,
      order_type: order_type,
      offset: offset
    };

    var ret_array = [];
    this.postRequest(this.lessionsUrl, data).then(response => {
      var data = response.data;
      for (var i = 0; i < data.length; i++) {
        // console.log(data[i].id);
        var id = data[i].id;
        var title = data[i].info;
        var content = data[i].content;

        ret_array.push({
          id: id,
          title: title,
          content: content,
        });
      }
    });

    return ret_array;
  }

  async getTotal(class_id) {
    var data = {
      class_id: class_id,
    };

    var total = null;
    await this.postRequest(this.lessionsUrl, data).then(response => {
      total = response.total;
    });

    return total;
  }

  // 取得該集資料
  getLesson(id) {
    var ret_array = [];
    this.postRequest(this.lessionUrl, {
      id: id
    }).then(response => {
      var data = response.data;
      for (var i = 0; i < data.length; i++) {
        // console.log(data[i].id);
        var id = data[i].id;
        var title = data[i].info;
        var content = data[i].content;
        var filename = data[i].filename;
        var updated_at = data[i].updated_at;
        var price_market = data[i].price_market;

        ret_array.push({
          id: id,
          title: title,
          content: content,
          filename: filename,
          updated_at: updated_at,
          price_market: price_market
        });
      }
    });

    return ret_array;
  }

  // 取得老師資料
  async getTeacher(cat_id) {
    var ret_array = [];

    await this.postRequest(this.teachersUrl, {
      class_catalog_id: cat_id
    }).then(response => {
      var data = response.data;
      for (var i = 0; i < data.length; i++) {
        var id = data[i].id;
        var name = data[i].name;
        var date_ym = data[i].created_at.split("-")[0] + data[i].created_at.split("-")[1];
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
  }

  // request to api
  postRequest(url, data) {
    return fetch(url, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    }).then(response => response.json()).catch(function(error) {
      console.log('There has been a problem: ', error.message);
    });
  }

}