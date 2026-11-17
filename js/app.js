/* =========================================================================
   Navegação da apresentação (funciona offline, abrindo o index.html).
   Rotas: #/abertura · #/menu · #/secao/<id> · #/projeto/<id>/<tela> · #/encerramento
   ========================================================================= */
(function () {
  const I = window.ICON;
  const CATS = window.CATEGORIES;
  const PROJ = window.PROJECTS;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const stage = $('#stage');
  const DEFAULT_ACCENT = '#6cb6ff';

  /* ---------- escala do palco 1920×1080 ---------- */
  function fit() {
    const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    stage.style.transform = `translate(-50%, -50%) scale(${s})`;
    stage.dataset.scale = s;
  }
  stage.style.transformOrigin = '50% 50%';
  window.addEventListener('resize', fit);
  fit();

  /* ---------- utilitários ---------- */
  const hexRgb = (h) => { const n = parseInt(h.slice(1), 16); return `${n >> 16 & 255}, ${n >> 8 & 255}, ${n & 255}`; };
  function setAccent(hex) {
    stage.style.setProperty('--accent', hex);
    stage.style.setProperty('--accent-rgb', hexRgb(hex));
  }
  const cat = (id) => CATS.find(c => c.id === id);
  const isAcr = (p) => /^[A-Z/]+$/.test(p.name);
  const fillIcons = (root) => $$('[data-icon]', root).forEach(el => { el.outerHTML = I(el.dataset.icon); });
  fillIcons(document);

  /* abre o sistema real em outra aba (para demonstração ao vivo) */
  function openSystem(url) {
    // sempre em outra aba: a apresentação continua aberta onde estava
    const w = window.open(url, '_blank');
    if (w) { try { w.opener = null; } catch (e) { /* ignora */ } }
  }
  const linkChip = (p) => p.url
    ? `<span class="plink" role="link" data-url="${p.url}" title="Abrir o sistema ${p.name}">${I('external')}<em>Abrir sistema</em></span>` : '';

  /* ---------- cartão de projeto ---------- */
  function card(p, opts) {
    const o = opts || {};
    const num = PROJ.indexOf(p) + 1;
    const feat = o.feature;
    return `<button class="pcard${o.compact ? ' compact' : ''}${o.cls ? ' ' + o.cls : ''}" style="--c:${p.accent};${o.d != null ? '--d:' + o.d : ''}" data-go="#/projeto/${p.id}/0" title="Abrir ${p.name}${num <= 10 ? ' (' + num % 10 + ')' : ''}">
      ${feat ? '<span class="new-badge">Novidade</span>' : ''}
      <span class="pico">${I(p.icon)}</span>
      <span class="ptx">
        <div class="pname">${p.shortName || p.name}${p.badge ? `<span class="upd-badge">${p.badge}</span>` : ''}</div>
        ${feat || (isAcr(p) && !o.compact) ? `<div class="pfull">${p.full}</div>` : ''}
        <div class="pdesc">${isAcr(p) && o.compact ? p.full : p.card}</div>
      </span>
      ${linkChip(p)}
    </button>`;
  }

  /* ---------- MENU ---------- */
  function buildMenu() {
    $('#menu-grid').innerHTML = CATS.map((c, ci) => {
      const list = PROJ.filter(p => p.cat === c.id);
      const feature = c.id === 'dez';
      return `<div class="col${feature ? ' feature' : ' wide'}">
        <button class="col-head rise" style="--c:${c.color};--d:${ci + 1}" data-go="#/secao/${c.id}">
          <span class="num">${c.num}</span>
          <span class="t"><b>${c.label}</b>${feature ? '' : `<span>${c.title.split('— ')[1] || c.sub}</span>`}</span>
          <span class="more">${I('right')}</span>
        </button>
        <div class="col-cards">${list.map((p, i) => card(p, { feature, compact: !feature, cls: 'rise', d: ci + 2 + Math.floor(i / 2) })).join('')}</div>
      </div>`;
    }).join('');
    const ch = window.CHIP;
    if (ch) $('#chip-slot').innerHTML = `
      <button class="chip-btn rise" style="--d:2" data-url="${ch.url}" title="Abrir o ${ch.name}">
        <span class="chip-av"><img src="${ch.img}" alt=""></span>
        <span class="chip-tx"><b>${ch.name}</b><span>${ch.full}</span></span>
        <span class="chip-go">${I('external')}</span>
      </button>`;
  }

  /* ---------- SEÇÃO ---------- */
  function buildSection(id) {
    const c = cat(id);
    const list = PROJ.filter(p => p.cat === c.id);
    setAccent(c.color);
    $('#sec-wrap').style.setProperty('--c', c.color);
    $('#sec-wrap').innerHTML = `
      <div class="sec-eyebrow rise" style="--d:0"><span class="dot"></span>${c.label}</div>
      <h1 class="sec-title rise" style="--d:1">${c.titleHtml}</h1>
      <p class="sec-sub rise" style="--d:2">${c.sub}</p>
      <div class="sec-cards${list.length > 4 ? ' many' : ''}" style="grid-template-columns:repeat(${Math.min(list.length, 4)},1fr)">
        ${list.map((p, i) => card(p, { compact: list.length > 4, cls: 'rise', d: 3 + i })).join('')}
      </div>`;
  }

  /* ---------- PROJETO ---------- */
  let current = { id: null, idx: 0, slides: 0 };

  function statusChip(p) {
    const c = cat(p.cat);
    const s = p.concept ? { text: 'Proposta conceitual — Previsão 2027', color: '#c9c5ff' } : c.status;
    return `<span class="status-chip${s.pulse ? ' pulse' : ''}" style="--sc:${s.color}"><span class="dot"></span>${s.text}</span>`;
  }

  function nameSize(p) {
    const n = (p.shortName || p.name).length;
    return n > 22 ? 'font-size:74px' : n > 13 ? 'font-size:86px' : '';
  }

  function slideOverview(p) {
    const fut = p.cat === '2027';
    const label = p.concept ? 'O que está previsto' : fut ? 'O que está sendo desenvolvido' : 'O que permite fazer';
    return `<div class="ov">
      <div class="ov-left">
        <div class="rs" style="--d:0">${statusChip(p)}</div>
        <div class="ov-icon rs" style="--d:1">${I(p.icon)}</div>
        <h1 class="ov-name rs" style="--d:2;${nameSize(p)}">${p.shortName && p.concept ? p.name : p.name}</h1>
        <div class="ov-full rs" style="--d:3">${p.full}</div>
        <div class="ov-tag rs" style="--d:4">${p.tagline}</div>
        <p class="ov-what rs" style="--d:5">${p.what}</p>
      </div>
      <div>
        <div class="ov-label rs" style="--d:3">${label}</div>
        <div class="feats">${p.features.map((f, i) => `<div class="feat rs" style="--d:${4 + i}"><span class="fi">${I(f[0])}</span><div><b>${f[1]}</b><span>${f[2]}</span></div></div>`).join('')}</div>
        ${fut ? `<div class="planned-note rs" style="--d:10">${I(p.concept ? 'sparkle' : 'clock')}${p.concept ? 'Proposta conceitual: ainda não se trata de um sistema entregue.' : 'Em desenvolvimento: funcionalidades podem evoluir até a entrega.'}</div>` : ''}
      </div>
    </div>`;
  }

  function slideScreen(p, s, i) {
    const total = p.screens.length;
    const fut = p.cat === '2027';
    const kick = p.concept ? 'Demonstração conceitual' : 'Como funciona na prática';
    const disc = p.concept ? 'Interface conceitual, sujeita a definição · dados fictícios'
      : fut ? 'Tela em desenvolvimento · dados fictícios' : 'Representação da tela real · dados fictícios';
    return `<div class="demo">
      <div class="demo-cap">
        <div class="step rs" style="--d:0">${kick} · ${i + 1} de ${total}</div>
        <h2 class="rs" style="--d:1">${s.title}</h2>
        <ul>${s.points.map((t, k) => `<li class="rs" style="--d:${2 + k}">${I('checkcircle')}<span>${t}</span></li>`).join('')}</ul>
        <div class="disclaimer rs" style="--d:6">${I('eye')}${disc}</div>
      </div>
      <div class="demo-stage rs" style="--d:1">${window.MOCKS[s.mock]()}</div>
    </div>`;
  }

  function slideUpdate(p) {
    const u = p.update;
    const list = (arr, ic) => arr.map((t, i) => `<li class="rs" style="--d:${4 + i}">${I(ic)}<span>${t}</span></li>`).join('');
    return `<div class="upd">
      <div class="upd-head">
        <div class="kicker rs" style="--d:0">${I('sparkle')}${u.kicker}</div>
        <h2 class="rs" style="--d:1">${u.title}</h2>
        <p class="rs" style="--d:2">${u.sub}</p>
      </div>
      <div class="upd-cmp">
        <div class="upd-col before rs" style="--d:3"><div class="lbl">Antes</div><ul>${list(u.before, 'clock')}</ul></div>
        <div class="upd-arrow rs" style="--d:5">${I('arrowright')}</div>
        <div class="upd-col after rs" style="--d:3"><div class="lbl">Agora</div><ul>${list(u.after, 'checkcircle')}</ul></div>
      </div>
      <div class="upd-steps rs" style="--d:8"><span class="hl">Criar POP em 7 etapas</span>${u.steps.map((s, i) => `${i ? `<span class="ln"></span>` : ''}<span class="st"><i>${i + 1}</i>${s}</span>`).join('')}</div>
    </div>`;
  }

  function slideBenefits(p) {
    const m = p.mascot;
    return `<div class="bn${m ? ' with-m' : ''}">
      <div>
        <div class="kicker rs" style="--d:0">${p.concept ? 'Por que investir nessa proposta?' : 'Qual é o benefício?'}</div>
        <h2 class="rs" style="--d:1">${p.benefitTitle}</h2>
        <div class="bn-cards">${p.benefits.map((b, i) => `<div class="bn-card rs" style="--d:${2 + i}"><div class="who">${b[0]}</div><div class="bi">${I(b[1])}</div><b>${b[2]}</b><p>${b[3]}</p></div>`).join('')}</div>
        ${p.howto ? `<div class="howto rs" style="--d:6"><span class="hl">Como usar</span>${p.howto.map((h, i) => `${i ? `<span class="arr">${I('right')}</span>` : ''}<span class="hs"><i>${i + 1}</i>${h}</span>`).join('')}</div>` : ''}
      </div>
      ${m ? `<div class="mascot rs" style="--d:3"><img src="${m}" alt=""></div>` : ''}
    </div>`;
  }

  function buildProject(p) {
    const slides = [slideOverview(p), ...(p.update ? [slideUpdate(p)] : []), ...p.screens.map((s, i) => slideScreen(p, s, i)), slideBenefits(p)];
    $('#pj-body').innerHTML = slides.map((h, i) => `<div class="slide" data-i="${i}">${h}</div>`).join('');
    const tabs = ['Visão geral', ...(p.update ? [p.update.tab] : []), ...p.screens.map(s => s.tab), 'Benefícios'];
    const live = $('#pj-live');
    live.hidden = !p.url;
    if (p.url) { live.dataset.url = p.url; live.title = `Abrir ${p.name} em outra aba: ${p.url}`; }
    $('#pj-dock').innerHTML = `<button class="arrow" data-step="-1" aria-label="Tela anterior">${I('left')}</button><span class="sep"></span>` +
      tabs.map((t, i) => `<button class="tab" data-tab="${i}"><span class="n">${i + 1}</span>${t}</button>`).join('') +
      `<span class="sep"></span><button class="arrow" data-step="1" aria-label="Próxima tela">${I('right')}</button>`;
    const c = cat(p.cat);
    $('#pj-crumb').innerHTML = `<span>${c.label}</span>${I('right')}<b>${isAcr(p) ? p.name + ' — ' + p.full : p.name}</b>`;
    setAccent(p.accent);
    current = { id: p.id, idx: -1, slides: slides.length };
  }

  function showSlide(i) {
    i = Math.max(0, Math.min(current.slides - 1, i));
    const prev = current.idx;
    $$('#pj-body .slide').forEach(el => {
      const k = +el.dataset.i;
      el.classList.toggle('on', k === i);
      el.classList.toggle('left', k < i);
    });
    $$('#pj-dock .tab').forEach(t => t.classList.toggle('on', +t.dataset.tab === i));
    $('#pj-dock [data-step="-1"]').disabled = i === 0;
    $('#pj-dock [data-step="1"]').disabled = i === current.slides - 1;
    current.idx = i;
    if (prev !== i) history.replaceState(null, '', `#/projeto/${current.id}/${i}`);
  }

  /* ---------- roteamento ---------- */
  function show(view) {
    $$('.view').forEach(v => v.classList.toggle('active', v.id === 'v-' + view));
    document.body.dataset.view = view;
    // tira o foco de botões da tela anterior (o passador não aciona algo escondido)
    const f = document.activeElement;
    if (f && f !== document.body && !f.closest('.view.active')) f.blur();
  }

  function route() {
    const parts = (location.hash || '#/abertura').replace(/^#\/?/, '').split('/');
    const r = parts[0];
    if (r === 'menu') { setAccent(DEFAULT_ACCENT); show('menu'); return; }
    if (r === 'encerramento') { setAccent(DEFAULT_ACCENT); show('closing'); return; }
    if (r === 'secao' && cat(parts[1])) { buildSection(parts[1]); restart('#v-section'); show('section'); return; }
    if (r === 'projeto') {
      const p = PROJ.find(x => x.id === parts[1]);
      if (p) {
        const idx = parseInt(parts[2] || '0', 10) || 0;
        if (current.id !== p.id || !document.querySelector('#v-project.active')) { buildProject(p); restart('#v-project'); }
        else setAccent(p.accent);
        show('project');
        showSlide(idx);
        return;
      }
    }
    setAccent(DEFAULT_ACCENT); show('opening');
  }
  function restart(sel) {
    // reinicia animações de entrada ao reabrir a mesma tela
    const v = $(sel); v.classList.remove('active'); void v.offsetWidth;
  }
  /* Navegação protegida: se algo falhar ao montar uma tela, a apresentação
     volta ao menu sozinha em vez de ficar parada (antes era preciso F5). */
  let recovering = false;
  function safeRoute() {
    try { route(); recovering = false; }
    catch (err) {
      console.error('Falha ao abrir a tela:', err);
      current = { id: null, idx: 0, slides: 0 };
      if (recovering) return; // evita repetir a falha em ciclo
      recovering = true;
      setAccent(DEFAULT_ACCENT);
      toggleHelp(false);
      if (location.hash !== '#/menu') location.hash = '#/menu'; else { show('menu'); recovering = false; }
    }
  }
  function go(hash) {
    if (location.hash === hash) safeRoute(); else location.hash = hash;
  }
  window.addEventListener('hashchange', () => {
    const h = location.hash;
    // ao sair do projeto, força recriação ao voltar
    if (!h.startsWith('#/projeto/')) current.id = null;
    safeRoute();
  });
  /* ao voltar de outra aba (sistema aberto para demonstração), garante a tela certa */
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) { fit(); if (!$('.view.active')) safeRoute(); }
  });

  /* ---------- tela cheia ---------- */
  function toggleFs() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen && document.documentElement.requestFullscreen().catch(() => {});
    else document.exitFullscreen && document.exitFullscreen();
  }
  document.addEventListener('fullscreenchange', () => {
    $$('[data-fs]').forEach(b => { b.innerHTML = I(document.fullscreenElement ? 'shrink' : 'expand'); });
  });

  /* ---------- ajuda ---------- */
  const help = $('#help');
  const toggleHelp = (on) => help.classList.toggle('on', on != null ? on : !help.classList.contains('on'));

  /* ---------- cliques ---------- */
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-url],[data-go],[data-fs],[data-help],[data-tab],[data-step]');
    if (!t) { if (e.target === help) toggleHelp(false); return; }
    if (t.hasAttribute('data-url')) { e.preventDefault(); e.stopPropagation(); openSystem(t.dataset.url); }
    else if (t.hasAttribute('data-go')) go(t.dataset.go);
    else if (t.hasAttribute('data-fs')) toggleFs();
    else if (t.hasAttribute('data-help')) toggleHelp(false);
    else if (t.hasAttribute('data-tab')) showSlide(+t.dataset.tab);
    else if (t.hasAttribute('data-step')) showSlide(current.idx + +t.dataset.step);
  });

  /* brilho que acompanha o ponteiro nos cartões */
  /* (no máximo 1 atualização por quadro, para não sobrecarregar a placa de vídeo) */
  let glowEvt = null;
  document.addEventListener('pointermove', (e) => {
    if (glowEvt) { glowEvt = e; return; }
    glowEvt = e;
    requestAnimationFrame(() => {
      const ev = glowEvt; glowEvt = null;
      const c = ev.target.closest && ev.target.closest('.pcard');
      if (!c) return;
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', ((ev.clientX - r.left) / r.width * 100) + '%');
      c.style.setProperty('--my', ((ev.clientY - r.top) / r.height * 100) + '%');
    });
  }, { passive: true });

  /* ---------- teclado / passador de slides ---------- */
  document.addEventListener('keydown', (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const view = document.body.dataset.view;
    const k = e.key;
    if (help.classList.contains('on') && (k === 'Escape' || k === '?')) { toggleHelp(false); e.preventDefault(); return; }
    const next = ['ArrowRight', 'PageDown', ' ', 'Enter'].includes(k);
    const prev = ['ArrowLeft', 'PageUp', 'Backspace'].includes(k);
    if (view === 'project') {
      if (next && k !== 'Enter') { showSlide(current.idx + 1); e.preventDefault(); return; }
      if (prev) { showSlide(current.idx - 1); e.preventDefault(); return; }
    }
    if (view === 'opening' && next) { go('#/menu'); e.preventDefault(); return; }
    if (view === 'section' && prev) { go('#/menu'); e.preventDefault(); return; }
    if (view === 'closing' && prev) { go('#/menu'); e.preventDefault(); return; }
    switch (k.toLowerCase()) {
      case 'escape': case 'm': if (view !== 'menu') go('#/menu'); break;
      case 'h': case 'home': go('#/abertura'); break;
      case 'e': case 'end': go('#/encerramento'); break;
      case 'f': case 'f11': if (k === 'F11') e.preventDefault(); toggleFs(); break;
      case '?': toggleHelp(); break;
      default:
        if (view === 'menu' && /^[0-9]$/.test(k)) {
          const p = PROJ[(+k + 9) % 10];
          if (p) go(`#/projeto/${p.id}/0`);
        }
    }
  });

  /* ---------- pré-carregamento das imagens ---------- */
  PROJ.forEach(p => { if (p.mascot) { const im = new Image(); im.src = p.mascot; } });

  buildMenu();
  safeRoute();
})();
