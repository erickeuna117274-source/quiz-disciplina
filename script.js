
const perguntas = [
    {
        pergunta: "O que significa ter disciplina?",
        alternativas: [
            "Ignorar regras",
            "Cumprir regras e responsabilidades",
            "Fazer tudo sem organização",
            "Desrespeitar os colegas"
        ],
        correta: 1
    },

    {
        pergunta: "Qual atitude demonstra respeito?",
        alternativas: [
            "Interromper o professor",
            "Brigar com colegas",
            "Ouvir quando alguém está falando",
            "Desobedecer às regras"
        ],
        correta: 2
    },

    {
        pergunta: "Por que devemos chegar no horário?",
        alternativas: [
            "Para demonstrar compromisso",
            "Para sair mais cedo",
            "Para atrapalhar a aula",
            "Para evitar responsabilidades"
        ],
        correta: 0
    },

    {
        pergunta: "O que é responsabilidade?",
        alternativas: [
            "Culpar os outros",
            "Evitar tarefas",
            "Ignorar compromissos",
            "Assumir seus deveres"
        ],
        correta: 3
    },

    {
        pergunta: "Qual atitude é correta na escola?",
        alternativas: [
            "Danificar materiais",
            "Respeitar os colegas",
            "Fazer bagunça",
            "Desrespeitar professores"
        ],
        correta: 1
    },

    {
        pergunta: "O que devemos fazer ao cometer um erro?",
        alternativas: [
            "Esconder o erro",
            "Culpar outra pessoa",
            "Aprender e tentar corrigir",
            "Ignorar o problema"
        ],
        correta: 2
    },

    {
        pergunta: "Qual atitude ajuda na organização?",
        alternativas: [
            "Planejar suas atividades",
            "Deixar tudo espalhado",
            "Esquecer compromissos",
            "Não cumprir horários"
        ],
        correta: 0
    },

    {
        pergunta: "O que significa trabalhar em equipe?",
        alternativas: [
            "Ignorar opiniões",
            "Fazer tudo sozinho",
            "Discutir constantemente",
            "Cooperar com outras pessoas"
        ],
        correta: 3
    },

    {
        pergunta: "Por que seguir regras é importante?",
        alternativas: [
            "Para gerar conflitos",
            "Para manter a organização",
            "Para prejudicar colegas",
            "Para evitar aprender"
        ],
        correta: 1
    },

    {
        pergunta: "Qual característica representa disciplina?",
        alternativas: [
            "Desorganização",
            "Falta de compromisso",
            "Pontualidade",
            "Desrespeito"
        ],
        correta: 2
    }
];

// Variáveis do quiz
let pontuacao = 0;
let perguntaAtual = 0;
let respondeu = false;

// Mostra a pergunta na tela
function mostrarPergunta() {

    respondeu = false;

    let atual = perguntas[perguntaAtual];

    document.getElementById("pergunta").innerText =
        atual.pergunta;

    document.getElementById("numeroPergunta").innerText =
        "Pergunta " + (perguntaAtual + 1) +
        " de " + perguntas.length;

    document.getElementById("feedback").innerText = "";

    document.getElementById("proximo").style.display = "none";

    // Atualiza a barra de progresso
    let progresso = (perguntaAtual / perguntas.length) * 100;

    document.getElementById("barra").style.width =
        progresso + "%";

    let alternativas =
        document.getElementById("alternativas");

    alternativas.innerHTML = "";

    atual.alternativas.forEach(function(opcao, index) {

        let botao = document.createElement("button");

        botao.innerText = opcao;
        botao.className = "alternativa";

        // Evento de clique
        botao.onclick = function() {
            verificarResposta(index, botao);
        };

        alternativas.appendChild(botao);

    });
}

// Verifica se a resposta está correta
function verificarResposta(resposta, botao) {

    if (respondeu) {
        return;
    }

    respondeu = true;

    let correta = perguntas[perguntaAtual].correta;

    let botoes = document.querySelectorAll(".alternativa");

    botoes.forEach(function(item) {
        item.disabled = true;
    });

    if (resposta === correta) {

        pontuacao++;

        botao.classList.add("correta");

        document.getElementById("feedback").innerText =
            "Muito bem! Resposta correta!";

        document.getElementById("feedback").style.color =
            "green";

    } else {

        botao.classList.add("errada");

        botoes[correta].classList.add("correta");

        document.getElementById("feedback").innerText =
            "Resposta errada! Tente aprender com o erro.";

        document.getElementById("feedback").style.color =
            "red";
    }

    document.getElementById("proximo").style.display =
        "inline-block";
}

// Passa para a próxima pergunta
function proximaPergunta() {

    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {

        mostrarPergunta();

    } else {

        finalizarQuiz();

    }
}

// Mostra o resultado final
function finalizarQuiz() {

    document.getElementById("telaQuiz").style.display =
        "none";

    document.getElementById("telaResultado").style.display =
        "block";

    document.getElementById("barra").style.width = "100%";

    document.getElementById("pontuacao").innerText =
        "Você acertou " + pontuacao +
        " de " + perguntas.length + " perguntas!";

    let mensagem = "";

    if (pontuacao >= 8) {
        mensagem = "Excelente! Você demonstrou muito conhecimento!";
    } else if (pontuacao >= 5) {
        mensagem = "Muito bom! Continue se dedicando!";
    } else {
        mensagem = "Continue estudando! Você pode melhorar!";
    }

    document.getElementById("mensagem").innerText =
        mensagem;
}

// Reinicia o quiz
function reiniciarQuiz() {

    pontuacao = 0;
    perguntaAtual = 0;

    document.getElementById("telaQuiz").style.display =
        "block";

    document.getElementById("telaResultado").style.display =
        "none";

    mostrarPergunta();
}

// Inicia o quiz
mostrarPergunta();
