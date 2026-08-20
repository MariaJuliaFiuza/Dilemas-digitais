// ================================
// MENU MOBILE
// ================================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuBtn.textContent = "✕";
    } else {
        menuBtn.textContent = "☰";
    }
});

// Fecha o menu ao clicar em um link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.textContent = "☰";
    });
});


// ================================
// DESAFIO DIGITAL
// ================================

const challengeBtn = document.getElementById("challengeBtn");
const challengeMessage = document.getElementById("challengeMessage");

challengeBtn.addEventListener("click", () => {
    challengeMessage.textContent =
        "Desafio aceito! Escolha um período hoje para ficar longe das redes sociais e observe como você utiliza esse tempo.";

    challengeBtn.textContent = "Desafio aceito ✓";
    challengeBtn.style.opacity = "0.7";
    challengeBtn.disabled = true;
});


// ================================
// QUIZ
// ================================

const questions = [
    {
        question:
            "Qual é uma das principais características de um uso consciente da tecnologia?",
        options: [
            "Usar todas as redes sociais ao mesmo tempo",
            "Estabelecer limites para o tempo e a forma de uso",
            "Manter todas as notificações ativadas",
            "Compartilhar informações pessoais frequentemente"
        ],
        answer: 1,
        explanation:
            "Definir limites ajuda a manter a tecnologia como uma ferramenta, em vez de permitir que ela controle toda a rotina."
    },

    {
        question:
            "Por que notificações constantes podem ser um problema?",
        options: [
            "Porque tornam o celular mais lento",
            "Porque impedem qualquer acesso à internet",
            "Porque podem interromper a concentração e o descanso",
            "Porque eliminam automaticamente as mensagens"
        ],
        answer: 2,
        explanation:
            "Notificações frequentes podem interromper tarefas, estudos e momentos de descanso."
    },

    {
        question:
            "Qual atitude contribui para proteger a privacidade no ambiente digital?",
        options: [
            "Publicar informações pessoais sem verificar a privacidade",
            "Usar a mesma senha em todos os serviços",
            "Compartilhar documentos pessoais nas redes sociais",
            "Revisar configurações de privacidade e pensar antes de publicar"
        ],
        answer: 3,
        explanation:
            "Revisar as configurações de privacidade e pensar antes de compartilhar informações reduz a exposição desnecessária."
    },

    {
        question:
            "Diante de uma informação duvidosa encontrada nas redes sociais, qual atitude é mais adequada?",
        options: [
            "Compartilhar imediatamente",
            "Verificar a fonte e procurar outras informações",
            "Acreditar porque muitas pessoas compartilharam",
            "Ignorar qualquer informação diferente da sua opinião"
        ],
        answer: 1,
        explanation:
            "Verificar a fonte e comparar informações ajuda a reduzir a propagação de conteúdos falsos ou enganosos."
    },

    {
        question:
            "Qual é a ideia central do conceito de equilíbrio digital?",
        options: [
            "Abandonar completamente a tecnologia",
            "Usar dispositivos digitais durante todo o dia",
            "Utilizar a tecnologia de maneira consciente e equilibrada",
            "Evitar qualquer forma de comunicação online"
        ],
        answer: 2,
        explanation:
            "Equilíbrio digital não significa abandonar a tecnologia, mas utilizá-la de forma consciente, estabelecendo limites."
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const quizContent = document.getElementById("quizContent");
const result = document.getElementById("result");
const questionNumber = document.getElementById("questionNumber");
const scorePreview = document.getElementById("scorePreview");
const progress = document.getElementById("progress");
const finalScore = document.getElementById("finalScore");
const resultMessage = document.getElementById("resultMessage");
const restartBtn = document.getElementById("restartBtn");


// Mostra a pergunta atual
function showQuestion() {
    answered = false;

    const question = questions[currentQuestion];

    questionNumber.textContent =
        `Pergunta ${currentQuestion + 1} de ${questions.length}`;

    scorePreview.textContent =
        `${score} ${score === 1 ? "ponto" : "pontos"}`;

    const percentage =
        ((currentQuestion + 1) / questions.length) * 100;

    progress.style.width = `${percentage}%`;

    quizContent.innerHTML = `
        <div class="question-card">

            <h3>${question.question}</h3>

            <div class="options">
                ${question.options
                    .map((option, index) => `
                        <button
                            class="option"
                            data-index="${index}"
                        >
                            ${String.fromCharCode(65 + index)}. ${option}
                        </button>
                    `)
                    .join("")}
            </div>

            <div id="feedback" class="feedback hidden"></div>

            <button
                id="nextBtn"
                class="btn next-btn hidden"
            >
                ${currentQuestion === questions.length - 1
                    ? "Ver resultado"
                    : "Próxima pergunta"}
            </button>

        </div>
    `;

    document.querySelectorAll(".option").forEach(button => {
        button.addEventListener("click", selectAnswer);
    });

    document.getElementById("nextBtn").addEventListener("click", nextQuestion);
}


// Verifica a resposta
function selectAnswer(event) {
    if (answered) return;

    answered = true;

    const selectedIndex = Number(event.currentTarget.dataset.index);
    const question = questions[currentQuestion];

    const options = document.querySelectorAll(".option");
    const feedback = document.getElementById("feedback");
    const nextBtn = document.getElementById("nextBtn");

    options.forEach(button => {
        button.disabled = true;
    });

    if (selectedIndex === question.answer) {
        event.currentTarget.classList.add("correct");
        score++;

        feedback.textContent = `Resposta correta! ${question.explanation}`;
    } else {
        event.currentTarget.classList.add("wrong");
        options[question.answer].classList.add("correct");

        feedback.textContent =
            `Resposta incorreta. ${question.explanation}`;
    }

    scorePreview.textContent =
        `${score} ${score === 1 ? "ponto" : "pontos"}`;

    feedback.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
}


// Avança para a próxima pergunta
function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}


// Mostra o resultado
function showResult() {
    quizContent.classList.add("hidden");
    result.classList.remove("hidden");

    finalScore.textContent =
        `${score}/${questions.length}`;

    if (score === questions.length) {
        resultMessage.textContent =
            "Excelente! Você demonstrou uma ótima compreensão sobre o uso consciente da tecnologia.";
    } else if (score >= 3) {
        resultMessage.textContent =
            "Muito bem! Você conhece os principais dilemas digitais, mas ainda pode aprofundar seus conhecimentos.";
    } else {
        resultMessage.textContent =
            "Continue aprendendo! Pequenas mudanças nos hábitos digitais podem fazer uma grande diferença.";
    }

    progress.style.width = "100%";
}


// Reinicia o quiz
restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;

    result.classList.add("hidden");
    quizContent.classList.remove("hidden");

    showQuestion();
});


// Inicia o quiz
showQuestion();