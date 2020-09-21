const sql = require("./db.js");

// constructor
const Student = function(student) {
  this.NAME = student.NAME;
  this.COUNTRY = student.COUNTRY;
  this.LANGUAGES = student.LANGUAGES;
  this.NATIONALITY = student.NATIONALITY;
  this.BIRTHDAY = student.BIRTHDAY;
  this.TEXT = student.TEXT;
  this.STARTDATE = student.STARTDATE;
  this.CITY = student.CITY;
  this.STARTING_LEVEL = student.STARTING_LEVEL;
  this.CURRENT_LEVEL = student.CURRENT_LEVEL;
  this.SKYPEID = student.SKYPEID;
  this.PHONE = student.PHONE;
  this.ACTIVE = student.ACTIVE;
};

Student.create = (newStudent, result) => {
  sql.query("INSERT INTO STUDENT SET ?", newStudent, (err, res) => {
    if (err) {
      console.log("error: ", err);
        result(err, null);
      return;
    }

    console.log("created student: ", { id: res.insertId, ...newStudent });
    result(null, { id: res.insertId, ...newStudent });
  });
};

Student.findById = (studentId, result) => {
  sql.query(`SELECT * FROM STUDENT WHERE ID = ${studentId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found student: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Student with the id
    result({ kind: "not_found" }, null);
  });
};

Student.getAll = result => {
  sql.query("SELECT * FROM STUDENT", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("students: ", res);
    result(null, res);
  });
};

Student.updateById = (id, student, result) => {
  sql.query(
    "UPDATE STUDENT SET COUNTRY = ?, LANGUAGES = ?, NATIONALITY = ?, BIRTHDAY = ?, TEXT = ?, STARTDATE = ?,  CITY = ?, STARTING_LEVEL = ?, CURRENT_LEVEL = ?,  SKYPEID = ?, PHONE = ?, ACTIVE = ? WHERE ID = ?",
    [student.COUNTRY, student.LANGUAGES, student.NATIONALITY, student.BIRTHDAY, student.TEXT, student.STARTDATE, student.CITY,  student.STARTING_LEVEL, student.CURRENT_LEVEL, student.SKYPEID, student.PHONE, student.ACTIVE, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Student with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated student: ", { id: id, ...student });
      result(null, { id: id, ...student });
    }
  );
};

Student.remove = (id, result) => {
  sql.query("DELETE FROM STUDENT WHERE ID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Student with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted student with id: ", id);
    result(null, res);
  });
};

Student.removeAll = result => {
  sql.query("DELETE FROM STUDENT", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} students`);
    result(null, res);
  });
};

Student.getTotal = result => {
  sql.query("SELECT COUNT(ID)  AS NumberOfStudents FROM STUDENT WHERE ACTIVE = 1", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }    //console.log("lessons: ", res);
    result(null, res);
  });
};


module.exports = Student;