let quizData = {};
let userAnswers = {};
let timerInterval;
let timeLeft;

// Predefined quizzes data
const predefinedQuizzes = {
    history: {
        questions: [
            {
                question: "Who was the first President of the United States?",
                options: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"],
                correct_index: 1,
                explanation: "George Washington served as the first U.S. President from 1789 to 1797."
            },
            {
                question: "In which year did World War II end?",
                options: ["1943", "1945", "1947", "1950"],
                correct_index: 1,
                explanation: "World War II ended in 1945 with the surrender of Germany and Japan."
            },
            {
                question: "The Industrial Revolution began in which country?",
                options: ["France", "United States", "Germany", "Great Britain"],
                correct_index: 3,
                explanation: "The Industrial Revolution began in Great Britain in the late 18th century."
            },
            {
                question: "Who wrote the 'I Have a Dream' speech?",
                options: ["Malcolm X", "Martin Luther King Jr.", "Rosa Parks", "Frederick Douglass"],
                correct_index: 1,
                explanation: "Martin Luther King Jr. delivered his famous 'I Have a Dream' speech in 1963."
            },
            {
                question: "The ancient Egyptian writing system is called:",
                options: ["Cuneiform", "Hieroglyphics", "Sanskrit", "Latin"],
                correct_index: 1,
                explanation: "Hieroglyphics was the formal writing system used in Ancient Egypt."
            },
            {
                question: "Which empire was ruled by Julius Caesar?",
                options: ["Greek", "Roman", "Persian", "Ottoman"],
                correct_index: 1,
                explanation: "Julius Caesar was a Roman general and statesman who played a critical role in the rise of the Roman Empire."
            },
            {
                question: "The Magna Carta was signed in which year?",
                options: ["1066", "1215", "1492", "1776"],
                correct_index: 1,
                explanation: "The Magna Carta was signed by King John of England in 1215."
            },
            {
                question: "Who discovered America in 1492?",
                options: ["Vasco da Gama", "Christopher Columbus", "Ferdinand Magellan", "Marco Polo"],
                correct_index: 1,
                explanation: "Christopher Columbus made his first voyage to the Americas in 1492."
            },
            {
                question: "The French Revolution began in:",
                options: ["1789", "1804", "1776", "1812"],
                correct_index: 0,
                explanation: "The French Revolution began in 1789 with the storming of the Bastille."
            },
            {
                question: "Which civilization built the Machu Picchu?",
                options: ["Aztec", "Maya", "Inca", "Olmec"],
                correct_index: 2,
                explanation: "Machu Picchu was built by the Inca civilization in the 15th century."
            }
        ]
    },
    science: {
        questions: [
            {
                question: "What is the chemical symbol for gold?",
                options: ["Go", "Gd", "Au", "Ag"],
                correct_index: 2,
                explanation: "The chemical symbol for gold is Au, from the Latin 'aurum'."
            },
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Venus", "Mars", "Jupiter", "Saturn"],
                correct_index: 1,
                explanation: "Mars is called the Red Planet due to iron oxide on its surface."
            },
            {
                question: "What is the powerhouse of the cell?",
                options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
                correct_index: 2,
                explanation: "Mitochondria are known as the powerhouse of the cell because they generate energy."
            },
            {
                question: "Which gas do plants absorb during photosynthesis?",
                options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
                correct_index: 2,
                explanation: "Plants absorb carbon dioxide (CO2) during photosynthesis."
            },
            {
                question: "What is the hardest natural substance on Earth?",
                options: ["Gold", "Iron", "Diamond", "Quartz"],
                correct_index: 2,
                explanation: "Diamond is the hardest known natural material on Earth."
            },
            {
                question: "Which scientist developed the theory of relativity?",
                options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"],
                correct_index: 1,
                explanation: "Albert Einstein developed the theory of relativity."
            },
            {
                question: "What is the pH value of pure water?",
                options: ["5", "7", "9", "12"],
                correct_index: 1,
                explanation: "Pure water has a neutral pH of 7."
            },
            {
                question: "Which element has the atomic number 1?",
                options: ["Helium", "Hydrogen", "Oxygen", "Carbon"],
                correct_index: 1,
                explanation: "Hydrogen has the atomic number 1 in the periodic table."
            },
            {
                question: "What is the speed of light in a vacuum?",
                options: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "1,000,000 km/s"],
                correct_index: 0,
                explanation: "The speed of light in a vacuum is approximately 300,000 kilometers per second."
            },
            {
                question: "Which blood type is known as the universal donor?",
                options: ["A", "B", "AB", "O"],
                correct_index: 3,
                explanation: "Type O negative blood is considered the universal donor."
            }
        ]
    },
    math: {
        questions: [
            {
                question: "What is the value of π (pi) to two decimal places?",
                options: ["3.14", "3.16", "3.12", "3.18"],
                correct_index: 0,
                explanation: "π (pi) is approximately 3.14159, so 3.14 to two decimal places."
            },
            {
                question: "What is the square root of 64?",
                options: ["6", "7", "8", "9"],
                correct_index: 2,
                explanation: "8 × 8 = 64, so the square root of 64 is 8."
            },
            {
                question: "Solve for x: 2x + 5 = 15",
                options: ["5", "10", "7.5", "2.5"],
                correct_index: 0,
                explanation: "2x + 5 = 15 → 2x = 10 → x = 5."
            },
            {
                question: "What is the area of a triangle with base 10 and height 5?",
                options: ["15", "20", "25", "50"],
                correct_index: 2,
                explanation: "Area = (base × height)/2 = (10 × 5)/2 = 25."
            },
            {
                question: "What is 3 to the power of 4?",
                options: ["12", "27", "64", "81"],
                correct_index: 3,
                explanation: "3^4 = 3 × 3 × 3 × 3 = 81."
            },
            {
                question: "What is the next number in the sequence: 2, 4, 8, 16, ...?",
                options: ["20", "24", "32", "64"],
                correct_index: 2,
                explanation: "This is a geometric sequence where each number is multiplied by 2 (2×2=4, 4×2=8, etc.)."
            },
            {
                question: "What is the sum of the angles in a triangle?",
                options: ["90°", "180°", "270°", "360°"],
                correct_index: 1,
                explanation: "The sum of the interior angles in any triangle is always 180 degrees."
            },
            {
                question: "What is 25% of 200?",
                options: ["25", "50", "75", "100"],
                correct_index: 1,
                explanation: "25% of 200 = 0.25 × 200 = 50."
            },
            {
                question: "What is the perimeter of a square with side length 5?",
                options: ["10", "15", "20", "25"],
                correct_index: 2,
                explanation: "Perimeter of a square = 4 × side length = 4 × 5 = 20."
            },
            {
                question: "If y = 2x + 3 and x = 4, what is y?",
                options: ["5", "9", "11", "14"],
                correct_index: 2,
                explanation: "y = 2(4) + 3 = 8 + 3 = 11."
            }
        ]
    }
};

function loadPredefinedQuiz(quizType) {
    quizData = predefinedQuizzes[quizType];
    timeLeft = 5 * 60; // 5 minutes in seconds
    
    // Set quiz title
    const quizTitle = quizType.charAt(0).toUpperCase() + quizType.slice(1) + " Quiz";
    document.getElementById('quiz-title').textContent = quizTitle;
    
    // Hide the upload section and show the quiz section
    document.getElementById('upload-section').classList.add('hidden');
    document.getElementById('quiz-section').classList.remove('hidden');
    
    initializeQuiz();
}

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
