let quizData = {};
let userAnswers = {};
let timerInterval;
let timeLeft;

function loadUploadedQuiz() {
    const fileInput = document.getElementById('json-upload');
    const timeInput = document.getElementById('time-limit');

    if (!fileInput.files.length) {
        alert("Please upload a JSON file.");
        return;
    }
    const timeMinutes = parseInt(timeInput.value);
    if (isNaN(timeMinutes) || timeMinutes <= 0) {
        alert("Please enter a valid time limit in minutes.");
        return;
    }
    timeLeft = timeMinutes * 60; // Convert minutes to seconds

    const file = fileInput.files[0];
    const fileName = file.name.replace(".json", ""); // Remove file extension
    document.getElementById('quiz-title').textContent = `${fileName} Quiz`; // Set quiz title dynamically

    const reader = new FileReader();

    reader.onload = function(event) {
        try {
            quizData = JSON.parse(event.target.result);
            if (!quizData.questions || !Array.isArray(quizData.questions)) {
                alert("Invalid JSON format: missing questions array.");
                return;
            }
            // Hide the upload section and show the quiz section
            document.getElementById('upload-section').classList.add('hidden');
            document.getElementById('quiz-section').classList.remove('hidden');
            initializeQuiz();
        } catch (err) {
            alert("Error parsing JSON file.");
        }
    };

    reader.readAsText(file);
}

function initializeQuiz() {
    // Start the timer
    timerInterval = setInterval(updateTimer, 1000);
    
    // Render questions
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = ""; // Clear any previous content
    quizData.questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <h3>Q${index + 1}: ${q.question}</h3>
            <div class="options">
                ${q.options.map((option, i) => `
                    <label>
                        <input type="radio" name="q${index}" value="${i}">
                        ${option}
                    </label>
                `).join('')}
            </div>
        `;
        quizContainer.appendChild(questionDiv);
    });

    // Listen for answer selections
    document.querySelectorAll('input[type="radio"]').forEach(input => {
        input.addEventListener('change', (e) => {
            const questionNum = e.target.name.substring(1); // Remove the "q" prefix
            userAnswers[questionNum] = parseInt(e.target.value);
        });
    });
}

function updateTimer() {
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        submitQuiz();
        return;
    }
    
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = 
        `Time Left: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function submitQuiz() {
    clearInterval(timerInterval);
    document.getElementById('submit-btn').disabled = true;
    document.getElementById('quiz-container').classList.add('hidden');
    showResults();
}

function showResults() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.classList.remove('hidden');
    
    let score = 0;
    let resultsHTML = '<h2>Quiz Results</h2>';
    
    quizData.questions.forEach((q, index) => {
        const userAnswer = userAnswers[index] ?? -1;
        const isCorrect = userAnswer === q.correct_index;
        if (isCorrect) score++;
        
        resultsHTML += `
            <div class="result-item ${isCorrect ? 'correct' : 'incorrect'}">
                <h4>Q${index + 1}: ${q.question}</h4>
                <p>Your answer: ${userAnswer !== -1 ? q.options[userAnswer] : 'No answer'}</p>
                <p>Correct answer: ${q.options[q.correct_index]}</p>
                <p class="explanation">Explanation: ${q.explanation}</p>
            </div>
        `;
    });
    
    resultsHTML = `<h3>Your Score: ${score} / ${quizData.questions.length}</h3>` + resultsHTML;
    resultsDiv.innerHTML = resultsHTML;
}

// Bind submit button event
document.getElementById('submit-btn').addEventListener('click', submitQuiz);
