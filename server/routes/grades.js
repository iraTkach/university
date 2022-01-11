const express = require('express');
const gradesBLL = require('../BLL/gradesBLL');
const router = express.Router();

router.get('/student/:student_id', async (req, res) => {
    try {
        const student_id = req.params.student_id;
        const grades = await gradesBLL.getAllGrades(student_id);
        res.send(grades);
    } catch (error) {
        res.send(error);
    }
})

// Get By Id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const grade = await gradesBLL.getGradeById(id);
        res.send(grade)
    } catch (error) {
        res.send(error);
    }
})

router.post('/', async (req, res) => {
    try {
        // option 1 - destructuring
        // let { name, model, color, hp } = req.body;
        // name = "mazda"
        // const grade = {
        //     name,
        //     model,
        //     color,
        //     hp
        // }
        // option 2
        const grade = req.body;
        const result = await gradesBLL.addGrade(grade);
        res.send(result)
    } catch (error) {
        res.send(error);
    }
})


// update grade
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const grade = req.body;
        const result = gradesBLL.updateGrade(id, grade);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
})

// delete grade
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await gradesBLL.deleteGrade(id);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;