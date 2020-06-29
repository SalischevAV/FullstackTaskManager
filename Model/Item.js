const fs = require("fs");
const DateFormater = require("./DateFormater")


module.exports = class Item {
    constructor(text, dateString) {
        this._id = Item.generateID();
        this._text = text;
        this._isComplete = false;
        this._expirationDate = new Date(dateString);
       
    }

    static generateID() {
        let id = fs.readFileSync(__dirname + "/idCounter.txt");
        id++;
        fs.writeFileSync(__dirname + "/idCounter.txt", id, "utf8");
        return Number(id);

    }

    get text() {
        return this._text;
    }

    set text(string){
        this._text = string;
    }

    get isComplete(){
        return this._isComplete;
    }

    get id(){
        return this._id;
    }

    get expirationDate(){
        let res = `${this._expirationDate.getFullYear()}-${this._expirationDate.getMonth()+1}-${this._expirationDate.getDate()}`;
        return res;
    }

    set expirationDate(dateString){
        this._expirationDate = new Date(dateString);
    }

    complete(){
        this._isComplete = true;
    }

    unComplete(){
        this._isComplete = false;
    }

    toString(){

        return `ID: ${this._id}, Item text: ${this._text}, is coplete: ${this._isComplete}, expiration date: ${this.expirationDate}`;
    }

    
    toJSON(){
        return {
            id: this._id,
            text: this._text,
            expirationDate: DateFormater.format(this._expirationDate),
            isComplete: this._isComplete,
        };
    }
}

