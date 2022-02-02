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
  return `<article class="tweets-container">
    <div class="tweet-header">
    <div class="tweet-header profile-display">
    <img src="${obj.user.avatars}" class="profile-image"></img>
    <h3 class="profile-name">${obj.user.name}</h3>
    </div>
    <div class="tweet-header tweeter-handle">
    <h3>${obj.user.handle}</h3>
    </div>
    </div>
    <div class="tweet-box">
    <h3 class="tweet-text">
    ${obj.content.text}
    </h3>
    </div>
    <div class="tweet-footer">
    <div class="tweet-timestamp">
    <h5 class="render" datetime"${obj['created_at']}"></h5>
    </div>
    <div class="tweet-icons-box">
    <i class="fas fa-flag tweet-icons"></i>
    <i class="fas fa-retweet tweet-icons"></i>
    <i class="fas fa-heart tweet-icons"></i>
    </div>
    </div>
    </article>`;
};

const renderTweets = function(arrObj) {
  for (const obj of arrObj) {
    let $tweet = createTweetElement(obj);
    $('#tweets-box').append($tweet);
  }
};

const loadTweets = function() {

  $.ajax('/tweets', { method: GET })
    .then(function(res) {
      console.log(res);
      renderTweets(res)
    })
};

$("#tweet-form").submit(function(e) {
  $.ajax({
    type: "POST",
    url: '/tweets',
    data: $(this).serialize(),
    success: function(data) {
      console.log(this.data);
      const newTweet = [{
        "user": {
          "name": "Shauna",
          "avatars": "/images/girl.png",
          "handle": "@ShaunaTheDead"
        },
        "content": {
          "text": this.data.split('=')[1]
        },
        "created_at": new Date
      }];

      renderTweets(newTweet);
    }
  });
  e.preventDefault();
});

renderTweets(tweetData);