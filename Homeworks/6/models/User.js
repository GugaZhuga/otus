class User {
    constructor(
        id,
        name,
        tasks = null
    ){
        this.id = id;
        this.name = name;
        this.tasks = tasks;
    }
}
module.exports = {
    User
};