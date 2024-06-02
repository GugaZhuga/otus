function getTask(request, response){
    response.status(200).send("Get task");
}
function getTasks(request, response){
    response.status(200).send("Get tasks");
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