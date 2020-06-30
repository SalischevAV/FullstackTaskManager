const Item = require("../model/Item");

module.exports.getAll = (req, res) => {
    switch (req.query.sortBy) {
        case "date":
            Item.find().sort({expirationDate: 1}).exec((err, data) =>{
                if(data) {
                    res.json(data);
                } else {
                    res.send(err);
                }
            });
            break;
        case "state":
            Item.find().sort({isComplete: 1}).exec((err, data) =>{
                if(data) {
                    res.json(data);
                } else {
                    res.send(err);
                }
            });
            break;
        case "complete":
            Item.find({isComplete: true}, (err, data) =>{
                if(data){
                    console.log(data);
                    res.json(data);
                } else {
                    res.send(err);
                }
            }); 
            break;
        case "uncomplete":
            Item.find({isComplete: false}, (err, data) =>{
                if(data){
                    res.json(data);
                } else {
                    res.send(err);
                }
            }); 
            break;
        default:
            Item.find({}, (err, data) =>{
                if(data){
                    res.json(data);
                } else {
                    res.send(err);
                }
            });           
            break;
    }

};

module.exports.get = (req, res, next) => {
    Item.findById(req.params.id, (err, item) =>{
        if(item){
            res.json(item);
        } else {
            next();
        }
    });
};




module.exports.post = (req, res, next) => {
    Item.create(
        {
            text: req.body.text,
            expirationDate: req.body.expirationDate
        }, (err, item, next) =>{
            if(err){
                console.log(err);
                res.status(400);
            } else {
                res.status(201);
                res.set("Location", `${req.baseUrl}/${item.id}`);
                res.json(item); 
            }
        });
    
    
};

module.exports.put = (req, res, next) => {
    Item.findByIdAndUpdate(req.params.id, 
        {
            text: req.body.text,
            expirationDate: req.body.expirationDate,
            isComplete: req.body.isComplete,
        },
        {new: true},
        (err, updateItem, next) =>{
            if(updateItem){
                res.json(updateItem);
            } else {
                next();
            }
        }
    
    )};

module.exports.patch = (req, res, next) => {
    if(req.body.isComplete == "true"){
        isComplitValue = "false";
    } else{
        isComplitValue = "true";
    }
    Item.findByIdAndUpdate(req.params.id, 
        {
            isComplete: isComplitValue
        },
        {new: true},
        (err, updateItem, next) =>{
            if(updateItem){
                res.json(updateItem);
            } else if (err){
                next(400);
            } else {
                next();
            }
        }
    
    )};

module.exports.delete = (req, res, next) => {
    Item.findByIdAndDelete(req.params.id, (err, deletedItem) =>{
        if(deletedItem){
            res.end();
        } else {
        next();
    }
});
};

module.exports.deleteAll = (req, res, next) =>{
    Item.remove({}, (err, result) =>{
        if(err){
            next();
        } else{
            res.json(null);
        }
    });
};

