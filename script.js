const assistenteAvatar = document.getElementById("assistente-avatar");
const chatModal = document.getElementById("chat-modal");
const assistenteBody = document.getElementById("assistente-body");
const userInput = document.getElementById("user-input");
const fecharChat = document.getElementById("fechar-chat");

const respostas = {
  "sites": "Eu desenvolvo sites modernos, responsivos e rápidos, adaptados a qualquer dispositivo.",
  "sistemas": "Crio sistemas sob medida para resolver problemas específicos do seu negócio.",
  "manutenção": "Faço manutenção e melhorias em sites e sistemas já existentes.",
  "integrações": "Integro sistemas com APIs, ERPs e CRMs, otimizando processos.",
  "aplicações": "Desenvolvo aplicações interativas e fáceis de usar.",
  "segurança": "Implemento soluções de segurança digital para proteger seus dados.",
  "outros": "Posso oferecer consultoria personalizada para entender melhor sua necessidade e propor a solução ideal."
};

// Abrir chat ao clicar no avatar
assistenteAvatar.addEventListener("click", () => {
  chatModal.style.display = chatModal.style.display === "flex" ? "none" : "flex";
  userInput.focus();
});

// Fechar chat
fecharChat.addEventListener("click", () => {
  chatModal.style.display = "none";
});

// Enviar mensagem
function enviarMensagem() {
  const mensagem = userInput.value.trim();
  if (mensagem === "") return;
  adicionarMensagem(mensagem, "user-msg");
  userInput.value = "";
  setTimeout(() => {
    responderAssistente(mensagem);
  }, 600);
}

// Adicionar mensagem
function adicionarMensagem(texto, classe) {
  const msg = document.createElement("div");
  msg.classList.add("mensagem", classe);
  msg.textContent = texto;
  assistenteBody.appendChild(msg);
  assistenteBody.scrollTop = assistenteBody.scrollHeight;
}

// Responder assistente
function responderAssistente(texto) {
  const chave = Object.keys(respostas).find(k => texto.toLowerCase().includes(k));
  let resposta = chave ? respostas[chave] : respostas["outros"];
  adicionarMensagem("Assistente digitando...", "assistente-msg");
  setTimeout(() => {
    assistenteBody.lastChild.remove(); // Remove "digitando..."
    adicionarMensagem(resposta, "assistente-msg");
  }, 1000);
}

// Cards clicáveis
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    const servico = card.getAttribute("data-servico");
    chatModal.style.display = "flex";
    userInput.focus();
    responderAssistente(servico);
  });
});
