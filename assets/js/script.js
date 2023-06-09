// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  renderLastInput();
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  var saveBtn = $('#save-btn');
  saveBtn.on('click', function () {
    var containerID = $(this).parent().attr('id');
    var saveInput = $(this).parent().children('textarea').val();
    console.log(saveInput);
    localStorage.setItem(containerID, saveInput);
    renderLastInput();
  });
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  var currentTime = dayjs().format('H');
  for(var i = 6; i < 15; i++) {
    var hourEl = $('#hour-' + i);
    if(currentTime > i) {
      hourEl.attr('class', 'row time-block past');
    } if(currentTime == i) {
      hourEl.attr('class', 'row time-block present');
    } if(currentTime < i) {
      hourEl.attr('class', 'row time-block future');
    }
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  function renderLastInput() {
    for(var i = 6; i < 15; i++) {
      var saveText = localStorage.getItem('hour-' + i);
      if (!saveText) {
        return;
      }
      console.log(saveText);
      var hourID = $('#hour-' + i);
      $(hourID).children('textarea').text(saveText);
    }
  }
  // TODO: Add code to display the current date in the header of the page.
    //var headerDate = $("#currentDay");
    var headerDate = dayjs().format('MMM D, YYYY');
    $('#currentDay').text(headerDate);
});
