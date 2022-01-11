const Grade = require('../models/gradesModel');

// Get All Grates for Student
const getAllGrades = (student_id) => {
    return new Promise((resolve, reject) => {
        Grade.find({student_id}, (err, grades) => {
            if (err) {
                reject(err)
            } else {
                resolve(grades)
            }
        })
    })
}

// Get By Id.
const getGradeById = (id) => {
    return new Promise((resolve, reject) => {
        Grade.findById(id, (err, grade) => {
            if (err) {
                reject(err)
            } else {
                resolve(grade)
            }
        })
    })
}

// Create new Grade
const addGrade = async (newGrade) => {
        //const numOfGrades = await Grade.count({})
        //const grade = new Grade({...newGrade, id: numOfGrades+1});
        const grade = new Grade(newGrade);//{...newGrade, id: numOfGrades+1});
    
        await grade.save((err) => {
          if (err) {
            console.warn(err);
          } else {
            console.info("Added successfully");
          }
        });
}

// Update an existing grade
const updateGrade = (id, gradeToUpdate) => {
    return new Promise((resolve, reject) => {
        Grade.findByIdAndUpdate(id, gradeToUpdate, (err, grade) => {
            if (err) {
                reject(err)
            } else {        
                //resolve(grade)
                //console.log(grade);                
                resolve("Updated successfully");
            }
        })
    })
}

// Delete all grade by student id
const deleteAllGrades = (student_id) => {
    return new Promise((resolve, reject) => {
        Grade.deleteMany({student_id}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("Deleted successfully");
            }
        })
    })
}

// Delete an existing grade
const deleteGrade = (id) => {
    return new Promise((resolve, reject) => {
        Grade.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("Deleted successfully");
            }
        })
    })
}
//deleteAllGrades('61d9f11e9c068954727e9911').then(data => console.log(data)).catch(err => console.log(err));

module.exports = {
    getAllGrades,
    getGradeById,
    addGrade,
    updateGrade,
    deleteGrade,
    deleteAllGrades
}