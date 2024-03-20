//Add a $(document).ready() function to your file to ensure the DOM has loaded.
// console.log("The outside statement works.")
$(document).ready(function() {
 
    // --- our code goes here ---
  // console.log("i am ready.");
  //.tweet-textbox textarea selects the text area, .on('input', function(){}) registers eventhandler for input elemetn
  $('#tweet-text').on('input', function() {
    //to log text area element
    // console.log(this);

    //to retrieve the value of textarea
    const inputValue = $(this).val();
    // console.log("Input Value: ", inputValue);

    //determine length of input value
    const inputLength = inputValue.length;
    // console.log("Input Length:", inputLength);

    //Adjust your code to render the above result by updating the counter on the page.

    //calculate remaining characters
    const remainingCharacters = 140 - inputLength;
    
    
    //to update the class counter in output based on the characters typed in the text area 
    $('.counter').text(remainingCharacters);
    
    //to see if input is invalid
    if (remainingCharacters < 0) {
      //add class to change counter color to red
      $('.counter').addClass('invalid-input');
    } else {
      //remove class if input is valid and within range
      $('.counter').removeClass('invalid-input')
    }
    
  });
});