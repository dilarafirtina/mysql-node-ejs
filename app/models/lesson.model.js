const sql = require("./db.js");

// constructor
const Lesson = function (lesson) {
  this.BOOK = lesson.BOOK;
  this.CURRENCY = lesson.CURRENCY;
  this.HOMEWORK = lesson.HOMEWORK;
  this.IS_HOMEWORK_SENT = lesson.IS_HOMEWORK_SENT;
  this.LESSON_DATE = lesson.LESSON_DATE;
  this.LESSON_NAME = lesson.LESSON_NAME;
  this.LESSON_SUMMARY = lesson.LESSON_SUMMARY;
  this.LESSON_TIME = lesson.LESSON_TIME;
  this.LESSON_TYPE = lesson.LESSON_TYPE;
  this.NEXT_LESSON_PLAN = lesson.NEXT_LESSON_PLAN;
  this.PLATFORM = lesson.PLATFORM;
  this.PRICE = lesson.PRICE;
  this.SOFTWARE = lesson.SOFTWARE;
  this.STUDENTID = lesson.STUDENTID;
};

Lesson.create = (newLesson, result) => {
  sql.query("INSERT INTO LESSON SET ?", newLesson, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created lesson: ", { id: res.insertId, ...newLesson });
    result(null, { id: res.insertId, ...newLesson });
  });
};

Lesson.findById = (lessonId, result) => {
  sql.query(`SELECT * FROM LESSON WHERE ID = ${lessonId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found lesson: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Lesson with the id
    result({ kind: "not_found" }, null);
  });
};

Lesson.getAll = result => {
  sql.query("SELECT * FROM LESSON", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }    //console.log("lessons: ", res);
    result(null, res);
  });
};

Lesson.updateById = (id, lesson, result) => {
  sql.query(
    "UPDATE LESSON SET BOOK ?, CURRENCY = ?, HOMEWORK = ?, IS_HOMEWORK_SENT = ?, LESSON_DATE = ?, LESSON_NAME = ?, LESSON_SUMMARY = ?,  LESSON_TIME = ?, LESSON_TYPE = ?, NEXT_LESSON_PLAN = ?,  PLATFORM = ?, PRICE = ?, SOFTWARE = ?, STUDENTID = ? WHERE ID = ?",
    [lesson.BOOK, lesson.CURRENCY, lesson.HOMEWORK, lesson.IS_HOMEWORK_SENT, lesson.LESSON_DATE, lesson.LESSON_NAME, lesson.LESSON_SUMMARY, lesson.LESSON_TIME, lesson.LESSON_TYPE, lesson.NEXT_LESSON_PLAN, lesson.PLATFORM, lesson.PRICE, lesson.SOFTWARE, lesson.STUDENTID, id],(err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Lesson with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated lesson: ", { id: id, ...lesson });
      result(null, { id: id, ...lesson });
    }
  );
};

Lesson.remove = (id, result) => {
  sql.query("DELETE FROM LESSON WHERE ID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Lesson with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted lesson with id: ", id);
    result(null, res);
  });
};

Lesson.removeAll = result => {
  sql.query("DELETE FROM LESSON", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} lessons`);
    result(null, res);
  });
};

Lesson.getTotal = result => {
  sql.query("SELECT COUNT(ID)  AS NumberOfLessons FROM LESSON", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }    //console.log("lessons: ", res);
    result(null, res);
  });
};

Lesson.getCurrentMonthTotal = result => {
  sql.query("SELECT LESSON_DATE, COUNT(ID) AS MonthNumberOfLessons FROM LESSON WHERE MONTH(LESSON_DATE)=MONTH(NOW()) and YEAR(LESSON_DATE) = YEAR(NOW())", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }    //console.log("lessons: ", res);
    result(null, res);
  });
};

Lesson.getStudentLessonList = result => {
  sql.query("SELECT LESSON.LESSON_DATE AS LessonDate, STUDENT.NAME as Name, STUDENT.SKYPEID as SkypeID FROM LESSON INNER JOIN STUDENT ON LESSON.STUDENTID = STUDENT.ID WHERE STUDENT.ACTIVE = 1", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }    //console.log("lessons: ", res);
    result(null, res);
  });
};








module.exports = Lesson;