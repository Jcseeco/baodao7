class Course {
  ajax = new AjaxHandler();

  boxInfo = []; // stores array of courseBox object
  boxStatus = false; // determinds whether courseBoxes is ready to use
  // get information needed to show in box
  // return json array or false if none found
  getClasses(cat_id = false) {
    var response = this.ajax.getClasses(cat_id);

    var boxes = [];
    var that = this;
    response.then(data => {
      for (var i in data) {
        var courseBox = new CourseBox(data[i].id);
        courseBox.cat_id = data[i].cat_id;
        courseBox.title = data[i].title;
        courseBox.thumbnail_url = data[i].thumbnail_url;
        courseBox.teacher_id = data[i].teacher_id;
        courseBox.updated_at = data[i].updated_at;
        this.setTeacherUrl(courseBox);
        this.setTotal(courseBox);

        boxes.push(courseBox);
      }
    }).then(() => {
      that.boxInfo = boxes;
      that.boxStatus = !that.boxStatus;
      // this.showBoxes();
    });

  }

  // showBoxes() {
  //   var sec = $("#box-sec");
  //   var box = $('#box-template').clone();
  //
  // }

  // 取得該課程教師圖片網址
  setTeacherUrl(course) {
    this.ajax.getTeacher(Number(course.cat_id)).then(data => {
      course.teacher_url = data[0].picture_url;
    });
  }

  // 取得該課程的集數
  setTotal(course) {
    this.ajax.getTotal(Number(course.id)).then(total => {
      course.total = total;
    });
  }

  // 取得老師資訊
  getTeacher(cat_id) {
    var response = this.ajax.getTeacher(cat_id);
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
    var response = this.ajax.getLessions(class_id);
    if (response.success && response.data.length > 0) {
      return reponse.total;
    }

    return false;
  }

}

class CourseBox {
  id = null;
  title = "";
  thumbnail_url = "";
  teacher_id = "";
  teacher_url = "";
  total = 0;
  updated_at = "";

  constructor(class_id) {
    this.id = class_id;
  }

}