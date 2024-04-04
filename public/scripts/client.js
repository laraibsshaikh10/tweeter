/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//This method is best suited if the tweet element was created as a string literal (not a jQuery object).
//Preventing XSS with Escaping
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  //format the date from the tweet object
  const timeAgo = timeago.format(tweet.created_at);

  //copy the article section with a class named, tweet from index.html
  let $tweet = $(`
  <article class="tweet">
    <header class="profile-info-container">
      <div class="avatar-container">
        <img class="profile-pic" src=${tweet.user.avatars} alt="Profile Picture" width="150px" height="150px">
        <h3>${tweet.user.name}</h3>
      </div>
      <p>${tweet.user.handle}</p>
    </header>
    <p> ${escape(tweet.content.text)} </p>
    <footer class="tweet-footer">
      <p> ${timeAgo} </p>
      <div class="icon-container">
        <a href="#" class="icon"><i class="fa-solid fa-message"></i> </a> 
        <a href="#" class="icon"><i class="fa-solid fa-heart"></i> </a> 
        <a href="#" class="icon"><i class="fa-solid fa-flag"></i> </a>
      </div>
    </footer>
  </article>
`);
  // ...
  return $tweet;
};

//Implement renderTweets function
const renderTweets = function(tweets) {

  //before rendering new tweets, empty out the tweets container in the main tag
  $('#tweets-container').empty();

  //insert each tweet created into the tweets container
  tweets.forEach(tweet => {
    const $tweet = createTweetElement(tweet);
    //use prepand to arrange tweets in the reverse chronological order (newest first)
    $('#tweets-container').prepend($tweet);
  });
};


//define a function called loadTweets that is responsible for fetching tweets from the http://localhost:8080/tweets page
const loadTweets = function() {
  $.ajax({
    method: 'GET',
    url: '/tweets',
    dataType: 'json',
    success: function(res) {
      //upon successful execution, call renderTweets to render tweets to the DOM
      renderTweets(res);
    },
    error: function(xhr, status, error) {
      console.error("Error while fetching tweets:", error);
    }
  });
};

// A $( document ).ready() block.
$(document).ready(function() {

  //Add an event listener for submit and prevent its default behaviour.
  $('.submit-button').on("click", function(event) {
    //to prevent default submit behaviour
    event.preventDefault();

    //clear the existing error messages
    $('#error').hide().empty();

    //Implement validation before sending the form data to the server. If any criterion of your validation is not met, then you should notify the user by rendering a message on the page.
    const tweetMessage = $('#tweet-text').val().trim();

    //create an empty array to store error messages
    const errorMessages = [];

    //if tweet is empty
    if (!tweetMessage) {
      errorMessages.push("Please add your message before submitting.");

    }

    //if tweetLength > 140 words
    if (tweetMessage.length > 140) {
      errorMessages.push("You have exceeded the limit of maximum characters.");

    }

    //if error occurs, display it in the error message container
    if (errorMessages.length > 0) {
      //combine messages into one string
      const errors = errorMessages.join('<br>');

      //show error message within the message container provided in the html
      $('#error').html(errors).show();
      return; //to exit the function here

      // //only show the error message box when the error displays
      // $('#error-message').css('display', 'inline-block');

      // //return to exit
      // return;
    }

    //Serialize the form data and send it to the server as a query string.
    const formData = $('#tweet-form').serialize();

    //to send the serialized data as a query string to the server 
    $.ajax({
      method: 'POST',
      url: '/tweets/',
      data: formData,
      success: function(res) {
        console.log("Data successfully submitted.", res);
        //call the function to load tweets while the page loads
        loadTweets();

        //upon successful submission of the tweet, clear the form
        $('#tweet-text').val('');

        //upon successful submission of the tweet, reset the character count
        $('.counter').text('140');

        //hide the error message container after a successful submission
        $('#error').hide();
      },
      error: function(xhr, status, error) {
        console.error('Data submission failed:', error);

        //to display the error to user in case the post request fails
        $('#error').html('Something went wrong while fulfiling this request, please try again later').show();
      }

    });

  });

  loadTweets();
});





