var date = moment().format("dddd, MMMM Do");
var dayStartTime = 9;
var workDayLength = 9;
var taskData = [];

// load tasks and populate the schedule with tasks saved in local storage
var loadTasks = function() {
    taskData = JSON.parse(localStorage.getItem("workScheduler"));
    if (!taskData) {
        for (var index = 0; index < 24; index++) {
            taskData[index] = "";
        }
    };
    $(".task-item").each(function(index) {
        $(this).val(taskData[dayStartTime + index]);
        $(this).data("hour", (dayStartTime + index));
    });
};

// save tasks from the schedule text areas into local storage
var saveTasks = function() {
    // dead code from when the entire array was saved at once
    // $(".task-item").each(function(index) {
    //     var hourIndex = $(this).data("hour");
    //     console.log(hourIndex);
    //     taskData[hourIndex] = $(this).val();
    //     console.log($(this).val());
    // });
    localStorage.setItem("workScheduler", JSON.stringify(taskData));
};

// get current date and time, show the calendar, and format 
// with proper class based on the current time
var showCalendar = function() {
    $("#currentDay").text(date);
    // cycle through and style the calendar
    $(".hour").each(function(index) {
        // get time and display formatted time to the appropriate calendar row heading
        var time = moment().set("hour", dayStartTime + index );
        var displayTime = moment().set("hour", dayStartTime + index ).format("hA");
        $(this).text(displayTime);
        // style the calendar based on the time of day (hour only)
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
    //   save the data of the button that was pressed
      var saveIndex = $(this).siblings("textarea").data("hour");
    //   Get the value of the sibling text area and store in array of tasks
      taskData[saveIndex] = $(this).siblings("textarea").val();
    //   present feedback to the user that the button was pressed
      var buttonEl = $(this);
      buttonEl.css("color", "black");
      setTimeout(function() {buttonEl.css("color", "white");}, 250);
      saveTasks();
  });

loadTasks();
// show the work day and style immediately upon loading 
showCalendar();
// check styling every 5 min
setInterval(showCalendar, 300000);