/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

  //create a function to calculate the time difference between the current time and the time a tweet was created (how old the tweet actually is)
  function timeDifference(date) {
    //calculate difference between current time and the time the tweet was created and convert it to seconds
    const sec = Math.floor((Date.now()- date) / 1000)
    
    //to calculate the time in years (31536000 seconds in a year)
    let interval = Math.floor(sec / 31536000);
    if (interval > 1) {
      return interval + " years ago.";
    }
  
    //to calculate the time in months (2628000 seconds in a month)
    interval = Math.floor(sec / 2628000);
    if (interval > 1) {
      return interval + " months ago.";
    }
  
    //to calculate the time in days (86400 seconds in a day)
    interval = Math.floor(sec / 86400);
    if (interval > 1) {
      return interval + " days ago.";
    }
  
    
    //to calculate the time in hours (3600 seconds in an hour)
    interval = Math.floor(sec / 3600);
    if (interval > 1) {
      return interval + " hours ago.";
    }
  
    
    //to calculate the time in minutes (60 seconds in a minute)
    interval = Math.floor(sec / 60);
    if (interval > 1) {
      return interval + " minutes ago.";
    }
  
    //calculate and return time in seconds if none of the above conditions are true
    return Math.floor(sec) + " seconds ago."; 
  
  }

const createTweetElement = function(tweet) {
  //format the date from the tweet object
  const creationTime = new Date(tweet.created_at);
  const timeAgo = timeDifference(creationTime);

  //copy the article section with a class named, tweet from index.html
  let $tweet = $(`
  <article class="tweet">
  <header>
    <img class="profile-pic" src="./images/profilepicture.jpg" alt="Profile Picture" width="150px" height="150px">

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
// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
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
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

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
      data: 'formData',
      success: function(res) {
        console.log("Data successfully submitted.", res);
      },
      error: function(xhr, status, error) {
        console.error('Data submission failed:', error);
      }

    })
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
      $('#tweets-container').append($tweet);
    });
  };

  // Render the tweets data
  renderTweets(data);
});



// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.






