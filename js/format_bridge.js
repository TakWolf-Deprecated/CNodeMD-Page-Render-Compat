
var MINUTE = 60 * 1000;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;
var WEEK = 7 * DAY;
var MONTH = 31 * DAY;
var YEAR = 12 * MONTH;

window.formatBridge = {

    getRelativeTimeSpanString: function (time) {
        var offset = Date.parse(new Date()) - Date.parse(new Date(time));
        if (offset > YEAR) {
            return Math.floor(offset / YEAR) + "年前";
        } else if (offset > MONTH) {
            return Math.floor(offset / MONTH) + "个月前";
        } else if (offset > WEEK) {
            return Math.floor(offset / WEEK) + "周前";
        } else if (offset > DAY) {
            return Math.floor(offset / DAY) + "天前";
        } else if (offset > HOUR) {
            return Math.floor(offset / HOUR) + "小时前";
        } else if (offset > MINUTE) {
            return Math.floor(offset / MINUTE) + "分钟前";
        } else {
            return "刚刚";
        }
    }

};
