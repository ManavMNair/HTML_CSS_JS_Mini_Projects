const startScreen = document.getElementById("initial-screen")
const quizScreen = document.getElementById("quiz-screen")
const resultScreen = document.getElementById("result-screen")
const startBtn = document.getElementById("start-btn")
const questionText = document.getElementById("question-text")
const questionNumber = document.getElementById("question-number")
const totalQuestion = document.getElementById("total-question")
const totalQuestions = document.getElementById("total-questions")
const score = document.getElementById("score")
const finalScore = document.getElementById("final-score")
const progressBar = document.getElementById("progress-bar-fill")
const resultMessage = document.getElementById("result-message")
const answerContainer = document.getElementById("option-section")
const reStartBtn = document.getElementById("restart-btn")


const quizQuestions = [
    {
        questions: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false },
        ],
    },
    {
        questions: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },
        ],
    },
    {
        questions: "Who wrote the play 'Romeo and Juliet'?",
        answers: [
            { text: "Charles Dickens", correct: false },
            { text: "William Shakespeare", correct: true },
            { text: "Jane Austen", correct: false },
            { text: "Mark Twain", correct: false },
        ],
    },
    {
        questions: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
            { text: "Arctic Ocean", correct: false },
        ],
    },
    {
        questions: "How many continents are there in the world?",
        answers: [
            { text: "5", correct: false },
            { text: "6", correct: false },
            { text: "7", correct: true },
            { text: "8", correct: false },
        ],
    }
];



let currentQuestionIndex = 0;
let CurrentScore = 0
let answerDisabled = false


startBtn.addEventListener("click",startQuiz)
reStartBtn.addEventListener("click",reStartQuiz)

function startQuiz(){
    // console.log("Quiz started")
    
    currentQuestionIndex = 0;
    CurrentScore = 0
    // score = 0
    score.textContent = CurrentScore
    startScreen.classList.remove("active")
    quizScreen.classList.add("active")
    showQuestion()


}

function showQuestion(){
    answerDisabled = false
    const currentQuestion = quizQuestions[currentQuestionIndex]
    questionText.textContent = currentQuestion.questions

    // console.log(questionText.textContent)
    questionNumber.textContent = currentQuestionIndex + 1
    totalQuestion.textContent = quizQuestions.length 

    const progressbar = (currentQuestionIndex/quizQuestions.length) * 100
    // console.log(progressbar)
    progressBar.style.width = progressbar +"%"



    answerContainer.innerHTML = ""  //This is for removing the previous question options from the screen

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button")
        button.textContent = answer.text
        button.classList.add("options-btn")


        button.dataset.correct = answer.correct
        button.addEventListener("click",selectAnswer)

        answerContainer.appendChild(button)
    })
}

function selectAnswer(event){
    if(answerDisabled) return
    answerDisabled = true
    const selectedBtn = event.target

    const isCorrect = selectedBtn.dataset.correct ==="true"
    // console.log(isCorrect)

    // if (selectedBtn.dataset.correct === "true") {
    //     selectedBtn.classList.add("correct");
    // } else {
    //     selectedBtn.classList.add("incorrect");
    // }

    Array.from(answerContainer.children).forEach((button)=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }else if (button === selectedBtn){
            button.classList.add("incorrect")
        }

    })

    if(isCorrect){
        CurrentScore++;
        score.textContent = CurrentScore
    }
    setTimeout(()=>{
        currentQuestionIndex++;
        if(currentQuestionIndex < quizQuestions.length){
            showQuestion()
        }else{
            showResult(CurrentScore)
        }
    },1000)

}

function showResult(CurrentScore){
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    // console.log(CurrentScore)
    finalScore.textContent = CurrentScore
    totalQuestions.textContent = quizQuestions.length
     
    const percentage = (CurrentScore/quizQuestions.length) * 100

    resultMessage.textContent = getComplimentMessage(percentage)

}

function getComplimentMessage(scorePercentage) {
  if (scorePercentage === 100) {
    return "Perfect! You are a genius!";
  } else if (scorePercentage >= 90) {
    return "Excellent work! You're almost perfect!";
  } else if (scorePercentage >= 75) {
    return "Great job! You're doing really well!";
  } else if (scorePercentage >= 60) {
    return "Good effort! Keep practicing!";
  } else if (scorePercentage > 40) {
    return "You're getting there! Study a bit more!";
  } else {
    return "Don't worry, study hard and you'll improve!";
  }
}




function reStartQuiz(){
    // console.log("Quiz restarted")

    resultScreen.classList.remove("active")
    startQuiz()

}
