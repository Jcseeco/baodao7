function watch() {
  return {
    ajax: new AjaxHandler(),
    class_id: null,
    lesson_id: null, // 當前分集id
    lesson_title: null, // 當前分集標題
    lesson_description: null, // 當前分集說明
    lesson_price: 123, // 當前分集價格
    class_price: null, // 整體課程價格
    lessons: [], // 所有分集資料
    init() {},
    setClass(id) {
      this.class_id = id;
      this.setLessons(id);
      this.lesson_title = "test";
    },
    async setLessons(class_id) {
      var lessons = await this.ajax.getLessons(class_id).then(data => {
        var ret_array = [];
        for (var i in data) {
          var id = data[i].id;
          var title = data[i].info;

          ret_array.push({
            id: id,
            title: title
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
    },
    async setPrice(class_id) {
      var data = await this.ajax.getClass(class_id);
      this.class_price = Math.round(data.price_market);
    },
  };
}