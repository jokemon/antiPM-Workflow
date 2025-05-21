// Get references to the DOM elements
const textInput = document.getElementById('text-input');
const speakButton = document.getElementById('speak-button');
const originalTextDisplay = document.getElementById('original-text-display');
const recordButton = document.getElementById('record-button');
const recognizedTextDisplay = document.getElementById('recognized-text-display');
const feedbackDisplay = document.getElementById('feedback-display');
const exerciseDisplay = document.getElementById('exercise-display'); // Added for future use

let currentOriginalText = ""; // Variable to store the original text for comparison
let currentWordToPractice = null; // Variable to store the word for focused practice

// --- Text-to-Speech (TTS) Functionality ---
speakButton.addEventListener('click', () => {
    const text = textInput.value.trim();
    originalTextDisplay.textContent = text;
    currentOriginalText = text; // Store the text for later comparison
    currentWordToPractice = null; // Reset any word practice
    feedbackDisplay.textContent = ""; // Clear feedback
    recognizedTextDisplay.innerHTML = ""; // Clear previous comparison

    if (text === '') {
        alert('Please enter some text to speak.');
        return;
    }

    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    } else {
        alert('Sorry, your browser does not support Text-to-Speech.');
    }
});

// --- Speech-to-Text (STT) Functionality ---
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
let isRecording = false;

