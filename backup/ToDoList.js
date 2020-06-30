module.exports = class ToDoList {
    constructor() {
        this._items = [];
    }

    get items() {
        return this._items;
    }

    getItemByText(searchText) {
        return this._items.find((item) => item.text == searchText);
    }

    getItemById(id) {
        return this._items.find((item) => item.id == id);
    }

    addItem(item) {
        this._items.push(item);
    }

    removeItemByText(searchText) {  //this._items = this._items.filter((item) => item.text != searchText);// remove all item with searchText
        this._items.find(
            (item, index) => {
                if (item.text == searchText) {
                    this._items.splice(index, 1);
                    return true;
                }
            }
        );
    }

    removeItemById(id) {
        return this._items.find((item, index) => {
            if (item.id == id) {
                this._items.splice(index, 1);
                return true;
            }
        });
    }

    clear() {
        this._items = [];
    }

    sortByDate(){
       return this._items.sort((a, b) => {
           a.expirationDate > b.expirationDate ? 1 : -1;
           //console.log( ( a.expirationDate > b.expirationDate ? 1 : -1) + "\n");
       });
    }

    sortByState(){
        () =>{
             this._items.sort((a, b) => a.isComplete > b.isComplete ? 1 : -1);
        };
    }

    filterByComplete(){
        return this._items.filter((item) => item.isComplete === true);
    }

    filterByUnComplete(){
        return this._items.filter((item) => item.isComplete === false);
    }

    has(id){
        return Boolean(this.getItemById(id));
    }

}