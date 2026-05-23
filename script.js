// storing the player name and score
let playerName = "";
let score = 0;
let currentQuestion = 0;
let selectedQuestions = [];
let timer;
let timeLeft = 15;

// all the quiz questions
const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Mode Link", "None of these"],
        answer: 0
    },
    {
        question: "Which planet is closest to the sun?",
        options: ["Venus", "Earth", "Mercury", "Mars"],
        answer: 2
    },
    {
        question: "What is 12 x 12?",
        options: ["124", "144", "132", "148"],
        answer: 1
    },
    {
        question: "Who invented the telephone?",
        options: ["Thomas Edison", "Nikola Tesla", "Alexander Graham Bell", "Albert Einstein"],
        answer: 2
    },
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Madrid", "Paris"],
        answer: 3
    },
    {
        question: "Which language runs in a web browser?",
        options: ["Python", "Java", "JavaScript", "C++"],
        answer: 2
    },
     {
        question: "What does CSS stand for?",
        options: ["Computer Style Sheet", "Cascading Style Sheet", "Creative Style System", "Coded Style Sheet"],
        answer: 1
    },
    {
        question: "How many sides does a hexagon have?",
        options: ["5", "7", "8", "6"],
        answer: 3
    },
    {
        question: "What is the largest ocean?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        answer: 3
    },
    {
        question: "Which company made the iPhone?",
        options: ["Samsung", "Apple", "Google", "Microsoft"],
        answer: 1
    },
    {
    question: "What is the speed of light?",
    options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "100,000 km/s"],
    answer: 0
},
{
    question: "Which planet is known as the Red Planet?",
    options: ["Jupiter", "Venus", "Mars", "Saturn"],
    answer: 2
},
{
    question: "How many bones are in the human body?",
    options: ["206", "208", "196", "212"],
    answer: 0
},
{
    question: "What gas do plants absorb?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    answer: 2
},
{
    question: "Who painted the Mona Lisa?",
    options: ["Picasso", "Van Gogh", "Leonardo da Vinci", "Michelangelo"],
    answer: 2
},
{
    question: "What is the largest continent?",
    options: ["Africa", "Asia", "Europe", "North America"],
    answer: 1
},
{
    question: "How many seconds in an hour?",
    options: ["3200", "3600", "4000", "2400"],
    answer: 1
},
{
    question: "What language is spoken in Brazil?",
    options: ["Spanish", "English", "French", "Portuguese"],
    answer: 3
},
{
    question: "What is the smallest planet?",
    options: ["Mars", "Venus", "Mercury", "Pluto"],
    answer: 2
},
{
    question: "Who wrote Romeo and Juliet?",
    options: ["Charles Dickens", "Shakespeare", "Mark Twain", "Homer"],
    answer: 1
},
{
    question: "What is H2O?",
    options: ["Oxygen", "Hydrogen", "Water", "Salt"],
    answer: 2
},
{
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    answer: 2
},
{
    question: "What is the currency of Japan?",
    options: ["Yuan", "Won", "Yen", "Peso"],
    answer: 2
},
{
    question: "Which animal is the fastest?",
    options: ["Lion", "Horse", "Cheetah", "Eagle"],
    answer: 2
},
{
    question: "What year did World War 2 end?",
    options: ["1943", "1944", "1946", "1945"],
    answer: 3
},
];

// this runs when player clicks lets go
function startGame() {
    playerName = document.getElementById("username").value;
    if (playerName.trim() === "") {
        alert("Please enter your name!");
        return;
    }
    score = 0;
    currentQuestion = 0;
    selectedQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 10);
    showScreen("quiz-screen");
    loadQuestion();
}

// loads the current question
function loadQuestion() {
    if (currentQuestion >= selectedQuestions.length) {
        endGame();
        return;
    }
    updateProgress();

    clearInterval(timer);
    timeLeft = 15;

    let q = selectedQuestions[currentQuestion];
    document.getElementById("question-number").textContent = "Question " + (currentQuestion + 1) + "/" + selectedQuestions.length;
    document.getElementById("question-text").textContent = q.question;
    document.getElementById("score-display").textContent = "Score: " + score;

    // building the option buttons
    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    q.options.forEach(function(option, index) {
        let btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = function() { checkAnswer(index); };
        optionsDiv.appendChild(btn);
    });

    startTimer();
}

// countdown timer
function startTimer() {
    document.getElementById("timer").textContent = "⏱ " + timeLeft;
    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timer").textContent = "⏱ " + timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            currentQuestion++;
            loadQuestion();
        }
    }, 1000);
}

// checking if answer is right or wrong
function checkAnswer(selected) {
    clearInterval(timer);
    let correct = selectedQuestions[currentQuestion].answer;
    
    let buttons = document.querySelectorAll("#options button");
    
    buttons[correct].style.background = "#2ecc71";
    if (selected !== correct) {
        buttons[selected].style.background = "#e74c3c";
    } else {
        score += 10;
    }
    
    setTimeout(function() {
        currentQuestion++;
        loadQuestion();
    }, 1000);
}
// showing the result at the end
function endGame() {
    showScreen("result-screen");
    updateLeaderboard();
    document.getElementById("final-score").textContent =
        playerName + ", you scored " + score + " out of " + (selectedQuestions.length * 10) + "!";
}

// restart from beginning
function restartGame() {
    showScreen("home-screen");
}

// helper to switch between screens
function showScreen(screenId) {
    document.getElementById("home-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.add("hidden");
    document.getElementById(screenId).classList.remove("hidden");
}

function updateProgress() {
    let progress = (currentQuestion / selectedQuestions.length) * 100;
    document.getElementById("progress-bar").style.width = progress + "%"
}
// saving and showing top scores
function updateLeaderboard() {
    let scores = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    scores.push({ name: playerName, score: score });
    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, 5);
    localStorage.setItem("leaderboard", JSON.stringify(scores));
    
    let list = document.getElementById("leaderboard-list");
    list.innerHTML = "";
    scores.forEach(function(entry, index) {
        let li = document.createElement("li");
        li.textContent = (index + 1) + ". " + entry.name + " - " + entry.score;
        list.appendChild(li);
    });
}
// showing home screen first
showScreen("home-screen");


