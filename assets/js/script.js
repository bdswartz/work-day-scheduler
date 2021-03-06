var date = moment().format("dddd, MMMM Do");
var dayStartTime = 9;
var workDayLength = 9;
var taskData = [];
var scheduleElArray = [];

// load tasks and populate the default schedule with tasks saved in local storage
var loadTasks = function() {
    if (!localStorage.getItem("workScheduler")) {
        var taskData = [];
    }
    else {
        console.log("not empty")
       taskData = JSON.parse(localStorage.getItem("workScheduler")); 
    }
    return(taskData);
};

$(".modal-content").on("submit",function(event) {
    event.preventDefault();
    $('#exampleModal').modal('hide');
    dayStartTime = parseInt($("#start-time").val());
    workDayLength = parseInt($("#end-time").val()) - parseInt($("#start-time").val());
    $(".schedule-row").each(function(index) {
        $(this).remove();
    });
    showCalendar();
});


// save tasks from the schedule text areas into local storage
var saveTasks = function() {
    localStorage.setItem("workScheduler", JSON.stringify(taskData));
};

// get current date and time, show the calendar, and format 
// with proper class based on the current time
var showCalendar = function() {
    $("#currentDay").text(date);
    for (var i = 0; i < workDayLength; i++) {
        // Build elements of schedule
        var newRow = $("<div>").addClass("row schedule-row");
        var newRowHour = $("<div>").addClass("col-1 hour");
        var newTaskInput = $("<textarea>").addClass("task-item col-10");
        var newSaveBtn = $("<div>").addClass("col-1 saveBtn");
        var newBtnIcon = $("<i>").addClass("fas fa-save");
        newSaveBtn.append(newBtnIcon);
        newRow.append(newRowHour,newTaskInput,newSaveBtn);
        // save built schedule elements in array
        scheduleElArray[i]= newRow;
    };
    // append elements stored in array to the DOM
    $(".schedule").append(scheduleElArray);
    // populate schedule with saved tasks
    $(".task-item").each(function(count) {
        $(this).val(taskData[dayStartTime + count]);
        $(this).data("hour", (dayStartTime + count));
    });
    styleCalendar();
};
var styleCalendar = function() {
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
  $(".schedule").on("click", ".saveBtn", function() {
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

taskData = loadTasks();
// show the work day and style immediately upon loading 
showCalendar(taskData);
// check styling every 5 min
setInterval(styleCalendar, 300000);