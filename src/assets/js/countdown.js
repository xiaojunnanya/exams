var timeCounter = (function() {
    var int;
    var total = 3600;

    return function(elemID) {
    obj = document.getElementById(elemID);
    var s = (total%60) < 10 ? ('0' + total%60) : total%60;
    var h = total/3600 < 10 ? ('0' + parseInt(total/3600)) : parseInt(total/3600);
    var m = (total-h*3600)/60 < 10 ? ('0' + parseInt((total-h*3600)/60)) : parseInt((total-h*3600)/60);
    obj.innerHTML = h + ' : ' + m + ' : ' + s;
    total--;
    int = setTimeout("timeCounter('" + elemID + "')", 1000);
    if(total < 0) clearTimeout(int);
    }

})()

export{
    timeCounter
}