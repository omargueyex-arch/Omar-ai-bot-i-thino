/**
 * AI Bot — main.js
 * Integrazione Groq AI (LLaMA 3.3 70B) + fallback locale
 */

// ── Elementi DOM ──
const chatMessages    = document.getElementById('chatMessages');
const userInput       = document.getElementById('userInput');
const sendBtn         = document.getElementById('sendBtn');
const typingIndicator = document.getElementById('typingIndicator');
const suggestions     = document.getElementById('suggestions');
const modalOverlay    = document.getElementById('modalOverlay');
const apiKeyInput     = document.getElementById('apiKeyInput');
const modalError      = document.getElementById('modalError');
const saveKeyBtn      = document.getElementById('saveKeyBtn');
const saveBtnText     = document.getElementById('saveBtnText');
const statusDot       = document.getElementById('statusDot');
const statusText      = document.getElementById('statusText');

// ── Stato ──
let isTyping    = false;
let groqApiKey  = null;
let useGroq     = false;

// ── Storico messaggi per contesto ──
const messageHistory = [
  {
    role: 'system',
    content: `Sei un assistente AI intelligente, amichevole e molto capace. 
Rispondi SEMPRE in italiano, in modo chiaro, preciso e coinvolgente.
Puoi usare emoji con moderazione per rendere le risposte più vivaci.
Sei esperto in: programmazione, scienza, storia, matematica, cultura generale, creatività, consigli pratici e molto altro.
Non essere mai evasivo: rispondi sempre in modo diretto e utile.`
  }
];

// ══════════════════════════════════════════
//  MODAL — GESTIONE API KEY
// ══════════════════════════════════════════

function openModal() {
  modalOverlay.classList.remove('hidden');
  setTimeout(() => apiKeyInput.focus(), 300);
}

function closeModal() {
  modalOverlay.classList.add('hidden');
}

function toggleKeyVisibility() {
  const input = apiKeyInput;
  const icon  = document.getElementById('eyeIcon');
  if (input.type === 'password') {
    input.type = 'text';
    icon.innerHTML = '<path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/><path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/><path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>';
  } else {
    input.type = 'password';
    icon.innerHTML = '<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>';
  }
}

async function saveApiKey() {
  const key = apiKeyInput.value.trim();
  if (!key || !key.startsWith('gsk_')) {
    showModalError('La chiave deve iniziare con "gsk_". Controlla e riprova.');
    return;
  }

  // Verifica la chiave con una chiamata test
  saveKeyBtn.disabled = true;
  saveBtnText.textContent = '⏳ Verifica in corso…';
  modalError.classList.add('hidden');

  const valid = await testApiKey(key);

  if (valid) {
    groqApiKey = key;
    localStorage.setItem('groq_api_key', key);
    useGroq = true;
    closeModal();
    setStatus('online', '⚡ LLaMA 3.3 70B');
    appendMessage('🚀 **Perfetto!** Ora sono connesso a **LLaMA 3.3 70B** di Groq — posso rispondere a qualsiasi domanda in modo intelligente e preciso. Prova a chiedermi qualcosa!', 'bot');
  } else {
    showModalError('API Key non valida o errore di rete. Controlla la chiave e riprova.');
  }

  saveKeyBtn.disabled = false;
  saveBtnText.textContent = '⚡ Attiva AI';
}

async function testApiKey(key) {
  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 5
      })
    });
    return res.ok;
  } catch {
    return false;
  }
}

function showModalError(msg) {
  modalError.textContent = '❌ ' + msg;
  modalError.classList.remove('hidden');
}

// Chiudi modal cliccando fuori
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay && useGroq) closeModal();
});

// Enter nel campo API key
apiKeyInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') saveApiKey();
});

// ══════════════════════════════════════════
//  STATUS BADGE
// ══════════════════════════════════════════

function setStatus(state, label) {
  statusDot.className = 'status-dot';
  if (state === 'online')  { statusDot.classList.add(''); statusText.textContent = label || 'Online'; }
  if (state === 'offline') { statusDot.classList.add('offline'); statusText.textContent = label || 'Offline'; }
  if (state === 'loading') { statusDot.classList.add('loading'); statusText.textContent = label || 'Connessione…'; }
}

// ══════════════════════════════════════════
//  CHAT — UTILITY
// ══════════════════════════════════════════

function getTime() {
  return new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
}

