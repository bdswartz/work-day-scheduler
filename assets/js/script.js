var date = moment().format("dddd, MMMM Do");
var dayStartTime = 9;
var taskData = [];

// load tasks and populate the schedule with tasks saved in local storage
var loadTasks = function() {
    taskData = JSON.parse(localStorage.getItem("workScheduler"));
    if (!taskData) {
        taskData = ["","","","","","","","",""];
    };
    $(".task-item").each(function(index) {
        $(this).val(taskData[index]);
    });
};

// save tasks from the schedule text areas into local storage
var saveTasks = function() {
    $(".task-item").each(function(index) {
        taskData[index] = $(this).val();
    });
    localStorage.setItem("workScheduler", JSON.stringify(taskData));
};

// get current date and time, show the calendar, and format 
// with proper class based on the current time
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

// present click feedback to user and call the function to save the tasks
  $(".saveBtn").on("click", function() {
      var buttonEl = $(this);
      buttonEl.css("color", "black");
      setTimeout(function() {buttonEl.css("color", "white");}, 250);
      saveTasks();
  });

loadTasks();
showCalendar();
setInterval(showCalendar, 300000);