// for handling api requests
class AjaxHandler {
  constructor() {

  }

  // 取得課程列表
  getClasses(teacher_id = false, cat_id = false, order_column = 'updated_at', order_type = 'desc', offset = 0) {
    var data = {
      offset: offset,
      order_column: order_column,
      order_type: order_type,
      class_id: null,
      teacher_id: teacher_id,
      class_catalog_id: cat_id
    };

    return postRequest('https://test7api.baodao7.com/web/classes/list', data);
  }

  // 取得該集資料
  getLession(id) {
    return postRequest('https://test7api.baodao7.com/web/classes', {
      id: id
    });
  }

  // 取得所有集數資料
  // param class_id: 需求課程之id *必填*
  getLessions(class_id, order_column = id, order_type = 'desc', offset = 0) {
    var data = {
      class_id: class_id,
      order_column: order_column,
      order_type: order_type,
      offset: offset,
    };

    return postRequest('https://test7api.baodao7.com/web/class_details/list', data);
  }

  // 取得該集資料
  getLession(id) {
    return postRequest('https://test7api.baodao7.com/web/class_details', {
      id: id
    });
  }

  // 取得老師資料
  getTeacher(id) {
    return postRequest('https://test7api.baodao7.com/web/teacher', {
      id: id
    });
  }

  // request to api
  private postRequest(url, data) {
    return fetch(url, {
      body: Json.stringify(data),
      cache: 'no-cache',
      method: 'POST'
    }).then(reponse => response.json()).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ', error.message);
    });
  }

}