function formatText(text) {
  return text
    // Blocchi codice ```...```
    .replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) =>
      `<pre style="background:#111;border:1px solid #222;border-radius:8px;padding:12px;overflow-x:auto;margin:8px 0;font-size:0.82rem;color:#7dd3fc;"><code>${escapeHtml(code.trim())}</code></pre>`)
    // Grassetto
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Corsivo
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Codice inline
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Liste con -
    .replace(/^[-•] (.+)$/gm, '<li>$1</li>')
    // Ragruppa li in ul
    .replace(/(<li>[\s\S]*?<\/li>)(\n<li>[\s\S]*?<\/li>)*/g, m => `<ul style="padding-left:18px;margin:6px 0;">${m}</ul>`)
    // Titoli ### e ##
    .replace(/^### (.+)$/gm, '<h4 style="color:var(--accent);font-size:0.95rem;margin:10px 0 4px;">$1</h4>')
    .replace(/^## (.+)$/gm,  '<h3 style="color:var(--accent);font-size:1rem;margin:10px 0 4px;">$1</h3>')
    // Newline
    .replace(/\n/g, '<br>');
}

function escapeHtml(text) {
  return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function scrollToBottom() {
  chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' });
}

// ══════════════════════════════════════════
//  CHAT — MESSAGGI
// ══════════════════════════════════════════

function appendMessage(text, sender, isError = false) {
  const isUser = sender === 'user';
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', isUser ? 'user-message' : 'bot-message');

  const avatarDiv = document.createElement('div');
  avatarDiv.classList.add('avatar', isUser ? 'user-avatar' : 'bot-avatar');
  avatarDiv.textContent = isUser ? 'Tu' : '✦';

  const wrapDiv = document.createElement('div');
  wrapDiv.classList.add('bubble-wrap');

  const bubble = document.createElement('div');
  bubble.classList.add('bubble', isUser ? 'user-bubble' : 'bot-bubble');
  if (isError) bubble.classList.add('error-bubble');
  bubble.innerHTML = formatText(text);

  const ts = document.createElement('span');
  ts.classList.add('timestamp');
  ts.textContent = getTime();

  wrapDiv.appendChild(bubble);
  wrapDiv.appendChild(ts);
  msgDiv.appendChild(avatarDiv);
  msgDiv.appendChild(wrapDiv);

  chatMessages.appendChild(msgDiv);
  scrollToBottom();
}

function showTyping() {
  typingIndicator.classList.remove('hidden');
  scrollToBottom();
}

function hideTyping() {
  typingIndicator.classList.add('hidden');
}

// ══════════════════════════════════════════
//  API GROQ — CHIAMATA REALE
// ══════════════════════════════════════════

async function callGroqAPI(userText) {
  // Aggiungi il messaggio utente allo storico
  messageHistory.push({ role: 'user', content: userText });

  // Mantieni max 20 messaggi di contesto (+ system)
  while (messageHistory.length > 21) {
    messageHistory.splice(1, 1);
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${groqApiKey}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: messageHistory,
      max_tokens: 1024,
      temperature: 0.75,
      top_p: 0.9,
      stream: false
    })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `HTTP ${response.status}`);
  }

  const data = await response.json();
  const assistantMsg = data.choices[0].message.content;

  // Salva risposta nello storico
  messageHistory.push({ role: 'assistant', content: assistantMsg });

  return assistantMsg;
}

// ══════════════════════════════════════════
//  INVIO MESSAGGIO
// ══════════════════════════════════════════

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text || isTyping) return;

  // Nascondi suggerimenti
  if (suggestions) suggestions.classList.add('hidden');

  // Mostra messaggio utente
  appendMessage(text, 'user');

  // Reset input
  userInput.value = '';
  userInput.style.height = 'auto';
  userInput.focus();

  // Blocca mentre risponde
  isTyping = true;
  sendBtn.disabled = true;

  showTyping();

  try {
    let responseText;

    if (useGroq && groqApiKey) {
      // ── Risposta AI reale ──
      responseText = await callGroqAPI(text);
    } else {
      // ── Fallback locale ──
      await new Promise(r => setTimeout(r, 800 + Math.random() * 600));
      responseText = getBotResponse(text);
    }

    hideTyping();
    appendMessage(responseText, 'bot');

  } catch (err) {
    hideTyping();
    console.error('Groq API error:', err);

    // Se errore di autenticazione, chiedi nuova chiave
    if (err.message.includes('401') || err.message.includes('invalid_api_key') || err.message.includes('auth')) {
      useGroq = false;
      groqApiKey = null;
      localStorage.removeItem('groq_api_key');
      setStatus('offline', 'Chiave scaduta');
      appendMessage('⚠️ **API Key scaduta o non valida.** Clicca su 🔑 in alto per inserirne una nuova.', 'bot', true);
    } else if (err.message.includes('429') || err.message.includes('rate_limit')) {
      appendMessage('⏳ **Limite di richieste raggiunto.** Aspetta qualche secondo e riprova — Groq ha limiti generosi ma temporanei!', 'bot', true);
    } else {
      appendMessage(`❌ **Errore di connessione:** ${err.message}\n\nControlla la tua connessione internet e riprova.`, 'bot', true);
    }
  }

  isTyping = false;
  sendBtn.disabled = false;
  userInput.focus();
}

function sendSuggestion(btn) {
  userInput.value = btn.textContent;
  sendMessage();
}

// ══════════════════════════════════════════
//  INPUT — EVENTI
// ══════════════════════════════════════════

userInput.addEventListener('input', function () {
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 180) + 'px';
});

userInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// ══════════════════════════════════════════
//  PARTICELLE SFONDO
// ══════════════════════════════════════════

function createParticles() {
  const container = document.getElementById('bgParticles');
  if (!container) return;
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 3 + 1;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      --dur:${Math.random() * 12 + 8}s;
      --delay:${Math.random() * 10}s;
    `;
    container.appendChild(p);
  }
}

// ══════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  createParticles();

  // Controlla se c'è già una chiave salvata
  const savedKey = localStorage.getItem('groq_api_key');
  if (savedKey) {
    groqApiKey = savedKey;
    useGroq    = true;
    apiKeyInput.value = savedKey;
    closeModal();
    setStatus('online', '⚡ LLaMA 3.3 70B');
  } else {
    setStatus('offline', 'Non configurato');
    // Mostra modal dopo un attimo
    setTimeout(() => openModal(), 600);
  }

  userInput.focus();
});
