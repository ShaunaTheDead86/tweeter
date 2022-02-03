const renderError = function(error) {
  $('.error-box').empty();
  $('.error-box').css('visibility', 'visible');
  $('.error-box').slideDown(4000, function() {
    $('.error-box').css('border', '5px solid red');
    $('.error-box').html(error);
  });
  return;
};

$(document).ready(function() {
  // set default values on load
  $('.error-box').css('visibility', 'hidden');
  $('#tweet_input').val('');
  $('char_count').text('140');

  let textareaLength = $('#tweet_input').val().length;

  $('#tweet_input').on('input', function() {
    textareaLength = $('#tweet_input').val().length;
    char_count = 140 - textareaLength;

    $('#char_count').css('color', '#333333');
    $('#char_count').text(`${char_count}`);

    if (char_count >= 0) {
      $('.error-box').css('visibility', 'hidden');
    }

    if (char_count < 0) {
      $('#char_count').css('color', 'red');
      $('tweet-form').submit(false);
      renderError('You\'ve gone over the character limit! Please remove some characters!');
    }
  });
});