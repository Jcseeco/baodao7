"use strict";

function course() {
  return {
    ajax: new AjaxHandler(),
    boxInfo: [],
    boxTitle: "最新課程",
    searchStatus: false,
    errorMessage: "",
    titles: {
      1: "兒童教育",
      4: "大健康",
      5: "風水命理",
      6: "全球旅遊",
      7: "美業",
      8: "身心靈",
      9: "成功學",
      10: "理財",
    },
    // get information needed to show in box
    // return json array or false if none found
    getClasses: async function(cat_id = false) {
      this.boxInfo = [];
      this.searchStatus = false;
      var boxes = [];
      var data = await this.ajax.getClasses(cat_id);
      (cat_id) ? this.boxTitle = this.titles[cat_id]: this.boxTitle = "最新課程";
      for (var i in data) {
        var courseBox = new CourseBox(data[i].id);
        courseBox.cat_id = data[i].class_catalog_id;
        courseBox.title = data[i].name;
        let date_ym = data[i].created_at.split("-")[0] + "_" + data[i].created_at.split("-")[1];
        courseBox.thumbnail_url = data[i].picture_url.replace(date_ym, date_ym + "/").replace("test7image", "image");
        courseBox.teacher = data[i].teacher_info;
        let teacher_ym = courseBox.teacher.created_at.split("-")[0] + "_" + courseBox.teacher.created_at.split("-")[1];
        courseBox.teacher_url = courseBox.teacher.picture_url.replace(teacher_ym, teacher_ym + "/").replace("test7image", "image");
        courseBox.total = data[i].class_detail_count;
        courseBox.updated_at = data[i].updated_at;

        boxes.push(courseBox);
      }
      this.boxInfo = boxes;
      this.searchStatus = true;
    },
    // 取得該課程教師圖片網址
    getTeacherUrl: async function(course) {
      var data = await this.ajax.getTeacher(Number(course.cat_id));
      return data[0].picture_url;

    },
    // 取得該課程的集數
    getTotal: async function(course) {
      var total = await this.ajax.getTotal(Number(course.id));
      return total;

    },
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
    },

    scrollToResult() {
      var resultTop = document.getElementById('course-results').offsetTop;
      document.getElementById('course-sec').scrollTo(0, resultTop);
    }

  };

}