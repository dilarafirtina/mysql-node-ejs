const Lesson = require("../models/lesson.model.js");
const Student = require("../models/student.model.js");
var async = require('async');
const { resolveInclude } = require("ejs");



getValue = (err, data) => {
    if (err)
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving data."
        });
    else callback(null, data);
}

exports.findAll = (req, res) => {
    async.parallel([
        function (callback) {
            Lesson.getAll((err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving lessons."
                    });
                else callback(null, data);
            })
        },
        function (callback) {
            Student.getAll((err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving students."
                    });
                else callback(null, data);
            });
        },
        function (callback) {
            Lesson.getTotal((err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving students."
                    });
                else callback(null, data);
            });
        },
        function (callback) {
            Student.getTotal((err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving students."
                    });
                else callback(null, data);
            });
        },
        function (callback) {
            Lesson.getCurrentMonthTotal((err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving students."
                    });
                else callback(null, data);
            });
        },
        function (callback) {
            Lesson.getStudentLessonList((err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving students."
                    });
                else callback(null, data);
            });
        }
       
    ], function (err, results) {           
        //console.log(results[5])    
        res.render('index', { lessons: results[0], students: results[1], totalLessons: results[2][0], totalStudents: results[3][0], currentMonthLesson: results[4][0], lessonStudents:results[5] });
    });


}

