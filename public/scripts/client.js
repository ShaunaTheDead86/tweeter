const tweetData = [{
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const createTweetElement = function(tweetObj) {
  const tweet = `
  <article class="tweet">
    <header class="tweet-header">
      <div class="tweet-username">
        <img src="${tweetObj.user.avatars}" class="tweet-user-icon" />
        ${tweetObj.user.name}
      </div>
      <div class="tweet-userhandle">
        ${tweetObj.user.handle}
      </div>
    </header>
    <div class="tweet-text">
      ${tweetObj.content.text}
    </div>
    <footer class="tweet-footer">
      <div class="tweet-timeago">
        ${timeago.format(tweetObj['created_at'])}
      </div>
      <div class="tweet-icons">
        <i class="fas fa-flag tweet-icons" />
        <i class="fas fa-retweet tweet-icons" />
        <i class="fas fa-heart tweet-icons" />
      </div>
    </footer>
  </article>
  `;

  return tweet;
};

const renderTweets = function(tweetsArr) {
  for (const tweet of tweetsArr) {
    $('#tweets-container').prepend(createTweetElement(tweet));
  }
};

const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
    .then(function(data) {
      renderTweets(data);
    });
}

const errorBoxToggle = function(errorBox, message) {
  errorBox.text(""); // clear the html

  if (message === undefined) { // if there's no message
    errorBox.addClass("error-hidden") // then hide the error box
  } else { // otherwise...
    errorBox.text(message); // append the message
    errorBox.removeClass("error-hidden"); // and make sure the error box visible
  }
}

const escapeFn = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(function() {
  loadTweets();

  $("#new-tweet-form").on("submit", function(event) {
    event.preventDefault();

    const form = $(this).closest("form"); // get the form element
    const textarea = form.find("textarea"); // get the textarea element
    const errorBox = form.find("#error-box"); // get the error message element
    const charCounter = form.find("output"); // get the character counter
    const charCount = Number(charCounter.val()); // get the value of the character counter

    console.log();

    //prepare data for Ajax calling
    data = escapeFn(textarea.serialize());

    if (textarea.val() === "" || textarea.val() === null || textarea.val() === undefined) {
      //if text is null, show a message for empty text
      errorBoxToggle(errorBox, "There's no text to tweet!");
    } else if (charCount < 0) {
      //if text exceed 140 characters, show a message for too long text
      errorBoxToggle(errorBox, "You're over the character limit!");
    } else {
      $.post("/tweets", data)
        .done(function() {
          errorBoxToggle(errorBox); // clear the error box on submit
          loadTweets();
        });
    }
  });

  $("#show-new-tweet").click(function() {
    $(".new-tweet-section").toggleClass("new-tweet-section-hidden");
  });

  $('.to-top-button').click(function() {
    $(document).scrollTop(0);
  });
});

$(document).scroll(function() {
  if ($(document).scrollTop() !== 0) {
    $('.to-top-button').removeClass("to-top-button-hidden");
  } else {
    $('.to-top-button').addClass("to-top-button-hidden");
  }
});

// $('.footer').click(function() {
//   $(window).scrollTop(0);
// })