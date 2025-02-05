document.addEventListener('DOMContentLoaded', function() {
    const inputField = document.getElementById('inputSubliminal');
    const button = document.getElementById('button');
    const messageElement = document.getElementById('message');
    const tipElement = document.getElementById('tip');
    let remainingClicks = 0;
    let words = [];
    let currentClick = 0;

    // Tips array
    const tips = [
        "Tip 1: Ctrl/Cmd + Click on the button to open tabs in the background",
        "Tip 2: Use '//' on the text to split tabs there instead of on spaces",
        "Tip 3: Right-click a tab and 'Close others' to clean up"
    ];
    let currentTipIndex = 0;

    // Function to cycle tips
    function cycleTips() {
        tipElement.style.opacity = 0; // Fade out
        setTimeout(() => {
            tipElement.textContent = tips[currentTipIndex];
            tipElement.style.opacity = 1; // Fade in
            currentTipIndex = (currentTipIndex + 1) % tips.length; // Move to next tip
        }, 500); // 0.5 second fade-out time
    }

    // Start cycling immediately after page load and ensure Tip 1 appears instantly
    tipElement.textContent = tips[currentTipIndex];
    tipElement.style.opacity = 1; // Ensure it's visible immediately
    currentTipIndex++; // Move to the next tip after the first display

    setInterval(cycleTips, 5000); // Change every 3 seconds

    // Set random placeholder
    function setRandomPlaceholder() {
        const placeholderTexts = [
            "Please give me a raise",
            "I'm secretly in love with you",
            "This meeting is so boring",
            "This work is great, buy it",
            "Pay me a bigger fee, I deserve it",
            "She deserves a raise",
            "He's ready for a promotion",
            "Dan Hill, you have a booger in your nose",
            "I'm not looking at porn",
            "Maria I love you",
            "If you're looking at my tabs, you clearly love me"
        ];
        const randomIndex = Math.floor(Math.random() * placeholderTexts.length);
        inputField.placeholder = placeholderTexts[randomIndex];
    }

    // Clear the input field when the page is reloaded
    inputField.value = ''; 

    // Function to split text based on spaces or "//"
    function splitInputText(text) {
        if (text.includes("//")) {
            return text.split("//").map(word => word.trim()).filter(word => word !== "");
        } else {
            return text.split(/\s+/).filter(word => word !== "");
        }
    }

    // Update message when the text changes
    inputField.addEventListener('input', function() {
        const text = inputField.value.trim();
        if (text === '') {
            messageElement.textContent = 'Input a text!';
            remainingClicks = 0;
            words = [];
        } else {
            messageElement.textContent = '';
            words = splitInputText(text);
            remainingClicks = words.length;
            currentClick = 0;
        }
    });

    // When the button is clicked:
    button.addEventListener('click', function(event) {
        const text = inputField.value.trim();
        if (text === '') {
            messageElement.textContent = 'Input a text!';
            return;
        }

        words = splitInputText(text);

        if (remainingClicks > 0) {
            const currentWord = words[currentClick];
            const newTab = window.open('', '_blank');
            if (newTab) {
                newTab.document.write(`
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>${currentWord}</title>
                        <link rel="stylesheet" href="styles.css">
                    </head>
                    <body>
                        <div id="main">
                            <h1>${currentWord}</h1>
                            <p>Thank you for using Subliminal Tabs!</p>
                        </div>
                    </body>
                    </html>
                `);
                newTab.document.close();
            }

            currentClick++;
            remainingClicks--;

            messageElement.textContent = remainingClicks > 0
                ? `Remaining clicks: ${remainingClicks}`
                : 'All tabs created';
        }
    });

    setRandomPlaceholder();
});
