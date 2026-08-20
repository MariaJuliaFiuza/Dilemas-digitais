// ==========================================
// MENU MOBILE
// ==========================================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    menuToggle.textContent =
        navMenu.classList.contains("active")
            ? "✕"
            : "☰";
});

document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.textContent = "☰";
    });
});


// ==========================================
// DESAFIO DIGITAL
// ==========================================

const challengeButton =
    document.getElementById("challengeButton");

const challengeResult =
    document.getElementById("challengeResult");

challengeButton.addEventListener("click", () => {

    challengeResult.classList.add("show");

    challengeButton.innerHTML =
        "Desafio ativado ✓";

    challengeButton.style.opacity = "0.7";

    challengeButton.disabled = true;
});


// ==========================================
// QUIZ
// ==========================================

const questions = [

    {
        question:
            "Qual é o principal problema apresentado no dilema digital deste site?",

        answers: [
            "A existência de qualquer tecnologia",
            "A dificuldade de manter controle consciente sobre o uso da tecnologia",
            "A falta de acesso às redes sociais",
            "A ausência de dispositivos eletrônicos"
        ],

        correct: 1,

        feedback:
            "O dilema está relacionado ao equilíbrio: a tecnologia pode ser útil, mas seu uso automático ou excessivo pode ocupar nossa atenção e nosso tempo."
    },

    {
        question:
            "Qual atitude pode ajudar a diminuir distrações causadas pelo celular?",

        answers: [
            "Ativar todas as notificações",
            "Usar várias redes sociais simultaneamente",
            "Desativar notificações que não são importantes",
            "Manter o celular sempre aberto durante uma tarefa"
        ],

        correct: 2,

        feedback:
            "Desativar notificações desnecessárias pode diminuir interrupções e ajudar a preservar períodos de concentração."
    },

    {
        question:
            "Qual atitude é mais adequada ao encontrar uma informação duvidosa na internet?",

        answers: [
            "Compartilhar imediatamente",
            "Verificar a fonte e comparar informações",
            "Acreditar porque recebeu muitas curtidas",
            "Compartilhar somente com amigos"
        ],

        correct: 1,

        feedback:
            "Verificar fontes e comparar informações ajuda a avaliar melhor a confiabilidade de um conteúdo antes de compartilhá-lo."
    },

    {
        question:
            "Qual comportamento ajuda a proteger a privacidade digital?",

        answers: [
            "Publicar informações pessoais sem pensar",
            "Usar a mesma senha em todos os serviços",
            "Compartilhar documentos pessoais nas redes",
            "Revisar configurações de privacidade e permissões"
        ],

        correct: 3,

        feedback:
            "Revisar configurações de privacidade e permissões ajuda a controlar quais informações e recursos ficam acessíveis."
    },

    {
        question:
            "O que significa ter equilíbrio digital?",

        answers: [
            "Nunca utilizar dispositivos eletrônicos",
            "Usar tecnologia durante o maior tempo possível",
            "Utilizar tecnologia de maneira consciente, estabelecendo limites",
            "Excluir todas as redes sociais"
        ],

        correct: 2,

        feedback:
            "Equilíbrio digital não significa abandonar a tecnologia, mas utilizá-la de maneira consciente e compatível com outras áreas da vida."
    }

];

let currentQuestion = 0;
let score = 0;
let questionAnswered = false;


// ELEMENTOS

const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const feedbackElement =
    document.getElementById("feedback");

const nextButton =
    document.getElementById("nextQuestion");

const questionCounter =
    document.getElementById("questionCounter");

const scoreDisplay =
    document.getElementById("scoreDisplay");

const quizProgress =
    document.getElementById("quizProgress");

const quizBox =
    document.querySelector(".quiz-box");

const quizResult =
    document.getElementById("quizResult");

const resultScore =
    document.getElementById("resultScore");

const resultTitle =
    document.getElementById("resultTitle");

const resultText =
    document.getElementById("resultText");

