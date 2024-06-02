function getUser(request, response){
    response.status(200).send("Get user");
}
function getUsers(request, response){
    response.status(200).send("Get users");
}
function addUser(request, response){
    response.status(200).send("Add user");
}
function removeUser(request, response){
    response.status(200).send("Remove user");
}
function editUser(request, response){
    response.status(200).send("Edit user");
}
function editUserTask(request, response){
    response.status(200).send("Edit user task");
}
module.exports = {
    getUsers,
    getUser,
    addUser,
    removeUser,
    editUser,
    editUserTask
}