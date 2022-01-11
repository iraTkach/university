const express = require('express');
const studentsBLL = require('../BLL/projBLL');
const gradesBLL = require('../BLL/gradesBLL');


const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const students = await studentsBLL.getAllStudents();
        res.send(students);
    } catch (error) {
        res.send(error);
    }
})

// Get By Id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const student = await studentsBLL.getStudentById(id);
        res.send(student)
    } catch (error) {
        res.send(error);
    }
})

router.post('/', async (req, res) => {
    try {
        
        const student = req.body;
        const result = await studentsBLL.addStudent(student);
        res.send(result)
    } catch (error) {
        res.send(error);
    }
})

// update student
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const student = req.body;
        const result = await studentsBLL.updateStudent(id, student);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
})

// delete student
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        // deleting grades of student first
        const grade = await gradesBLL.deleteAllGrades(id).then(data => console.log(data)).catch(err => console.log(err));

        const result = await studentsBLL.deleteStudent(id);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;