const restartQuiz =
    document.getElementById("restartQuiz");


// ==========================================
// MOSTRAR PERGUNTA
// ==========================================

function loadQuestion() {

    questionAnswered = false;

    const question =
        questions[currentQuestion];

    questionElement.textContent =
        question.question;

    questionCounter.textContent =
        `QUESTÃO ${String(currentQuestion + 1).padStart(2, "0")} / ${questions.length}`;

    scoreDisplay.textContent =
        `${score} ${score === 1 ? "PONTO" : "PONTOS"}`;

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    quizProgress.style.width =
        `${progress}%`;

    answersElement.innerHTML = "";

    feedbackElement.classList.remove("show");

    feedbackElement.textContent = "";

    nextButton.classList.remove("show");


    question.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.classList.add("answer");

        button.innerHTML = `
            <span class="answer-letter">
                ${String.fromCharCode(65 + index)}
            </span>

            <span>
                ${answer}
            </span>
        `;

        button.addEventListener(
            "click",
            () => selectAnswer(button, index)
        );

        answersElement.appendChild(button);
    });
}


// ==========================================
// SELECIONAR RESPOSTA
// ==========================================

function selectAnswer(button, selectedIndex) {

    if (questionAnswered) return;

    questionAnswered = true;

    const question =
        questions[currentQuestion];

    const allAnswers =
        document.querySelectorAll(".answer");


    allAnswers.forEach(answer => {
        answer.classList.add("disabled");
        answer.disabled = true;
    });


    if (selectedIndex === question.correct) {

        button.classList.add("correct");

        score++;

        feedbackElement.textContent =
            `Resposta correta! ${question.feedback}`;

    } else {

        button.classList.add("wrong");

        allAnswers[
            question.correct
        ].classList.add("correct");

        feedbackElement.textContent =
            `Resposta incorreta. ${question.feedback}`;
    }


    feedbackElement.classList.add("show");

    scoreDisplay.textContent =
        `${score} ${score === 1 ? "PONTO" : "PONTOS"}`;

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "Ver resultado →"
            : "Próxima questão →";

    nextButton.classList.add("show");
}


// ==========================================
// PRÓXIMA QUESTÃO
// ==========================================

nextButton.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showResult();
    }
});


// ==========================================
// RESULTADO
// ==========================================

function showResult() {

    quizBox.classList.add("hidden");

    quizResult.classList.remove("hidden");

    resultScore.textContent =
        score;


    if (score === 5) {

        resultTitle.textContent =
            "Excelente!";

        resultText.textContent =
            "Você demonstrou uma ótima compreensão dos dilemas digitais e das atitudes que podem ajudar a construir uma relação mais consciente com a tecnologia.";

    } else if (score >= 3) {

        resultTitle.textContent =
            "Muito bem!";

        resultText.textContent =
            "Você já conhece os principais desafios do mundo digital. Agora, o próximo passo é transformar esse conhecimento em hábitos.";

    } else {

        resultTitle.textContent =
            "Continue explorando!";

        resultText.textContent =
            "Os dilemas digitais fazem parte da nossa rotina. Reveja as seções do site e tente novamente para aprofundar seu conhecimento.";
    }
}


// ==========================================
// REINICIAR
// ==========================================

restartQuiz.addEventListener("click", () => {

    currentQuestion = 0;

    score = 0;

    quizResult.classList.add("hidden");

    quizBox.classList.remove("hidden");

    loadQuestion();

    document
        .getElementById("quiz")
        .scrollIntoView({
            behavior: "smooth"
        });
});


// ==========================================
// INICIAR
// ==========================================

loadQuestion();


// ==========================================
// ANIMAÇÃO AO ENTRAR NA TELA
// ==========================================

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";
                }
            });

        },
        {
            threshold: 0.12
        }
    );


document
    .querySelectorAll(
        ".dilemma-card, .impact-card, .step"
    )
    .forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(25px)";

        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

        observer.observe(element);
    });