if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recordButton.addEventListener('click', () => {
        if (!isRecording) {
            if (!currentOriginalText.trim() && !currentWordToPractice) {
                alert("Please use the 'Speak Aloud' button to set the text to be practiced first, or click 'Retry' on a word.");
                return;
            }
            recognition.start();
            isRecording = true;
            recordButton.textContent = '🛑 Stop Recording';
            if (!currentWordToPractice) {
                recognizedTextDisplay.innerHTML = ''; // Clear for full comparison
            }
            // feedbackDisplay.textContent will be updated by onstart or by retry logic
        } else {
            recognition.stop();
            // isRecording and button text will be reset in onend
        }
    });

    recognition.onstart = () => {
        if (currentWordToPractice) {
            feedbackDisplay.textContent = `Listening for the word: "${currentWordToPractice}"...`;
        } else {
            feedbackDisplay.textContent = 'Listening for full sentence...';
        }
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const confidence = event.results[0][0].confidence;

        const normalizeText = (text) => {
            return text.toLowerCase().replace(/[.,!?]/g, '');
        };

        if (currentWordToPractice) {
            const normalizedTranscriptWord = normalizeText(transcript);
            const normalizedTargetWord = normalizeText(currentWordToPractice);
            let resultMessage = `You said: "${transcript}". Target: "${currentWordToPractice}". `;
            if (normalizedTranscriptWord === normalizedTargetWord) {
                resultMessage += "Correct!";
            } else {
                resultMessage += "Try again.";
            }
            feedbackDisplay.textContent = resultMessage;
            // currentWordToPractice = null; // Reset after attempt - user might want to click main record button again
            // Let's keep currentWordToPractice set, so if they hit record again without clicking retry, it tries the same word.
            // To practice a new word or full sentence, they need to click "Speak Aloud" or another "Retry" button.
        } else {
            // Full sentence comparison
            const normalizedOriginal = normalizeText(currentOriginalText);
            const recognizedWords = normalizeText(transcript).split(/\s+/).filter(word => word.length > 0);
            const originalWords = normalizedOriginal.split(/\s+/).filter(word => word.length > 0);

            let htmlOutput = '';
            let mismatchesFound = false;
            const maxLength = Math.max(originalWords.length, recognizedWords.length);

            for (let i = 0; i < maxLength; i++) {
                const originalWord = originalWords[i];
                const recognizedWord = recognizedWords[i];

                if (i < originalWords.length && i < recognizedWords.length) {
                    if (originalWord === recognizedWord) {
                        htmlOutput += recognizedWord + ' ';
                    } else {
                        htmlOutput += `<span class="mismatched-word">${recognizedWord}</span><button class="retry-word-button" data-word="${originalWord}">Retry '${originalWord}'</button> `;
                        mismatchesFound = true;
                    }
                } else if (i < recognizedWords.length) { // Extra words in recognized text
                    htmlOutput += `<span class="mismatched-word">${recognizedWord}</span><button class="retry-word-button" data-word="${recognizedWord}">Retry '${recognizedWord}'</button> `;
                    mismatchesFound = true;
                } else if (i < originalWords.length) { // Words in original but missing in recognized
                    htmlOutput += `<span class="mismatched-word">(${originalWord})</span><button class="retry-word-button" data-word="${originalWord}">Retry '${originalWord}'</button> `;
                    mismatchesFound = true;
                }
            }

            recognizedTextDisplay.innerHTML = htmlOutput.trim();
            feedbackDisplay.textContent = ''; // Clear previous feedback

            if (mismatchesFound) {
                feedbackDisplay.textContent = 'Potential pronunciation differences are highlighted. Click a word to hear it, or "Retry" to practice it.';
            } else if (originalWords.length === 0 && recognizedWords.length === 0 && currentOriginalText.trim() !== '') {
                feedbackDisplay.textContent = 'No speech was recognized.';
            } else if (originalWords.length > 0) {
                feedbackDisplay.textContent = 'Texts match!';
            } else {
                feedbackDisplay.textContent = 'Nothing to compare. Please speak the text first.';
            }
        }
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        let errorMessage = `Error during recognition: ${event.error}.`;
        if (event.error === 'no-speech') {
            errorMessage = 'No speech was detected.';
            if (currentWordToPractice) {
                errorMessage += ` Expected: "${currentWordToPractice}".`;
            } else if (currentOriginalText.trim() !== '') {
                 recognizedTextDisplay.innerHTML = ''; // Clear any previous attempt
                 const originalWords = currentOriginalText.toLowerCase().replace(/[.,!?]/g, '').split(/\s+/).filter(word => word.length > 0);
                 let htmlOutput = '';
                 originalWords.forEach(word => {
                     htmlOutput += `<span class="mismatched-word">(${word})</span><button class="retry-word-button" data-word="${word}">Retry '${word}'</button> `;
                 });
                 recognizedTextDisplay.innerHTML = htmlOutput.trim();
                errorMessage += ' The expected words are shown above.';
            }
        } else if (event.error === 'not-allowed') {
            errorMessage = "Speech recognition permission denied. Please allow microphone access.";
        }
        feedbackDisplay.textContent = errorMessage;
        isRecording = false;
        recordButton.textContent = '🎤 Start Recording';
    };

    recognition.onend = () => {
        isRecording = false;
        recordButton.textContent = '🎤 Start Recording';
        if (currentWordToPractice && !feedbackDisplay.textContent.includes("You said:")) {
            // If recognition ended without a result for a practice word (e.g. stop button clicked early)
            // feedbackDisplay.textContent = `Ready to practice "${currentWordToPractice}". Click "Start Recording".`;
            // No, this is confusing. onend means it stopped. If they want to try again, they click retry or record.
        }
    };

} else {
    recordButton.disabled = true;
    const message = 'Sorry, your browser does not support Speech Recognition.';
    alert(message);
    feedbackDisplay.textContent = message;
}

// Event Delegation for recognizedTextDisplay
recognizedTextDisplay.addEventListener('click', (event) => {
    const target = event.target;

    // Check if a mismatched word span was clicked
    if (target.tagName === 'SPAN' && target.classList.contains('mismatched-word')) {
        const word = target.textContent.replace(/[()]/g, ''); // Clean parentheses if word was missing
        if (word && 'speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = 'en-US';
            window.speechSynthesis.speak(utterance);
        }
    }
    // Check if a retry button was clicked
    else if (target.tagName === 'BUTTON' && target.classList.contains('retry-word-button')) {
        const wordToPractice = target.dataset.word;
        if (wordToPractice) {
            currentWordToPractice = wordToPractice;
            feedbackDisplay.textContent = `Click '🎤 Start Recording' and say the word: "${currentWordToPractice}"`;
            recognizedTextDisplay.innerHTML = `Practicing word: <strong>${currentWordToPractice}</strong>`; // Clear comparison, show target word
        }
    }
});
