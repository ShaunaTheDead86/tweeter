const renderError = function(error) {
  $('.new-tweet-header').empty();
  $('.new-tweet-header').css('visibility', 'visible');
  $('.new-tweet-header').slideDown(5000, function() {
    $('.new-tweet-header').css('border', '5px solid red');
    $('.new-tweet-header').html(error);
  });
  return;
};

$(document).ready(function() {
  // set default values on load
  $('.new-tweet-header').css('visibility', 'hidden');
  $('#tweet_input').val('');
  $('char_count').text('140');

  let textareaLength = $('#tweet_input').val().length;

  $('#tweet_input').on('input', function() {
    $('.new-tweet').css("height", "fit-content");

    console.log($('#tweet_input').val.length);

    textareaLength = $('#tweet_input').val().length;
    char_count = 140 - textareaLength;

    $('#char_count').css('color', '#333333');
    $('#char_count').text(`${char_count}`);

    if (char_count >= 0) {
      $('.new-tweet-header').css('visibility', 'hidden');
    }

    if (char_count < 0) {
      $('#char_count').css('color', 'red');
      $('tweet-form').submit(false);
      renderError('Over character limit!');
    }
  });
});