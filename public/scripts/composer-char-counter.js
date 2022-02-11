$(document).ready(function() {
  $("textarea[class=new-tweet]").on('input', function() {
    // get the character counter's <output> html element by navigating through the DOM
    const charCounter = $(this).closest("form").find("output");
    // get the remaining characters until the 140 character limit is reached
    const charCount = 140 - $(this).val().length;

    // adds new lines to textarea to fit input
    $(this).height(0); // set textarea height to 0
    $(this).height(this.scrollHeight); // then set equal to scrollHeight

    // update the character counter with the correct remaining character count
    $(charCounter).html(charCount);

    if (charCount < 0) { // if the character count goes below zero
      $(charCounter).addClass("error"); // then add the class"error" to the character counter, which makes it red
    } else { // if the character count goes back above or equal to zero
      $(charCounter).removeClass("error"); // then remove the "error" class and return the character counter to normal
    }
  });
});