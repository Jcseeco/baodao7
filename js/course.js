class CourseHandler {
  var courses = new AjaxHandler();

  // get information needed to show in box
  // return json array or false if none found
  getClasses(cat_id = false) {
    var response = courses.getClass(cat_id);
    var ret_array = []; // array of json data of course info
    if (response.success && response.data.length > 0) {
      var data = response.data;
      for (let i = 0; i < data.length; i++) {
        var id = data[i].id;
        var title = data[i].name;
        var thumbnail = data[i].picture_filename;
        var teacher_pic = getTeacher(data[i].class_catalog_id).profile_pic;
        var lession_total = classLength(id);

        ret_array.push({
          id: id,
          title: title,
          thumbnail: thumbnail,
          teacher_pic: teacher_pic,
          lession_total: lession_total
        });
      }

      return ret_array;
    }

    return false;
  }

  // 取得老師資訊
  getTeacher(cat_id) {
    var response = courses.getTeacher(cat_id);
    if (response.success && response.data.length > 0) {
      var data = response.data[0];

      var name = data.name;
      var profile_pic = data.picture_filename;
      var info = data.info;

      return {
        name: name,
        profile_pic: profile_pic,
        info: info
      };
    }

    return false;
  }

  // 取得課程集數
  classLength(class_id) {
    var response = courses.getLessions(class_id);
    if (response.success && response.data.length > 0) {
      return reponse.total;
    }

    return false;
  }

}