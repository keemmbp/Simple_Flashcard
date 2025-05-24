// Simple Flashcard App Logic
// script.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Flashcard App Initialized');

    const flashcardContainer = document.getElementById('flashcard-container');
    const flipButton = document.getElementById('flip-button');
    const nextButton = document.getElementById('next-button');
    const prevButton = document.getElementById('prev-button');
    const addCardForm = document.getElementById('add-card-form');
    const newQuestionInput = document.getElementById('new-question');
    const newAnswerInput = document.getElementById('new-answer');
    const toggleAddFormButton = document.getElementById('toggle-add-form-button');
    const addCardContainer = document.getElementById('add-card-container');
    const deleteButton = document.getElementById('delete-button');

    let flashcards = [];
    let currentCardIndex = 0;
    let isQuestionSide = true; // true for question, false for answer

    // Function to load flashcards from data.json and Local Storage
    async function loadFlashcards() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const defaultFlashcards = await response.json();
            
            const storedFlashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
            
            // Combine default and stored, giving preference to stored if there are any.
            // For simplicity, if local storage has items, we use them. Otherwise, use default.
            // A more robust merge might check for duplicates or offer choices.
            if (storedFlashcards.length > 0) {
                flashcards = storedFlashcards;
            } else {
                flashcards = defaultFlashcards;
            }

            if (flashcards.length > 0) {
                displayCard();
            } else {
                flashcardContainer.innerHTML = '<p>No flashcards found. Add some!</p>';
            }
        } catch (error) {
            console.error('Error loading flashcards:', error);
            flashcardContainer.innerHTML = '<p>Error loading flashcards. Please try again.</p>';
        }
    }

    // Function to display the current card
    function displayCard() {
        if (flashcards.length === 0 || currentCardIndex < 0 || currentCardIndex >= flashcards.length) {
            flashcardContainer.innerHTML = '<p>No more cards or invalid index.</p>';
            return;
        }

        const card = flashcards[currentCardIndex];
        const cardContent = isQuestionSide ? card.question : card.answer;
        
        // Using Semantic UI's card structure for better styling potential
        flashcardContainer.innerHTML = `
            <div class="ui card" style="width: 100%; min-height: 150px; display: flex; flex-direction: column; justify-content: center;">
                <div class="content">
                    <div class="description card-face">
                        ${cardContent}
                    </div>
                </div>
            </div>
        `;
        updateButtonStates();
    }

    // Function to update button states (prev/next)
    function updateButtonStates() {
        if (flashcards.length === 0) {
            prevButton.disabled = true;
            nextButton.disabled = true;
            flipButton.disabled = true;
            if (deleteButton) deleteButton.disabled = true;
        } else {
            prevButton.disabled = currentCardIndex === 0;
            nextButton.disabled = currentCardIndex === flashcards.length - 1;
            flipButton.disabled = false; // Should always be enabled if there's a card
            if (deleteButton) deleteButton.disabled = false; // Enable if cards exist
        }
    }

    // Initial load
    loadFlashcards();
    
    // Initially hide the add card form
    if (addCardContainer) { // Check if element exists
        addCardContainer.classList.add('hidden-form');
    }

    // Event Listeners for buttons
    flipButton.addEventListener('click', () => {
        isQuestionSide = !isQuestionSide;
        displayCard();
    });

    nextButton.addEventListener('click', () => {
        if (currentCardIndex < flashcards.length - 1) {
            currentCardIndex++;
            isQuestionSide = true; // Always show question side first on new card
            displayCard();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentCardIndex > 0) {
            currentCardIndex--;
            isQuestionSide = true; // Always show question side first on new card
            displayCard();
        }
    });

    // Event Listener for deleting the current card
    if (deleteButton) {
        deleteButton.addEventListener('click', () => {
            if (flashcards.length === 0) {
                return; // No cards to delete
            }

            if (window.confirm('Are you sure you want to delete this card?')) {
                flashcards.splice(currentCardIndex, 1);
                saveFlashcardsToLocalStorage();

                if (flashcards.length === 0) {
                    // currentCardIndex will be 0, displayCard will show "no cards"
                    flashcardContainer.innerHTML = '<p>No flashcards found. Add some!</p>';
                    // updateButtonStates will be called by displayCard, or call explicitly if displayCard isn't suitable here
                } else {
                    // Adjust currentCardIndex if necessary
                    if (currentCardIndex >= flashcards.length) {
                        currentCardIndex = flashcards.length - 1;
                    }
                    // If currentCardIndex became -1 (e.g. from deleting the only card and then setting to length-1)
                    // and flashcards still exist, it should be 0.
                    // However, the above check currentCardIndex >= flashcards.length handles this.
                    // If flashcards.length is 1, currentCardIndex becomes 0.
                    // If flashcards.length is 0, the above 'if' handles it.
                }
                // Always display the card, which also updates button states
                // If flashcards is empty, displayCard handles the message.
                isQuestionSide = true; // Reset to question side
                displayCard();
            }
        });
    }

    // Event Listener for toggling the add card form
    if (toggleAddFormButton && addCardContainer) { // Check if elements exist
        toggleAddFormButton.addEventListener('click', () => {
            addCardContainer.classList.toggle('hidden-form');
            if (addCardContainer.classList.contains('hidden-form')) {
                toggleAddFormButton.innerHTML = '<i class="plus icon"></i> Add New Card';
            } else {
                toggleAddFormButton.innerHTML = '<i class="minus icon"></i> Hide Form';
                newQuestionInput.focus(); // Focus on the first input when shown
            }
        });
    }

    // Function to save flashcards to Local Storage
    function saveFlashcardsToLocalStorage() {
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
    }

    // Event Listener for adding a new card
    addCardForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const question = newQuestionInput.value.trim();
        const answer = newAnswerInput.value.trim();

        if (question && answer) {
            const newCard = { question, answer };
            flashcards.push(newCard);
            saveFlashcardsToLocalStorage();

            // Optionally, display the new card or the last card
            currentCardIndex = flashcards.length - 1;
            isQuestionSide = true;
            displayCard();

            // Clear input fields
            newQuestionInput.value = '';
            newAnswerInput.value = '';

            // Give focus to the question input for easy next entry
            newQuestionInput.focus();
            
            console.log('New card added:', newCard);
        } else {
            // Consider showing an error message to the user via UI
            alert('Please enter both a question and an answer.');
        }
    });
});