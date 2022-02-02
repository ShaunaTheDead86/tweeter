$(document).ready(function() {
    // set default values on load
    $('#tweet_input').val('');
    $('char_count').text('140');

    let textareaLength = $('#tweet_input').val().length;

    $('#tweet_input').on('input', function() {
        textareaLength = $('#tweet_input').val().length;
        char_count = 140 - textareaLength;

        $('#char_count').css('color', '#333333');
        if (char_count < 0) {
            $('#char_count').css('color', 'red');
        }

        $('#char_count').text(`${char_count}`);
    });
});