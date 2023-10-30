const {Router} = require('express');
const { getTasks, saveTask, updateTask, deleteTask, isDoneTask } = require('../controller/TaskController');

const router = Router();

//router.get('/', getTask);
router.get('/', getTasks);
router.post('/save', saveTask);
router.post('/update', updateTask);
router.post('/delete', deleteTask);
router.post('/done', isDoneTask);

module.exports = router;