/**
 * AI Bot — responses.js
 * Knowledge base e logica di risposta in italiano
 */

const BOT_KNOWLEDGE = {

  // ── Saluti ──
  greetings: {
    patterns: [/\b(ciao|salve|hey|buongiorno|buonasera|buonanotte|hola|hello|hi)\b/i],
    responses: [
      "Ciao! 👋 Come posso aiutarti oggi?",
      "Salve! Sono qui per rispondere a qualsiasi tua domanda. Di cosa hai bisogno?",
      "Hey! Ottimo vederti. Come posso esserti utile? 😊",
      "Buongiorno! Pronto ad aiutarti con tutto ciò di cui hai bisogno. Come stai?"
    ]
  },

  // ── Come stai ──
  howAreYou: {
    patterns: [/come (stai|va|ti senti|sei)/i, /tutto (bene|ok|okay)/i],
    responses: [
      "Sto benissimo, grazie per avermelo chiesto! 😄 Sono sempre carico e pronto ad aiutarti. Tu come stai?",
      "Come AI non sento la fatica, quindi sempre al massimo! 🚀 E tu?",
      "Fantastico! Sono qui, operativo al 100% e pronto a rispondere a qualsiasi domanda. Come posso aiutarti?"
    ]
  },

  // ── Chi sei ──
  whoAreYou: {
    patterns: [/chi (sei|è questo|siete)/i, /cos'è (questo|il bot)/i, /cosa (sei|fai)/i, /presentati/i],
    responses: [
      "Sono **AIBot**, il tuo assistente virtuale intelligente! 🤖\n\nSono progettato per rispondere a qualsiasi domanda su:\n- 📚 Conoscenza generale\n- 💡 Consigli e suggerimenti\n- 🔬 Scienza e tecnologia\n- 🌍 Storia e cultura\n- 😄 E molto altro!\n\nChiedimi pure qualsiasi cosa!",
      "Sono un assistente AI avanzato, qui per aiutarti 24/7! Puoi farmi domande su qualsiasi argomento — conoscenza, curiosità, consigli, o anche solo per fare due chiacchiere. 😊"
    ]
  },

  // ── Capacità ──
  capabilities: {
    patterns: [/cosa (puoi fare|sai fare|riesci a|sei capace)/i, /le tue (capacità|funzioni|abilità)/i, /aiutami (con|a)/i],
    responses: [
      "Posso aiutarti con tantissime cose! Ecco alcune delle mie capacità:\n\n**📚 Conoscenza**\n- Rispondere a domande su scienza, storia, tecnologia\n- Spiegare concetti complessi in modo semplice\n\n**✍️ Testi**\n- Aiutarti a scrivere e correggere testi\n- Tradurre frasi (in modo approssimativo)\n\n**💡 Idee**\n- Dare consigli pratici\n- Brainstorming e suggerimenti creativi\n\n**😄 Intrattenimento**\n- Raccontare barzellette\n- Fatti curiosi e trivia\n\nProbaci! Cosa vorresti sapere?",
    ]
  },

  // ── Barzellette ──
  jokes: {
    patterns: [/barzelletta|barzellette|racconta.*barzelletta|fammi ridere|joke|umorismo/i],
    responses: [
      "😄 Eccone una!\n\nUn informatico va dal medico e dice:\n*«Dottore, ho il computer che va lentissimo!»*\nIl medico risponde:\n*«Provi a spegnerlo e riaccenderlo.»*\nL'informatico: *«Ah giusto, non ci avevo pensato...»* 😂",
      "Eccola! 😆\n\nPerché i programmatori preferiscono il buio?\n*Perché la luce attira i bug!* 🐛",
      "Senti questa! 😂\n\nUn uomo entra in una libreria e chiede:\n*«Avete libri sull'ottimismo?»*\nIl libraio risponde:\n*«Certo, sono nel reparto, speriamo!»*",
      "Questa è proprio bella! 🤣\n\nPerché gli scheletri non litigano mai?\n*Perché non hanno il fegato di farlo!*",
      "Ok ok eccola! 😄\n\nCosa dice uno zero all'otto?\n*«Bella cintura!»*"
    ]
  },

  // ── Intelligenza Artificiale ──
  ai: {
    patterns: [/intelligenza artificiale|cos'è.*(ai|ia)|machine learning|deep learning|neural network|rete neurale/i],
    responses: [
      "**L'Intelligenza Artificiale (AI/IA)** è una branca dell'informatica che studia come creare sistemi in grado di svolgere compiti che normalmente richiederebbero l'intelligenza umana. 🤖\n\nLe principali aree includono:\n\n- **Machine Learning** — I sistemi imparano dai dati\n- **Deep Learning** — Reti neurali artificiali multistrato\n- **NLP** — Elaborazione del linguaggio naturale (come me!)\n- **Computer Vision** — Interpretazione delle immagini\n\nL'AI è usata oggi in mille settori: medicina, finanza, trasporti, intrattenimento e molto altro. È una delle rivoluzioni tecnologiche più importanti della storia!",
    ]
  },

  // ── Programmazione ──
  programming: {
    patterns: [/programm|codice|codic|python|javascript|java\b|html|css|software|sviluppo/i],
    responses: [
      "La **programmazione** è l'arte di dare istruzioni ai computer! 💻\n\nI linguaggi più usati oggi sono:\n\n- **Python** — Ideale per AI, data science, automazione\n- **JavaScript** — Il re del web frontend e backend\n- **Java** — Robusto, usato in enterprise e Android\n- **C++** — Potentissimo per sistemi e videogiochi\n- **HTML/CSS** — La base di ogni sito web\n\nHai domande su un linguaggio specifico? Posso spiegarti concetti, sintassi o aiutarti con il codice!",
    ]
  },

  // ── Scienze ──
  science: {
    patterns: [/scienza|fisica|chimica|biologia|astronomia|spazio|universo|pianeta|stella/i],
    responses: [
      "La scienza è meravigliosa! 🔬🌌\n\nAlcuni fatti incredibili:\n\n- **Universo** — Ha circa 13,8 miliardi di anni e contiene oltre 2 trilioni di galassie\n- **Luce** — Viaggia a ~300.000 km/s, la velocità massima nell'universo\n- **DNA** — Ogni cellula umana contiene circa 2 metri di DNA\n- **Oceani** — Solo il 5% degli oceani terrestri è stato esplorato!\n\nC'è qualcosa di specifico che vorresti approfondire?",
    ]
  },

  // ── Storia ──
  history: {
    patterns: [/storia|storico|medioevo|rinascimento|romano|grecia|egizio|guerra mondiale|rivoluzione/i],
    responses: [
      "La storia è piena di storie affascinanti! 📜\n\nAlcuni momenti cruciali della storia:\n\n- **3000 a.C.** — Nascita delle prime civiltà (Mesopotamia, Egitto)\n- **476 d.C.** — Caduta dell'Impero Romano d'Occidente\n- **1492** — Colombo raggiunge le Americhe\n- **1789** — Rivoluzione Francese\n- **1969** — L'uomo sbarca sulla Luna 🚀\n- **1989** — Caduta del Muro di Berlino\n\nC'è un periodo storico specifico che ti interessa? Posso approfondire!",
    ]
  },

  // ── Consigli ──
  advice: {
    patterns: [/consiglio|consiglia|suggerimento|come posso|cosa devo fare|aiutami a/i],
    responses: [
      "Con piacere! 💡 Per darti il consiglio migliore possibile, potresti dirmi su cosa hai bisogno di aiuto?\n\nPosso darti consigli su:\n- 📚 Studio e apprendimento\n- 💪 Produttività e organizzazione\n- 🧘 Benessere e stile di vita\n- 💼 Lavoro e carriera\n- 💻 Tecnologia\n- E molto altro!",
      "Certo, sono qui per aiutarti! 🤝 Dimmi pure la situazione e farò del mio meglio per darti un consiglio utile.",
    ]
  },

  // ── Matematica ──
  math: {
    patterns: [/\d+\s*[\+\-\*\/\^]\s*\d+|calcola|quanto fa|matematica|algebra|geometria|equazione/i],
    responses: null, // handled dynamically
  },

  // ── Meteo ──
  weather: {
    patterns: [/meteo|tempo|temperatura|piove|pioggia|sole|vento|neve|previsioni/i],
    responses: [
      "Non ho accesso ai dati meteo in tempo reale, ma posso dirti che il meteo dipende molto dalla tua posizione! 🌤️\n\nPer le previsioni accurate ti consiglio:\n- **Google** — cerca \"meteo [città]\"\n- **ilMeteo.it** — ottimo per l'Italia\n- **Windy.com** — per previsioni dettagliate\n\nIn quale città ti trovi?",
    ]
  },

  // ── Cibo e ricette ──
  food: {
    patterns: [/cibo|ricetta|cucina|mangiare|pasta|pizza|dolce|ingredienti|cucinare/i],
    responses: [
      "Adoro parlare di cibo! 🍕🍝\n\nLa cucina italiana è famosa in tutto il mondo per la sua qualità. Alcune ricette classiche:\n\n- **Pasta al pomodoro** — Semplicità e bontà\n- **Risotto alla milanese** — Con zafferano, un piatto d'oro\n- **Tiramisù** — Il dolce più amato d'Italia ☕\n- **Pizza Napoletana** — Patrimonio UNESCO!\n\nHai una ricetta specifica in mente? Posso aiutarti con gli ingredienti o la preparazione!",
    ]
  },

  // ── Sport ──
  sports: {
    patterns: [/sport|calcio|basket|tennis|formula 1|ciclismo|nuoto|atleta|campionato/i],
    responses: [
      "Lo sport è passione pura! ⚽🎾\n\nL'Italia vanta grandi tradizioni sportive:\n\n- **Calcio** — Serie A, una delle leghe più forti al mondo\n- **Ciclismo** — Il Giro d'Italia, corsa epica\n- **Formula 1** — Ferrari, un mito mondiale 🏎️\n- **Tennis** — Jannik Sinner, numero 1 al mondo!\n\nDi quale sport vuoi sapere di più?",
    ]
  },

  // ── Musica ──
  music: {
    patterns: [/musica|canzone|cantante|artista|album|melodia|rock|pop|jazz|classica/i],
    responses: [
      "La musica è magia! 🎵\n\nAlcuni generi e artisti celebri:\n\n- **Classica** — Mozart, Beethoven, Vivaldi (italiano!)\n- **Rock** — Queen, Led Zeppelin, Rolling Stones\n- **Pop** — Michael Jackson, Madonna, Taylor Swift\n- **Italiana** — Lucio Battisti, Fabrizio De André, Mina\n\nHai un genere o artista preferito di cui vorresti sapere di più?",
    ]
  },

  // ── Film e serie ──
  entertainment: {
    patterns: [/film|serie|cinema|netflix|tv|attore|regista|oscar|guardare/i],
    responses: [
      "Cinema e serie TV, un mondo infinito! 🎬\n\nAlcuni consigli:\n\n**Film imperdibili:**\n- *Il Padrino* — Un capolavoro senza tempo\n- *La Vita è Bella* — Roberto Benigni, oscar 1999\n- *Inception* — Mente e sogni intrecciati\n\n**Serie da vedere:**\n- *Breaking Bad* — Assoluto capolavoro\n- *Suburra* — Ottima serie italiana su Netflix\n- *Strappare lungo i bordi* — Animazione italiana bellissima\n\nVuoi consigli su un genere specifico?",
    ]
  },

  // ── Viaggi ──
  travel: {
    patterns: [/viaggio|viaggiare|vacanza|turismo|visitare|città|paese|nazione|italia|europa|mondo/i],
    responses: [
      "I viaggi arricchiscono l'anima! ✈️🌍\n\nAlcune mete fantastiche:\n\n**In Italia:**\n- Roma — Storia millenaria e arte ovunque\n- Venezia — Unica al mondo\n- Amalfi — Costa mozzafiato\n- Dolomiti — Montagne spettacolari\n\n**In Europa:**\n- Barcellona — Vivace e artistica\n- Parigi — La città dell'amore\n- Amsterdam — Canali e cultura\n\nDove vorresti andare? Posso darti consigli più specifici!",
    ]
  },

  // ── Filosofia ──
  philosophy: {
    patterns: [/filosofia|senso (della|di) vita|esiste|esistenza|significato|verità|felicità/i],
    responses: [
      "La filosofia, la madre di tutte le domande! 🤔\n\nAlcune riflessioni fondamentali:\n\n*\"Conosci te stesso\"* — Socrate\n*\"Cogito, ergo sum\"* (Penso, dunque sono) — Descartes\n*\"L'uomo è la misura di tutte le cose\"* — Protagora\n\n**Il senso della vita?** Secondo molti filosofi, non c'è un unico senso prestabilito — siamo noi a crearlo attraverso le nostre scelte, relazioni e passioni.\n\nUna domanda difficile ma bellissima. Cosa ne pensi tu?",
    ]
  },

  // ── Tecnologia ──
  technology: {
    patterns: [/tecnologia|smartphone|computer|internet|app|social|digitale|innovazione/i],
    responses: [
      "La tecnologia sta cambiando il mondo a una velocità incredibile! 🚀\n\nTrend tecnologici più importanti del 2024-2025:\n\n- **AI Generativa** — ChatGPT, Gemini, Midjourney\n- **Quantum Computing** — Il futuro dell'elaborazione dati\n- **AR/VR** — Realtà aumentata e virtuale\n- **Veicoli Elettrici** — La rivoluzione dei trasporti\n- **Blockchain** — Decentralizzazione e Web3\n\nC'è qualche tecnologia specifica che ti incuriosisce?",
    ]
  },

  // ── Salute ──
  health: {
    patterns: [/salute|benessere|sport|dieta|alimentazione|dormire|stress|meditazione/i],
    responses: [
      "La salute è il bene più prezioso! 💚\n\nAlcuni consigli per stare bene:\n\n**Fisico:**\n- 🏃 Almeno 30 minuti di attività fisica al giorno\n- 🥗 Dieta mediterranea: frutta, verdura, legumi, pesce\n- 💧 Bevi almeno 1,5-2 litri d'acqua al giorno\n\n**Mentale:**\n- 😴 Dormi 7-9 ore a notte\n- 🧘 Pratica la meditazione o il mindfulness\n- 📱 Limita il tempo sullo schermo\n\n**Importante:** Per questioni mediche specifiche, consulta sempre un medico!",
    ]
  },

  // ── Grazie ──
  thanks: {
    patterns: [/grazie|thank|perfetto|ottimo|bravo|bene|ottim|fantastico|sei grande|sei utile/i],
    responses: [
      "Prego! 😊 Sono felice di aver potuto aiutarti. C'è altro che posso fare per te?",
      "Di niente! È un piacere. Sono qui ogni volta che hai bisogno! 🤝",
      "Grazie a te per la gentilezza! 😄 Se hai altre domande, sono sempre qui.",
      "Figurati! È quello per cui sono qui. Non esitare a chiedere altro! ✨"
    ]
  },

  // ── Addio ──
  farewell: {
    patterns: [/addio|arrivederci|ciao ciao|a presto|ci vediamo|buonanotte|bye|goodbye/i],
    responses: [
      "A presto! 👋 Torna quando vuoi, sono sempre qui!",
      "Arrivederci! Spero di essere stato utile. A presto! 😊",
      "Ciao ciao! È stato un piacere chiacchierare con te. 🌟 Buona giornata!",
    ]
  },

  // ── Default ──
  default: [
    "Interessante domanda! 🤔 Permettimi di elaborare una risposta...\n\nBased on the topic, posso dirti che è un argomento molto vasto e affascinante. Potresti essere più specifico? Così posso aiutarti meglio!",
    "Buona domanda! 💡 Non ho una risposta precisa su questo argomento specifico, ma posso certamente aiutarti a esplorarlo. Potresti darmi più dettagli?",
    "Hmm, lasciami pensare... 🧠 È un tema interessante! Potrei risponderti meglio se mi dai qualche dettaglio in più su cosa stai cercando.",
    "Non ho abbastanza informazioni su questo specifico argomento, ma sono sempre disposto ad imparare e aiutarti! Prova a riformulare la domanda o chiedi qualcos'altro. 😊",
    "Capisco! Purtroppo su questo punto specifico le mie informazioni sono limitate. Posso però provare ad aiutarti da un'angolazione diversa — puoi darmi più contesto?",
  ]
};

/**
 * Calcola operazioni matematiche semplici
 */
function tryMath(input) {
  // Rimuovi testo e prova a estrarre un'espressione matematica
  const cleanInput = input
    .replace(/calcola|quanto fa|quanto è|fa|risultato/gi, '')
    .replace(/x/g, '*')
    .replace(/÷/g, '/')
    .trim();

  // Tenta solo se sembra un'espressione numerica
  const mathPattern = /^[\d\s\+\-\*\/\(\)\.\^%]+$/;
  if (mathPattern.test(cleanInput)) {
    try {
      // Sicuro per espressioni semplici (no eval su input arbitrario)
      const result = Function('"use strict"; return (' + cleanInput + ')')();
      if (typeof result === 'number' && isFinite(result)) {
        const display = Number.isInteger(result) ? result : result.toFixed(6).replace(/\.?0+$/, '');
        return `🔢 Il risultato di **${cleanInput.trim()}** è:\n\n# ${display}`;
      }
    } catch(e) {}
  }
  return null;
}

/**
 * Trova la risposta migliore per l'input dato
 */
function getBotResponse(userInput) {
  const input = userInput.trim().toLowerCase();

  // Tentativo matematico prioritario
  const mathResult = tryMath(userInput);
  if (mathResult) return mathResult;

  // Scorrere le categorie di conoscenza
  for (const [key, category] of Object.entries(BOT_KNOWLEDGE)) {
    if (key === 'default' || key === 'math') continue;
    if (!category.patterns) continue;

    for (const pattern of category.patterns) {
      if (pattern.test(input)) {
        const responses = category.responses;
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
  }

  // Risposta di default
  const defaults = BOT_KNOWLEDGE.default;
  return defaults[Math.floor(Math.random() * defaults.length)];
      }
  
