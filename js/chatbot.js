(function () {
  'use strict';

  // ── LINKS ────────────────────────────────────────────────
  var L = {
    wa:       'https://wa.me/491632526942',
    wa_anni:  'https://api.whatsapp.com/message/QDOPRPIH5UHXK1?autoload=1&app_absent=0',
    calendly: 'https://calendly.com/manfredkirr-autos/mietwerkstatt?month=2026-04',
    bestand:  'https://home.mobile.de/MK-MASCHINEN'
  };

  // ── KNOWLEDGE BASE ────────────────────────────────────────
  var KB = [
    {
      match: ['fahrzeug','auto ','autos','wagen','bestand','kaufen','gebraucht','neuwagen','dacia','audi','ford','volkswagen',' vw','byd','eu-import','import','ankauf','verkaufen','modell','welche marken','welche autos'],
      reply: 'Unseren aktuellen Fahrzeugbestand finden Sie direkt auf mobile.de – dort sehen Sie alle verfügbaren Fahrzeuge mit Bildern und Preisen.',
      actions: [
        { label: '🚗 Fahrzeugbestand ansehen', url: L.bestand, style: 'p' },
        { label: '💬 Per WhatsApp anfragen',  url: L.wa,      style: 'w' }
      ]
    },
    {
      match: ['werkstatt','mietwerkstatt','hebebühne','hebebuehne','schrauben','selber','selbst reparieren','reparatur','ölwechsel','öl wechsel','bremsen','reifenwechsel'],
      reply: 'Unsere Mietwerkstatt bietet eine 3-Tonnen-Hebebühne für nur 17 €/Std. – inkl. Grundausstattung. Buchen Sie Ihren Termin direkt online:',
      actions: [
        { label: '📅 Termin online buchen', url: L.calendly, style: 'p' },
        { label: '💬 WhatsApp',             url: L.wa,       style: 'w' }
      ]
    },
    {
      match: ['termin','buchen','buchung','reservieren','wann kann','verfügbar','slot'],
      reply: 'Für die Mietwerkstatt können Sie Ihren Termin ganz einfach online buchen:',
      actions: [
        { label: '📅 Termin online buchen', url: L.calendly, style: 'p' }
      ]
    },
    {
      match: ['zulassung','kennzeichen','anmelden','ummelden','abmelden','zulassungsdienst','fahrzeugbrief','fahrzeugschein','evb','anni','anneliese','tüv','hu ','hauptuntersuchung'],
      reply: 'Für alle Fragen rund um Zulassung, An- und Ummeldung ist Anne Kirr Ihre persönliche Ansprechpartnerin:',
      actions: [
        { label: '💬 WhatsApp – Anne', url: L.wa_anni, style: 'w' }
      ]
    },
    {
      match: ['preis','kosten','wie viel','wieviel','teuer','euro','günsti','billig','angebot','was kostet','17'],
      reply: 'Mietwerkstatt: 17 €/Std. inkl. Hebebühne.\nFür Fahrzeugpreise schauen Sie in unseren Bestand oder fragen direkt an:',
      actions: [
        { label: '🚗 Fahrzeugbestand', url: L.bestand, style: 'p' },
        { label: '💬 WhatsApp',        url: L.wa,      style: 'w' }
      ]
    },
    {
      match: ['öffnungszeit','geöffnet','offen wann','uhrzeit','montag','dienstag','mittwoch','donnerstag','freitag','samstag','sonntag','heute offen','wann offen'],
      reply: '🕐 Unsere Öffnungszeiten:\nMontag – Freitag: 09:00 – 18:30 Uhr\n\nBei Fragen einfach melden:',
      actions: [
        { label: '💬 WhatsApp', url: L.wa, style: 'w' }
      ]
    },
    {
      match: ['adresse','wo sind','standort','greifenstein','anfahrt','karte','maps','finden','ulmbach','wo befindet'],
      reply: '📍 Sie finden uns hier:\nUlmbachstraße 2\n35753 Greifenstein\n\nEinfach in Google Maps eingeben!',
      actions: [
        { label: '💬 WhatsApp', url: L.wa, style: 'w' }
      ]
    },
    {
      match: ['telefon','anrufen','nummer','email','mail','schreiben','erreichbar','kontakt'],
      reply: 'So erreichen Sie uns:\n📞 +49 163 2526942\n✉️ manfred@kirr.net\n\nOder schnell per WhatsApp:',
      actions: [
        { label: '💬 WhatsApp', url: L.wa, style: 'w' }
      ]
    }
  ];

  var FALLBACK = {
    reply: 'Dazu helfe ich Ihnen gerne weiter – schreiben Sie uns einfach direkt:',
    actions: [
      { label: '💬 WhatsApp',        url: L.wa,      style: 'w' },
      { label: '🚗 Fahrzeugbestand', url: L.bestand, style: 'p' }
    ]
  };

  var QUICK = [
    { label: '🚗 Fahrzeuge ansehen', reply: 'fahrzeug' },
    { label: '📅 Werkstatt buchen',  reply: 'werkstatt buchen' },
    { label: '📋 Zulassung',         reply: 'zulassung' },
    { label: '📞 Kontakt & Zeiten',  reply: 'öffnungszeiten kontakt' }
  ];

  // ── MATCH ─────────────────────────────────────────────────
  function match(input) {
    var t = input.toLowerCase();
    for (var i = 0; i < KB.length; i++) {
      var entry = KB[i];
      for (var j = 0; j < entry.match.length; j++) {
        if (t.indexOf(entry.match[j]) !== -1) return entry;
      }
    }
    return null;
  }

  // ── CSS ───────────────────────────────────────────────────
  var css = `
#mk-chat-btn {
  position: fixed;
  bottom: 28px;
  right: 28px;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: #6B7280;
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0,0,0,.25);
  z-index: 9998;
  transition: transform .2s, box-shadow .2s;
}
#mk-chat-btn:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(0,0,0,.32); }
#mk-chat-btn svg { transition: opacity .2s; }
#mk-chat-btn.open .icon-chat { display: none; }
#mk-chat-btn:not(.open) .icon-close { display: none; }

#mk-chat-win {
  position: fixed;
  bottom: 100px;
  right: 28px;
  width: 360px;
  max-width: calc(100vw - 32px);
  height: 520px;
  max-height: calc(100vh - 120px);
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 48px rgba(0,0,0,.18);
  display: flex;
  flex-direction: column;
  z-index: 9997;
  overflow: hidden;
  transform: scale(.92) translateY(16px);
  opacity: 0;
  pointer-events: none;
  transition: transform .22s cubic-bezier(.34,1.56,.64,1), opacity .18s;
}
#mk-chat-win.open {
  transform: scale(1) translateY(0);
  opacity: 1;
  pointer-events: all;
}

#mk-chat-head {
  background: #0A0A0A;
  color: #fff;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}
#mk-chat-head-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #2563EB;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: .5px;
  flex-shrink: 0;
}
#mk-chat-head-text { flex: 1; }
#mk-chat-head-text strong { display: block; font-size: 14px; }
#mk-chat-head-text span { font-size: 11px; color: #4ade80; }

#mk-chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  scroll-behavior: smooth;
}
#mk-chat-messages::-webkit-scrollbar { width: 4px; }
#mk-chat-messages::-webkit-scrollbar-thumb { background: #ddd; border-radius: 2px; }

.mk-msg {
  max-width: 86%;
  font-size: 13.5px;
  line-height: 1.5;
  word-break: break-word;
}
.mk-msg-bot {
  align-self: flex-start;
}
.mk-msg-user {
  align-self: flex-end;
}
.mk-bubble {
  padding: 10px 13px;
  border-radius: 14px;
  white-space: pre-line;
}
.mk-msg-bot .mk-bubble {
  background: #D1D5DB;
  color: #1e293b;
  border-bottom-left-radius: 4px;
}
.mk-msg-user .mk-bubble {
  background: #2563EB;
  color: #fff;
  border-bottom-right-radius: 4px;
}
.mk-msg-actions {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
}
.mk-action-btn {
  display: block;
  padding: 8px 13px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  transition: opacity .15s, transform .15s;
  cursor: pointer;
}
.mk-action-btn:hover { opacity: .88; transform: translateY(-1px); }
.mk-action-p { background: #2563EB; color: #fff; }
.mk-action-w { background: #25D366; color: #fff; }

.mk-typing {
  align-self: flex-start;
}
.mk-typing .mk-bubble {
  background: #F1F5F9;
  padding: 12px 16px;
}
.mk-typing-dots { display: flex; gap: 4px; }
.mk-typing-dots span {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #94a3b8;
  animation: mkbounce 1.2s infinite;
}
.mk-typing-dots span:nth-child(2) { animation-delay: .2s; }
.mk-typing-dots span:nth-child(3) { animation-delay: .4s; }
@keyframes mkbounce {
  0%,60%,100% { transform: translateY(0); }
  30% { transform: translateY(-5px); }
}

.mk-quick-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}
.mk-quick-btn {
  background: #fff;
  border: 1.5px solid #2563EB;
  color: #2563EB;
  border-radius: 20px;
  padding: 5px 11px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background .15s, color .15s;
  white-space: nowrap;
}
.mk-quick-btn:hover { background: #2563EB; color: #fff; }

#mk-chat-input-row {
  padding: 10px 12px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  background: #fff;
}
#mk-chat-input {
  flex: 1;
  border: 1.5px solid #e2e8f0;
  border-radius: 22px;
  padding: 9px 14px;
  font-size: 13.5px;
  outline: none;
  font-family: inherit;
  transition: border-color .15s;
}
#mk-chat-input:focus { border-color: #2563EB; }
#mk-chat-send {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #2563EB;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background .15s;
}
#mk-chat-send:hover { background: #1d4ed8; }
`;

  // ── BUILD DOM ─────────────────────────────────────────────
  function build() {
    // inject css
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    // toggle button
    var btn = document.createElement('button');
    btn.id = 'mk-chat-btn';
    btn.setAttribute('aria-label', 'Chat öffnen');
    btn.innerHTML = `
      <svg class="icon-chat" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      <svg class="icon-close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>`;
    document.body.appendChild(btn);

    // chat window
    var win = document.createElement('div');
    win.id = 'mk-chat-win';
    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-label', 'MK Assistent');
    win.innerHTML = `
      <div id="mk-chat-head">
        <div id="mk-chat-head-avatar">MK</div>
        <div id="mk-chat-head-text">
          <strong>MK Assistent</strong>
          <span>● Online</span>
        </div>
      </div>
      <div id="mk-chat-messages"></div>
      <div id="mk-chat-input-row">
        <input id="mk-chat-input" type="text" placeholder="Ihre Frage …" autocomplete="off" maxlength="200"/>
        <button id="mk-chat-send" aria-label="Senden">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>`;
    document.body.appendChild(win);

    return { btn: btn, win: win };
  }

  // ── MESSAGES ──────────────────────────────────────────────
  function addMsg(container, text, who, actions) {
    var wrap = document.createElement('div');
    wrap.className = 'mk-msg mk-msg-' + who;

    var bubble = document.createElement('div');
    bubble.className = 'mk-bubble';
    bubble.textContent = text;
    wrap.appendChild(bubble);

    if (actions && actions.length) {
      var actWrap = document.createElement('div');
      actWrap.className = 'mk-msg-actions';
      actions.forEach(function (a) {
        var link = document.createElement('a');
        link.className = 'mk-action-btn mk-action-' + a.style;
        link.href = a.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = a.label;
        actWrap.appendChild(link);
      });
      wrap.appendChild(actWrap);
    }

    container.appendChild(wrap);
    container.scrollTop = container.scrollHeight;
    return wrap;
  }

  function addQuick(container, onSelect) {
    var wrap = document.createElement('div');
    wrap.className = 'mk-msg mk-msg-bot';
    var inner = document.createElement('div');
    inner.className = 'mk-quick-wrap';
    QUICK.forEach(function (q) {
      var b = document.createElement('button');
      b.className = 'mk-quick-btn';
      b.textContent = q.label;
      b.addEventListener('click', function () {
        wrap.remove();
        onSelect(q.reply, q.label);
      });
      inner.appendChild(b);
    });
    wrap.appendChild(inner);
    container.appendChild(wrap);
    container.scrollTop = container.scrollHeight;
  }

  function showTyping(container) {
    var el = document.createElement('div');
    el.className = 'mk-msg mk-typing';
    el.innerHTML = '<div class="mk-bubble"><div class="mk-typing-dots"><span></span><span></span><span></span></div></div>';
    container.appendChild(el);
    container.scrollTop = container.scrollHeight;
    return el;
  }

  // ── BOT RESPOND ───────────────────────────────────────────
  function botRespond(input, container) {
    var typing = showTyping(container);
    setTimeout(function () {
      typing.remove();
      var found = match(input) || FALLBACK;
      addMsg(container, found.reply, 'bot', found.actions);
    }, 900);
  }

  // ── INIT ──────────────────────────────────────────────────
  function init() {
    var els = build();
    var btn = els.btn;
    var win = els.win;
    var messages = win.querySelector('#mk-chat-messages');
    var input = win.querySelector('#mk-chat-input');
    var sendBtn = win.querySelector('#mk-chat-send');
    var opened = false;
    var greeted = false;

    function open() {
      opened = true;
      btn.classList.add('open');
      win.classList.add('open');
      if (!greeted) {
        greeted = true;
        setTimeout(function () {
          addMsg(messages, 'Hallo! Ich bin der MK Assistent. Womit kann ich Ihnen helfen?', 'bot');
          setTimeout(function () {
            addQuick(messages, send);
          }, 300);
        }, 200);
      }
      setTimeout(function () { input.focus(); }, 250);
    }

    function close() {
      opened = false;
      btn.classList.remove('open');
      win.classList.remove('open');
    }

    function send(text, displayText) {
      var msg = (displayText || text).trim();
      if (!msg) return;
      addMsg(messages, msg, 'user');
      input.value = '';
      botRespond(text || msg, messages);
    }

    btn.addEventListener('click', function () {
      opened ? close() : open();
    });

    sendBtn.addEventListener('click', function () {
      send(input.value);
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') send(input.value);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
