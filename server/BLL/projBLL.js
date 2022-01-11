const Student = require('../models/projModel');

// Get-All
const getAllStudents = () => {
    return new Promise((resolve, reject) => {
        Student.find({}, (err, students) => {
            if (err) {
                reject(err)
            } else {
                resolve(students)
            }
        })
    })
}

// Get By Id.
const getStudentById = (id) => {
    return new Promise((resolve, reject) => {
        Student.findById(id, (err, student) => {
            if (err) {
                reject(err)
            } else {
                resolve(student)
            }
        })
    })
}

// Create new Student
const addStudent = async (newStudent) => {
        //const numOfStudents = await Student.count({})
        //const student = new Student({...newStudent, id: numOfStudents+1});
        const student = new Student(newStudent);//{...newStudent, id: numOfStudents+1});
    
        await student.save((err) => {
          if (err) {
            console.warn(err);
          } else {
            console.info("Added successfully");
          }
        });
}

// Update an existing student
const updateStudent = (id, studentToUpdate) => {
    return new Promise((resolve, reject) => {
        Student.findByIdAndUpdate(id, studentToUpdate, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve("Updated successfully");
            }
        })
    })
}

// Delete an existing student
const deleteStudent = (id) => {
    
    return new Promise((resolve, reject) => {
        Student.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("Deleted successfully");
            }
        })
    })
}

module.exports = {
    getAllStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent
}