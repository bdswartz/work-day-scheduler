var date = moment().format("dddd, MMMM Do");
var dayStart = 13

setInterval(function() {
    $("#currentDay").text(date);
    console.log(date);
    $(".hour").each(function(index) {
        var time = moment().set("hour", dayStart + index );
        var displayTime = moment().set("hour", dayStart + index ).format("hA");
        $(this).text(displayTime);
            if (moment().isAfter(time,"hour")) {
                console.log("true");
                $(this).siblings(".col-10").addClass("past");
            }
            else if (moment().isSame(time,"hour")) {
                console.log("true");
                $(this).siblings(".col-10").addClass("present");
            }
            else if (moment().isBefore(time,"hour")) {
                console.log("true");
                $(this).siblings(".col-10").addClass("future");
            }
    });
} , 60000);