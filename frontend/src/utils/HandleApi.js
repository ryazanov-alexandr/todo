import axios from 'axios';

const baseUrl = "http://localhost:5000";

const getAllTasks = (setTasks) => {
    axios.get(baseUrl)
    .then(data => {
        setTasks(data.data);
    })
}

const addTask = (title, setTitle, setTasks, tasks) => {
    axios.post(`${baseUrl}/save`, {title: title, isDone: 0})
    .then((data) => {
        setTitle("");
        setTasks([...tasks, {
            task_id: data.data.task_id,
            title: title,
            isDone: 0
        }]);
    })
}

const updateTask = (task_id, title, setTitle, setTasks, setIsUpdating, tasks) => {
    axios.post(`${baseUrl}/update`, {task_id, title})
        .then(() => {
            setTitle("");
            setIsUpdating(false);
            tasks.forEach(task => {
                if(task.task_id === task_id) {
                    task.title = title; 
                }
            })
            setTasks(tasks);
        })
        .catch(err => console.log(err))
}

const deleteTask = (task_id, setTasks, tasks) => {
    axios.post(`${baseUrl}/delete`, { task_id })
        .then(() => {
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].task_id === task_id) {
                    tasks.splice(i, 1); 
                    break;
                }
            } 
            setTasks([...tasks]);
        })
        .catch(err => console.log(err))
}

const toggleIsDoneTask = (task_id, isDone) => {
    axios.post(`${baseUrl}/done`, {task_id, isDone})
    .then()
    .catch(err => console.log(err))
}

export {
    getAllTasks, 
    addTask,
    updateTask,
    deleteTask,
    toggleIsDoneTask
}