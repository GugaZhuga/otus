const { Task } = require("../models/Task");

const tasks = [
    new Task(1, "Task1", [], "Level 1", {}, {}, 1),
    new Task(2, "Task2", [], "Level 2", {}, {}, 2),
];
function getTask(request, response) {
    const task = tasks.find(x => x.id === parseInt(request.params.id));
    response.status(200).send(JSON.stringify(task));
}
function getTasks(request, response) {
    response.status(200).send(JSON.stringify(tasks));
}
function addTask(request, response){
    response.status(200).send("Add task");
}
function removeTask(request, response){
    response.status(200).send("Remove task");
}
function editTask(request, response){
    response.status(200).send("Edit task");
}
function editTaskUser(request, response){
    response.status(200).send("Edit user task");
}
module.exports = {
    getTasks,
    getTask,
    addTask,
    removeTask,
    editTask,
    editTaskUser
}