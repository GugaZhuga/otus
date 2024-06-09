const { User } = require("../models/User");

const users = [
    new User(1, "User 1", [1]),
    new User(2, "User 2", [2]),
]
function getUser(request, response) {
    const user = users.find(x => x.id === parseInt(request.params.id));
    response.status(200).send(JSON.stringify(user));
}
function getUsers(request, response) {
    response.status(200).send(JSON.stringify(users));
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