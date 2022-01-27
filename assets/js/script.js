var date = moment().format("dddd, MMMM Do");
var dayStartTime = 9;

var showCalendar = function() {
    $("#currentDay").text(date);
    console.log(date);
    $(".hour").each(function(index) {
        var time = moment().set("hour", dayStartTime + index );
        var displayTime = moment().set("hour", dayStartTime + index ).format("hA");
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
};

$(".task-item").on("click", "p", function() {
    console.log("here");
    // get current text of p element
    var text = $(this)
      .text()
      .trim();
  
    // replace p element with a new textarea
    var textInput = $("<textarea>").val(text);
    $(this).replaceWith(textInput);
  
    // auto focus new element
    textInput.trigger("focus");
  });

showCalendar();
setInterval(showCalendar, 60000);