"use strict";

function watch() {
  return {
    ajax: new AjaxHandler(),
    client: new Client(),
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
        let lessonMap = new Map();
        let index = 1; // entry of the lesson object in Map
        for (let lesson of data) {
          let id = lesson.id;
          let title = lesson.title;
          let info = lesson.info;
          let price = Math.round(lesson.price_market);
          let obj = {
            index: index,
            id: id,
            title: title,
            info: info,
            price: price
          };
          lessonMap.set(id, obj);
          index++;
        }
        return lessonMap;
      });
      this.lessons = lessons;
      this.setLesson(lessons.values().next().value.id);
      this.setPrice(class_id);
    },
    async setLesson(id) {
      let lesson = this.lessons.get(id);
      this.lesson_id = lesson.id;
      this.lesson_title = lesson.title;
      this.lesson_description = lesson.info;
      this.lesson_price = lesson.price;

      let record = await this.client.verifyPurchase([id]);
      if (record && record[0].purchased) {
        var data = await this.ajax.getLesson(id);
        var date_ym = data.updated_at.split("-")[0] + "_" + data.updated_at.split("-")[1];
        this.video_url = "https://image.baodao7.com/upload/" + date_ym + "/" + data.filename;
      } else {
        this.video_url = "";
        return null;
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