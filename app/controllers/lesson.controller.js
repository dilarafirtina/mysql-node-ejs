const Lesson = require("../models/lesson.model.js");

// Create and Save a new Lesson
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
          message: "Content can not be empty!"
      });
    }

    // Create a Lesson
    const lesson = new Lesson({
        BOOK : req.body.BOOK,
        CURRENCY :  req.body.CURRENCY,
        HOMEWORK :  req.body.HOMEWORK,
        IS_HOMEWORK_SENT :  req.body.IS_HOMEWORK_SENT,
        LESSON_DATE : req.body.LESSON_DATE,
        LESSON_NAME : req.body.LESSON_NAME,
        LESSON_SUMMARY :  req.body.LESSON_SUMMARY,
        LESSON_TIME : req.body.LESSON_TIME,
        LESSON_TYPE :  req.body.LESSON_TYPE,
        NEXT_LESSON_PLAN :  req.body.NEXT_LESSON_PLAN,
        PLATFORM :  req.body.PLATFORM,
        PRICE :  req.body.PRICE,
        SOFTWARE : req.body.SOFTWARE,
        STUDENTID : req.body.STUDENTID
    });
  
    // Save Lesson in the database
    Lesson.create(lesson, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the lesson."
        });
      else res.send(data);
    });
  };

// Retrieve all Lessons from the database.
exports.findAll = (req, res) => {
    Lesson.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving lessons."
        });
      else res.send(data);
    });
  };

// Find a single Lesson with a lessonId
exports.findOne = (req, res) => {
    Lesson.findById(req.params.lessonId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Lesson with id ${req.params.lessonId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Lesson with id " + req.params.lessonId
          });
        }
      } else res.send(data);
    });
  };

// Update a Lesson identified by the lessonId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Lesson.updateById(
      req.params.lessonId,
      new Lesson(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Lesson with id ${req.params.lessonId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Lesson with id " + req.params.lessonId
            });
          }
        } else res.send(data);
      }
    );
  };
// Delete a Lesson with the specified lessonId in the request
exports.delete = (req, res) => {
    Lesson.remove(req.params.lessonId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Lesson with id ${req.params.lessonId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Lesson with id " + req.params.lessonId
          });
        }
      } else res.send({ message: `Lesson was deleted successfully!` });
    });
  };

// Delete all Lessons from the database.
exports.deleteAll = (req, res) => {
    Lesson.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all lessons."
        });
      else res.send({ message: `All Lessons were deleted successfully!` });
    });
  };