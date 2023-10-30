const TaskModel = require('../models/Task')();

module.exports.getTasks = async (req, res) => {
    const tasks = await TaskModel.findAll();
    let result = tasks.map(task => task.dataValues);
    res.json(result);
}

module.exports.saveTask = async (req, res) => {
    TaskModel.create({
        title: req.body.title,
        isDone: req.body.isDone
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => console.log(err))
}

module.exports.updateTask = async (req, res) => {
    const {task_id, title} = req.body;
    TaskModel.update(
        { title: title },
        { where: { task_id: task_id } }
    )
    .then(() => {
        res.set(201).send("Updated");
    })
    .catch(err => console.log(err))
}

module.exports.deleteTask = async (req, res) => {
    const {task_id} = req.body;
    TaskModel.destroy(
        { where: { task_id: task_id } }
    )
    .then(() => {
        res.set(201).send("Deleted");
    })
    .catch(err => console.log(err))
}

module.exports.isDoneTask = async (req, res) => {
    const {task_id, isDone} = req.body;
    TaskModel.update(
        { isDone: isDone },
        { where: { task_id: task_id } }
    )
    .then(() => {
        res.set(201).send("toggle isDone");
    })
    .catch(err => console.log(err))
}