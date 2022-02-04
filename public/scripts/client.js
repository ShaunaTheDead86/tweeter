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

const createTweetElement = function(obj) {
  return `<div class="tweets-container">
    <div class="tweet-header">
      <div class="profile-name-avatar">
        <img src="${obj.user.avatars}" class="profile-image"></img>
        <h3 class="profile-name">${obj.user.name}</h3>
      </div>
      <h3 class="tweeter-handle">${obj.user.handle}</h3>
    </div>
    <div class="tweet-box">
    <h3 class="tweet-text">
    ${obj.content.text}
    </h3>
    </div>
    <div class="tweet-footer">
    <div class="tweet-timestamp">
    <h5 class="render" datetime"${timeago.format(obj['created_at'])}">${timeago.format(obj['created_at'])}</h5>
    </div>
    <div class="tweet-icons-box">
    <i class="fas fa-flag tweet-icons"></i>
    <i class="fas fa-retweet tweet-icons"></i>
    <i class="fas fa-heart tweet-icons"></i>
    </div>
    </div>
    </div>`;
};

const renderTweets = function(arrObj) {
  for (const obj of arrObj) {
    let $tweet = createTweetElement(obj);
    $('#tweets').append($tweet);
  }
};

const loadTweets = function() {

  $.ajax('/tweets', { method: GET })
    .then(function(res) {
      renderTweets(res)
    })
};

$("#tweet-form").submit(function(e) {
  e.preventDefault();

  if (!(140 - $('#tweet_input').val().length < 0)) {
    const data = decodeURIComponent($(this).serialize());

    $.post('/tweets', data, function() {
      const text = data.split('=')[1];

      let newTweet = {
        "user": {
          "name": "Shauna",
          "avatars": "/images/girl.png",
          "handle": "@ShaunaTheDead"
        },
        "content": {
          "text": text
        },
        "created_at": new Date
      };

      tweetData.unshift(newTweet);
      $('#tweets').empty();
      renderTweets(tweetData);
    });
  }
});

$(document).ready(function() {
  let newTweetOpen = false;
  const newTweetHeight = $('.new-tweet').css("height");
  $('.new-tweet').css({ "height": "0", "padding": "0", "border-width": "0", "margin-bottom": "0" });

  $('.nav-text').click(function() {
    if (newTweetOpen === false) {
      $('.new-tweet').animate({ "height": newTweetHeight, "padding": "1rem", "border-width": "3px", "margin-bottom": "1rem" });
      newTweetOpen = true;
    } else {
      $('.new-tweet').animate({ "height": "0", "padding": "0", "border-width": "0px", "margin-bottom": "0" });
      newTweetOpen = false;
    }
  });
});

$(document).scroll(function() {
  if ($(document).scrollTop() !== 0) {
    $('.footer').css("visibility", "visible");
  } else {
    $('.footer').css("visibility", "hidden");
  }
});

$('.footer').click(function() {
  $(window).scrollTop(0);
})

renderTweets(tweetData);