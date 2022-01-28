var date = moment().format("dddd, MMMM Do");
var dayStartTime = 9;
var taskData = [];

var loadTasks = function() {
    taskData = JSON.parse(localStorage.getItem("workScheduler"));
    $(".task-item").each(function(index) {
        $(this).val(taskData[index]);
    });
};

var saveTasks = function() {
    $(".task-item").each(function(index) {
        taskData[index] = $(this).val();
    });
    localStorage.setItem("workScheduler", JSON.stringify(taskData));
};


var showCalendar = function() {
    $("#currentDay").text(date);
    $(".hour").each(function(index) {
        var time = moment().set("hour", dayStartTime + index );
        var displayTime = moment().set("hour", dayStartTime + index ).format("hA");
        $(this).text(displayTime);
        if (moment().isAfter(time,"hour")) {
            $(this).siblings(".task-item").addClass("past");
            $(this).siblings(".task-item").removeClass("present future");
        }
        else if (moment().isBefore(time,"hour")) {
            $(this).siblings(".task-item").addClass("future");
            $(this).siblings(".task-item").removeClass("present past");
        }
        else {
            $(this).siblings(".task-item").addClass("present");
            $(this).siblings(".task-item").removeClass("past future");
        }
    });
};

  $(".saveBtn").on("click", saveTasks);

loadTasks();
showCalendar();
setInterval(showCalendar, 300000);