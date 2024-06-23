const express = require("express");
const app = express();
const userRouter = require("./routers/userRouter.js");
const taskRouter = require("./routers/taskRouter.js");
app.use("/users", userRouter);
app.use("/tasks", taskRouter);
app.use(function(request, response, next) {
    response.status(404).send("Not found");
});
app.listen(3000, () => console.log("Run"));