module.exports = class DateFormater{
    static format(dateString){
        
        let res = dateString.getFullYear() + "-";
        if ((dateString.getMonth()+1) <10){
            res += "0" + (dateString.getMonth()+1) + "-";
        } else{
            res += dateString.getMonth()+1 + "-";
        }
        if(dateString.getDate() <10){
            res += "0" + dateString.getDate();
        } else {
            res += dateString.getDate()
        }
        return res;
    }
}

