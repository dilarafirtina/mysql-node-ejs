module.exports = app => {
    const lesson = require("../controllers/lesson.controller.js");
  
    // Create a new Student
    app.post("/lesson", lesson.create);
  
    // Retrieve all Student
    app.get("/lesson", lesson.findAll);
  
    // Retrieve a single Student with lessonId
    app.get("/lesson/:lessonId", lesson.findOne);
  
    // Update a Student with lessonid
    app.put("/lesson/:lessonId", lesson.update);
  
    // Delete a Student with lessonid
    app.delete("/lesson/:lessonId", lesson.delete);
  
    // Delete all Students
    app.delete("/lesson", lesson.deleteAll);
  };