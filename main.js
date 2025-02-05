document.addEventListener('DOMContentLoaded', function() {
    const inputField = document.getElementById('inputSubliminal');
    const button = document.getElementById('button');
    const messageElement = document.getElementById('message');
    let remainingClicks = 0;
    let words = [];
    let currentClick = 0;

    let h1 = document.getElementById("animatedText");
    let text = h1.innerText;
    h1.innerHTML = ""; // Clear existing text

    text.split("").forEach((char, index) => {
        let span = document.createElement("span");
        
        if (char === " ") {
            span.innerHTML = "&nbsp;"; // Preserve spaces
        } else {
            span.innerText = char;
            span.style.animationDelay = `${index * 0.1}s`; // Apply delay only to letters
        }

        h1.appendChild(span);
    });

    
    // Customizable array of funny placeholder texts
    const placeholderTexts = [
      "Please give me a raise",
      "I'm secretly in love with you",
      "This meeting is so boring",
      "This work is great, buy it",
      "Pay me a bigger fee, I deserve it",
      "She deserves a raise",
      "He's ready for a promotion",
      "Dan Hill, you have a Booger in your nose",
      "I'm not looking at porn",
      "Maria I love you",
      "If you're looking at my tabs, you clearly love me"
    ];
  
    // Set random placeholder
    function setRandomPlaceholder() {
      const randomIndex = Math.floor(Math.random() * placeholderTexts.length);
      inputField.placeholder = placeholderTexts[randomIndex];
    }
  
    // Clear the input field when the page is reloaded
    inputField.value = ''; // Clear the input field text on page reload
  
    // Update message when the text changes
    inputField.addEventListener('input', function() {
      const text = inputField.value.trim();
      if (text === '') {
        messageElement.textContent = 'Input a text!';
        remainingClicks = 0; // Reset clicks when text is cleared
        words = []; // Clear words array when text is empty
      } else {
        messageElement.textContent = ''; // Clear any warning message when input is detected
        words = text.split(/\s+/); // Split input text into words every time text changes
        remainingClicks = words.length; // Update remaining clicks based on the new word count
        currentClick = 0; // Reset click counter whenever the text changes
      }
    });
  
    // When the button is clicked:
    button.addEventListener('click', function(event) {
      const text = inputField.value.trim();
      if (text === '') {
        messageElement.textContent = 'Input a text!';
        return; // Do nothing else if no text is provided
      }
  
      // Ensure words array is split based on current input text
      words = text.split(/\s+/);
      
      if (remainingClicks > 0) {
        // Open a new tab for the word corresponding to the current click
        const currentWord = words[currentClick];
        const newTab = window.open('', '_blank');
        if (newTab) {
          newTab.document.title = currentWord;
        }
  
        // Increment the click counter
        currentClick++;
        remainingClicks--;
  
        // Update remaining clicks message
        if (remainingClicks > 0) {
          messageElement.textContent = `Remaining clicks: ${remainingClicks}`;
        } else {
          messageElement.textContent = 'All tabs created';
        }
      }
    });
  
    // Set the random placeholder on load
    setRandomPlaceholder();
  });
  