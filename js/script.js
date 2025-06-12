// Données du quiz par niveau de difficulté
const quizData = {
    easy: [
        {
            question: "Quelle est la capitale de la France?",
            options: ["Londres", "Berlin", "Paris", "Madrid"],
            correct: 2
        },
        {
            question: "Combien de planètes y a-t-il dans notre système solaire?",
            options: ["7", "8", "9", "10"],
            correct: 1
        },
        {         
            question: "Quelle est la couleur du ciel par temps clair?",
            options: ["Rouge", "Vert", "Bleu", "Jaune"],
            correct: 2
        },
        {
            question: "Quel animal est connu comme le meilleur ami de l'homme?",
            options: ["Chat", "Chien", "Perroquet", "Hamster"],
            correct: 1
        },
        {
            question: "Combien de jours y a-t-il dans une semaine?",
            options: ["5", "6", "7", "8"],
            correct: 2
        }
    ],
    medium: [
        {
            question: "Quel est le plus grand océan du monde?",
            options: ["Océan Atlantique", "Océan Indien", "Océan Arctique", "Océan Pacifique"],
            correct: 3
        },
        {
            question: "Qui a peint la Joconde?",
            options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
            correct: 2
        },
        {
            question: "Quel est l'élément chimique le plus abondant dans l'univers?",
            options: ["Oxygène", "Carbone", "Hydrogène", "Hélium"],
            correct: 2
        },
        {
            question: "En quelle année la Première Guerre mondiale a-t-elle commencé?",
            options: ["1914", "1916", "1918", "1920"],
            correct: 0
        },
        {
            question: "Quelle est la plus grande planète du système solaire?",
            options: ["Terre", "Mars", "Jupiter", "Saturne"],
            correct: 2
        }
    ],
    hard: [
        {
            question: "Quel est le plus grand pays du monde en termes de superficie?",
            options: ["Chine", "États-Unis", "Canada", "Russie"],
            correct: 3
        },
        {
            question: "Quelle est la formule chimique de l'eau oxygénée?",
            options: ["H2O", "H2O2", "CO2", "O3"],
            correct: 1
        },
        {
            question: "Qui a formulé la théorie de la relativité?",
            options: ["Isaac Newton", "Niels Bohr", "Albert Einstein", "Stephen Hawking"],
            correct: 2
        },
        {
            question: "Quel est le plus petit pays du monde?",
            options: ["Monaco", "Nauru", "Vatican", "Liechtenstein"],
            correct: 2
        },
        {
            question: "Quelle est la vitesse approximative de la lumière dans le vide?",
            options: ["300 000 km/s", "150 000 km/s", "500 000 km/s", "1 000 000 km/s"],
            correct: 0
        }
    ]
};

// Éléments du DOM - Page d'accueil
const homeScreen = document.getElementById('home-screen');
const easyButton = document.getElementById('easy-btn');
const mediumButton = document.getElementById('medium-btn');
const hardButton = document.getElementById('hard-btn');

// Éléments du DOM - Écran de quiz
const quizScreen = document.getElementById('quiz-screen');
const questionElement = document.getElementById('question');
const currentQuestionElement = document.getElementById('current-question');
const totalQuestionsElement = document.getElementById('total-questions');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const totalScoreElement = document.getElementById('total-score');
const restartButton = document.getElementById('restart-btn');
const homeButton = document.getElementById('home-btn');

// Variables du quiz
let currentQuestionIndex = 0;
let score = 0;
let currentQuestions = [];
let currentDifficulty = '';

// Événements - Boutons de difficulté
easyButton.addEventListener('click', () => startQuiz('easy'));
mediumButton.addEventListener('click', () => startQuiz('medium'));
hardButton.addEventListener('click', () => startQuiz('hard'));

// Événements - Contrôles du quiz
restartButton.addEventListener('click', () => startQuiz(currentDifficulty));
homeButton.addEventListener('click', goToHome);

// Fonctions
function startQuiz(difficulty) {
    // Cacher l'écran d'accueil et afficher l'écran de quiz
    homeScreen.classList.add('hide');
    quizScreen.classList.remove('hide');
    scoreContainer.classList.add('hide');
    
    // Réinitialiser le quiz
    currentDifficulty = difficulty;
    currentQuestionIndex = 0;
    score = 0;
    currentQuestions = quizData[difficulty];
    
    // Mettre à jour les compteurs
    totalQuestionsElement.textContent = currentQuestions.length;
    totalScoreElement.textContent = currentQuestions.length;
    
    // Afficher la première question
    showQuestion();
}

function showQuestion() {
    // Mettre à jour le compteur de questions
    currentQuestionElement.textContent = currentQuestionIndex + 1;
    
    // Afficher la question
    const questionData = currentQuestions[currentQuestionIndex];
    questionElement.textContent = questionData.question;
    
    // Créer les options
    const optionsGrid = document.querySelector('.options-grid');
    optionsGrid.innerHTML = '';
    
    const optionLetters = ['A', 'B', 'C', 'D'];
    
    questionData.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.dataset.index = index;
        
        optionElement.innerHTML = `
            <span class="option-letter">${optionLetters[index]}</span>
            <span class="option-text">${option}</span>
        `;
        
        optionElement.addEventListener('click', selectAnswer);
        optionsGrid.appendChild(optionElement);
    });
}

function selectAnswer(e) {
    const selectedOption = e.currentTarget;
    const selectedAnswer = parseInt(selectedOption.dataset.index);
    const correctAnswer = currentQuestions[currentQuestionIndex].correct;
    
    // Désactiver les clics sur toutes les options
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.removeEventListener('click', selectAnswer);
        option.style.cursor = 'default';
    });
    
    // Vérifier si la réponse est correcte
    const isCorrect = selectedAnswer === correctAnswer;
    
    if (isCorrect) {
        selectedOption.classList.add('correct');
        score++;
    } else {
        selectedOption.classList.add('incorrect');
        // Montrer la bonne réponse
        options[correctAnswer].classList.add('correct');
    }
    
    // Passer à la question suivante après un délai
    setTimeout(() => {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < currentQuestions.length) {
            showQuestion();
        } else {
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    document.querySelector('.quiz-container').classList.add('hide');
    scoreContainer.classList.remove('hide');
    scoreElement.textContent = score;
}

function goToHome() {
    quizScreen.classList.add('hide');
    homeScreen.classList.remove('hide');
    document.querySelector('.quiz-container').classList.remove('hide');
}

let timer;
let timeLeft = 15;

function updateTimer() {
    timerElement.textContent = `Temps restant : ${timeLeft}s`;
    if (timeLeft <= 5) {
        timerElement.style.color = "red";
    } else {
        timerElement.style.color = "white";
    }
}

function startTimer(callbackOnEnd) {
    clearInterval(timer); // Réinitialise tout timer précédent
    timeLeft = 15;
    updateTimer();

    timer = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            clearInterval(timer);
            callbackOnEnd(); // Appelle la fonction quand le temps est écoulé
        }
    }, 1000);
}
