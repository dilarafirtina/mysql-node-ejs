module.exports = app => {
    const student = require("../controllers/student.controller.js");
  
    // Create a new Student
    app.post("/student", student.create);
  
    // Retrieve all Student
    app.get("/student", student.findAll);
  
    // Retrieve a single Student with studentId
    app.get("/student/:studentId", student.findOne);
  
    // Update a Student with studentid
    app.put("/student/:studentId", student.update);
  
    // Delete a Student with studentid
    app.delete("/student/:studentId", student.delete);
  
    // Delete all Students
    app.delete("/student", student.deleteAll);
  };