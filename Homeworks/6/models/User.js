class User {
    constructor(
        id,
        name,
        taskIds = null
    ){
        this.id = id;
        this.name = name;
        this.taskIds = taskIds;
    }
}
module.exports = {
    User
};