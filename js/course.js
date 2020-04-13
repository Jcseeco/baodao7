function course() {
  return {
    ajax: new AjaxHandler(),
    boxInfo: [],
    boxStatus: false,
    // get information needed to show in box
    // return json array or false if none found
    getClasses: function(cat_id) {
      var boxes = [];
      var that = this;
      this.ajax.getClasses(cat_id).then(data => {
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
        return boxes;
      }).then((temp) => {
        this.boxInfo = temp;
        console.log(temp);
        console.log(this);
        this.boxStatus = !that.boxStatus;
      });

    },
    // 取得該課程教師圖片網址
    setTeacherUrl: function(course) {
      this.ajax.getTeacher(Number(course.cat_id)).then(data => {
        course.teacher_url = data[0].picture_url;
        console.log(course);
      });
    },
    // 取得該課程的集數
    setTotal: function(course) {
      this.ajax.getTotal(Number(course.id)).then(total => {
        course.total = total;
        console.log(course);
      });
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
    }

  };

}