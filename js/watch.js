"use strict";

function watch() {
  return {
    ajax: new AjaxHandler(),
    class_id: null,
    lesson_id: null, // 當前分集id
    video_url: "",
    lesson_title: null, // 當前分集標題
    lesson_description: null, // 當前分集說明
    lesson_price: null, // 當前分集價格
    class_price: null, // 整體課程價格
    lessons: [], // 所有分集資料
    init() {
      const queryString = location.search;
      const urlParams = new URLSearchParams(queryString);
      // set class if url has class_id
      (urlParams.has('class_id')) ? this.setClass(urlParams.get('class_id')): null;

    },
    setClass(id) {
      this.class_id = id;
      this.setLessons(id);
    },
    async setLessons(class_id) {
      var lessons = await this.ajax.getLessons(class_id).then(data => {
        var ret_array = [];
        for (var i in data) {
          var id = data[i].id;
          var title = data[i].info;
          var price = Math.round(data[i].price_market);

          ret_array.push({
            id: id,
            title: title,
            price: price
          });
        }
        return ret_array;
      });
      this.lessons = lessons;
      this.setLesson(lessons[0].id);
      this.setPrice(class_id);
    },
    async setLesson(id) {
      var data = await this.ajax.getLesson(id);
      this.lesson_id = data.id;
      this.lesson_title = data.title;
      this.lesson_description = data.info;
      this.lesson_price = Math.round(data.price_market);
      if (this.lesson_price === 0) {
        var date_ym = data.updated_at.split("-")[0] + "_" + data.updated_at.split("-")[1];
        this.video_url = "https://image.baodao7.com/upload/" + date_ym + "/" + data.filename;
      } else {
        this.video_url = "";
      }

    },
    async setPrice(class_id) {
      var data = await this.ajax.getClass(class_id);
      this.class_price = Math.round(data.price_market);
    },
    validateLesson(id) {
      return fetch('php/lessonValidate.php', {
        body: JSON.stringify({
          id: id
        }),
        method: 'POST'
      }).then(response => response.text()).catch(function(error) {
        console.log('There has been a problem: ', error.message);
      });
    }
  };
}