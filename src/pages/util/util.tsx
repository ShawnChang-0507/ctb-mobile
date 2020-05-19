export class Util {

    static serverUrl = () => {
        return 'https://www.ctbkj.com.cn/';
        // return 'http://192.168.0.26:3000/';
    }

    static dateFormat = (date: Date, format: string) => {
        var o = {
            "M+": date.getMonth() + 1, //month
            "d+": date.getDate(), //day
            "h+": date.getHours(), //hour
            "m+": date.getMinutes(), //minute
            "s+": date.getSeconds(), //second
            "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
            "S": date.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }

    static addMonth = (sDate: Date, num: number) => {
        var sYear = sDate.getFullYear();
        var sMonth = sDate.getMonth() + 1;
        var sDay = sDate.getDate();

        var eYear = sYear;
        var eMonth = sMonth + num;
        var eDay = sDay + 1;
        while (eMonth > 12) {
            eYear++;
            eMonth -= 12;
        }

        while (eMonth <= 0){
            eYear--;
            eMonth += 12;
        }

        var eDate = new Date(eYear, eMonth - 1, eDay);

        while (eDate.getMonth() != eMonth - 1) {
            eDay--;
            eDate = new Date(eYear, eMonth - 1, eDay);
        }

        return eDate;
    }
}