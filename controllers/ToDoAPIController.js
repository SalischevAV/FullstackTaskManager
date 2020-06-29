const ToDoList = require("../Model/ToDoList");
const Item = require("../Model/Item");


const tdl = new ToDoList();
//let qwe1 = new Item("qwe1", "2027-10-23");
//let qwe2 = new Item("qwe2", "2026-11-23");
let qwe3 = new Item("qwe3", "2025-12-20");
let qwe4 = new Item("qwe4", "2044-10-23");
let qwe5 = new Item("qwe5", "2030-03-23");
let qwe6 = new Item("qwe6", "2022-02-23");
qwe3.complete();
qwe6.complete();


//tdl.addItem(qwe1);
//tdl.addItem(qwe2);
tdl.addItem(qwe3);
tdl.addItem(qwe4);
tdl.addItem(qwe5);
tdl.addItem(qwe6);


//tdl.sortByDate();
//console.log(tdl.has(20));

module.exports.getAll = (req, res) => {
    switch (req.query.sortBy) {
        case "date":
            tdl.sortByDate();
            res.json(tdl.items);
            break;
        case "state":
            tdl.sortByState();
            res.json(tdl.items);
            break;
        case "complete":
            res.json(tdl.filterByComplete());
            console.log(tdl.filterByComplete())
            break;
        case "uncomplete":
            res.json(tdl.filterByUnComplete());
            break;
        default:
            res.json(tdl.items);
            break;
    }

};

module.exports.deleteAll = (req, res, next) =>{
    tdl.clear();
    res.json(tdl.items);
}

module.exports.get = (req, res, next) => {
    if (tdl.has(req.id)) {
        res.json(tdl.getItemById(req.id));
    } else {
        next();
    }
};

module.exports.post = (req, res, next) => {
    let item = new Item(req.body.text, req.body.expirationDate);
    tdl.addItem(item);
    res.status(201);
    res.set("Location", `${req.baseUrl}/${item.id}`);
    res.json(item);
};

module.exports.put = (req, res, next) => {
    if (tdl.has(req.id)) {
        let item = tdl.getItemById(req.id);
        item.text = req.body.text;
        item.expirationDate = req.body.expirationDate;
        if (req.body.isComplete == "true") {
            item.complete();
        } else { 
            item.unComplete();
        }
        res.json(item);
    } else {
        next();
    }
};

module.exports.patch = (req, res, next) => {
    if (tdl.has(req.id)) {
        let item = tdl.getItemById(req.id);
        if (req.body.isComplete == "true") {
            item.unComplete();
        } else { 
            item.complete();
        }
        res.json(item);
    } else {
        next();
    }
};

module.exports.delete = (req, res, next) => {
    if (tdl.has(req.id)) {
        tdl.removeItemById(req.id);
        res.end();
    } else {
        next();
    }
};


