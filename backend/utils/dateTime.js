var moment = require('jalali-moment');

class DateTime {

    static convertToPersianDateTime(date)
    {
        return moment(date).locale('fa').format('YYYY/MM/DD HH:mm');
    }
    static convertToPersianDate(date) {
        return moment(date).locale('fa').format('YYYY/MM/DD');
    }
}

module.exports = DateTime;