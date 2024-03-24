/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweet) {
  //format the date from the tweet object
  const timeAgo = timeago.format(tweet.created_at);

  //copy the article section with a class named, tweet from index.html
  let $tweet = $(`
  <article class="tweet">
  <header>
    <img class="profile-pic" src=${tweet.user.avatars} alt="Profile Picture" width="150px" height="150px">

    <div class="profile-info">
      <h3>${tweet.user.name}</h3>
      <div class="">
        <p>${tweet.user.handle} · active ${timeAgo}</p>
      </div>
    </div>
  <p> ${tweet.content.text} </p>
  </header>
  <footer class="tweet-footer">
    <a href="#" class="icon"><i class="fa-solid fa-message"></i> 20 </a> 
    <a href="#" class="icon"><i class="fa-solid fa-heart"></i> 10 </a> 
    <a href="#" class="icon"><i class="fa-solid fa-flag"></i> 30 </a>
  </footer>
</article>
`);
  // ...
  return $tweet;
}

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

// A $( document ).ready() block.
$( document ).ready(function() {
  console.log( "ready!" );

  //Add an event listener for submit and prevent its default behaviour.
  $('.submit-button').on("click", function(event) {
    //to prevent default submit behaviour
    event.preventDefault();

    //Serialize the form data and send it to the server as a query string.
    const formData = $('#tweet-form').serialize();

    //to send the serialized data as a query string to the server 
    $.ajax({
      method: 'POST',
      url: '/tweets/',
      data: formData,
      success: function(res) {
        console.log("Data successfully submitted.", res);
      },
      error: function(xhr, status, error) {
        console.error('Data submission failed:', error);
      }

  });

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
  }
  //call the function to load tweets while the page loads
  loadTweets();
  });



  const $tweet = createTweetElement(tweetData);
  
  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like

  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.


  //Implement renderTweets function
  const renderTweets = function (tweets) {
 
    //before rendering new tweets, empty out the tweets container in the main tag
    $('#tweets-container').empty();

    //insert each tweet created into the tweets container
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      //use prepand to arrange tweets in the reverse chronological order (newest first)
      $('#tweets-container').prepend($tweet);
    });
  };

  // Render the tweets data
  renderTweets(data);
});



// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.






