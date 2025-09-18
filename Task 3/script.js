
    // Interactive Quiz
    const quizData = [
      {
        question: "Which language runs in the browser?",
        options: ["Python", "JavaScript", "C++", "Java"],
        answer: "JavaScript"
      },
      {
        question: "Which HTML tag is used for the largest heading?",
        options: ["<h1>", "<h6>", "<title>", "<heading>"],
        answer: "<h1>"
      },
      {
        question: "CSS stands for?",
        options: ["Color Style Sheet", "Cascading Style Sheet", "Computer Style Sheet", "Creative Style System"],
        answer: "Cascading Style Sheet"
      }
    ]

    let currentQuestion = 0
    let score = 0

    function loadQuestion() {
      document.getElementById("quizResult").textContent = ""
      let q = quizData[currentQuestion]
      document.getElementById("quizQuestion").textContent = q.question
      let optionsDiv = document.getElementById("quizOptions")
      optionsDiv.innerHTML = ""
      q.options.forEach(opt => {
        let btn = document.createElement("button")
        btn.textContent = opt
        btn.onclick = () => checkAnswer(opt)
        optionsDiv.appendChild(btn)
      })
    }

    function checkAnswer(selected) {
      if (selected === quizData[currentQuestion].answer) {
        score++
        document.getElementById("quizResult").textContent = "✅ Correct!"
      } else {
        document.getElementById("quizResult").textContent = "❌ Wrong!"
      }
    }

    document.getElementById("nextBtn").addEventListener("click", () => {
      currentQuestion++
      if (currentQuestion < quizData.length) {
        loadQuestion();
      } else {
        document.getElementById("quizQuestion").textContent = "Quiz Finished!";
        document.getElementById("quizOptions").innerHTML = "";
        document.getElementById("quizResult").textContent = `Your score: ${score}/${quizData.length}`
        document.getElementById("nextBtn").style.display = "none"
      }
    })

    loadQuestion();

    // Fetch API Example
    async function fetchJoke() {
      try {
        let response = await fetch("https://official-joke-api.appspot.com/random_joke")
        let data = await response.json();
        document.getElementById("joke").innerHTML = `${data.setup} <br><br> 👉 ${data.punchline}`
      } catch (error) {
        document.getElementById("joke").innerText = "Oops! Could not load a joke."
      }
    }
    fetchJoke()