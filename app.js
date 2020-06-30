const express = require("express");
const bodyParser = require("body-parser");
const ToDoAPIController = require(__dirname + "/controllers/ToDoAPIController")
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/taskListDB", { useFindAndModify: false });



const app = express();
app.use(express.static(__dirname + "/public"));
app.use("/api/items", bodyParser.json());
/*app.use("/api/items/:id", (req, res, next) => {
    req.id = Number(req.params.id);
    next();
});*/

app.route("/api/items")
    .get(ToDoAPIController.getAll)
    .post(ToDoAPIController.post)
    .delete(ToDoAPIController.deleteAll);

app.route("/api/items/:id")
    .get(ToDoAPIController.get)
    .put(ToDoAPIController.put)
    .patch(ToDoAPIController.patch)
    .delete(ToDoAPIController.delete);

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    if (err == 400) {
        res.status(400);
        res.send("Bad Request");
    } else {
        res.status(500);
        res.send("Internal Server Error");
    }
});

app.use((req, res) => {
    res.status(404);
    res.send("Not Found");
});

app.listen(3000);

