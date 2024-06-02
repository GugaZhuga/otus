class Task {
    constructor(
        id,
        name,
        tags,
        difficultyLevel,
        inputDataExample,
        outputDataExample,
        userId
    ) {
        this.id = id;
        this.name = name;
        this.tags = tags;
        this.difficultyLevel = difficultyLevel;
        this.inputDataExample = inputDataExample;
        this.outputDataExample = outputDataExample;
        this.userId = userId;
    }
};
module.exports = {
    Task
};