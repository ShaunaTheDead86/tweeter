// a function creates and returns dynamtic HTML tweet boxes
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

// a function that iterates through an array of tweets, creates the HTML dynamically and then appends them individually to the main page
const renderTweets = function(tweetsArr) {
  for (const tweet of tweetsArr) {
    $('#tweets-container').prepend(createTweetElement(tweet));
  }
};

// a function that retrieves an array of tweets from the database then passes them to the renderer function
const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
    .then(function(data) {
      renderTweets(data);
    });
}

// a function that toggles the error box display from hidden to visible
const errorBoxToggle = function(errorBox, message) {
  const tweetcontainer = $(".new-tweet-section");

  tweetcontainer.height("fit-content"); // make sure the tweet container is set to fit-content before animating error box

  if (message === undefined) { // if there's no message
    errorBox.animate({ // animate the error box sliding up
      "height": 0 + "rem",
      "padding": 0 + "rem",
      "border-width": 0 + "rem" + 0.25 + "rem" + 0 + "rem" + 0.25 + "rem"
    }, "slow", "linear", function() { // after the animation is done
      errorBox.addClass("error-hidden") // then hide the error box
      errorBox.text(""); // then clear the message inside the error box
    });
  } else { // otherwise...
    errorBox.text(message); // append the message
    errorBox.removeClass("error-hidden"); // and make sure the error box visible
    errorBox.animate({ // animate the error box dropping down
      "height": 2 + "rem",
      "padding": 0.25 + "rem",
      "border-width": 0.25 + "rem" + 0.25 + "rem" + 0.25 + "rem" + 0.25 + "rem"
    }, "slow", "linear");
  }
}

// a function that cleanses inputs for safely querying the database
const escapeFn = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// when the site is loaded create dynamic content, then load event listeners onto HTML elements
$(document).ready(function() {
  // create dynamic content
  loadTweets();

  // attach event listeners below

  // event listener for new tweet submit
  $("#new-tweet-form").on("submit", function(event) {
    event.preventDefault();

    const container = $(this).closest(".new-tweet-section"); // get the form element
    const textarea = container.find(".new-tweet-text"); // get the textarea element
    const errorBox = container.find("#error-box"); // get the error message element
    const charCounter = container.find("output"); // get the character counter
    const charCount = Number(charCounter.val()); // get the value of the character counter

    //prepare data for AJAX POST request
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

          // clear the form inputs
          textarea.val("");
          textarea.height(32 + "px"); // make sure the textbox is the right height after clearing
          container.height("fit-content"); // resize the new tweet box after resizing the text box
          charCounter.val("140");

          // run the loadTweets function again to load the new tweet immediately
          loadTweets();
        });
    }
  });

  // click event listener for the dropdown "create new tweet" on the navbar
  $(".show-new-tweet").click(function(event) {
    event.preventDefault();
    const targetSection = $(".new-tweet-section"); // get container for the element we want to display
    const textarea = $(".new-tweet-text"); // get the textarea element

    textarea.val(""); // make sure it's cleared

    console.log("click!");

    if (targetSection.hasClass("new-tweet-section-hidden")) { // if it's hidden
      targetSection.toggleClass("new-tweet-section-hidden"); // toggle the hidden class to make it visible
      targetSection.animate({
        "height": 218 + "px",
        "padding-top": 2 + "rem",
        "padding-bottom": 2 + "rem"
      }, "slow", "linear", function() { // animate it opening slowly
        targetSection.find("#tweet-text").focus(); // focus the text area after the animation is finished
      })
    } else { // if it's not hidden
      targetSection.animate({
        "height": 0 + "px",
        "padding-top": 0 + "rem",
        "padding-bottom": 0 + "rem"
      }, "slow", "linear", function() { // animate it slowly closing
        targetSection.toggleClass("new-tweet-section-hidden"); // when the animation is finished, add the hidden class back to the container
      });
    }
  });

  // click event listener for the "back to the top" element in the footer
  $('.to-top-button').click(function() {
    $(document).scrollTop(0); // set the scrollTop attribute to 0 which brings the user's scrollbar to the top of the page
  });

  // event listener for the user scrolling beyond the top of the page
  $(document).scroll(function() {
    if ($(document).scrollTop() !== 0) { // if the user is not at the top of the page
      $('.to-top-button').removeClass("to-top-button-hidden"); // remove the hidden class to reveal the button
    } else { // if the user returns to the top of the page
      $('.to-top-button').addClass("to-top-button-hidden"); // then hide the button by adding the hidden class
    }
  });
});