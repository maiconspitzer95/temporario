/* =========================================================================
   Representações das telas de cada sistema.
   Baseadas nos menus, rótulos, colunas e cores reais de cada aplicação.
   TODOS os dados exibidos são fictícios e meramente demonstrativos.
   ========================================================================= */
(function () {
  const I = window.ICON;
  const LOGO = 'assets/img/logo-santa-casa.png';

  /* ---------- utilitários ---------- */
  const badge = (t, tone) => `<span class="m-badge b-${tone || 'neutral'}">${t}</span>`;
  const win = (theme, label, inner, concept) => `
    <div class="mock ${theme}">
      <div class="m-chrome">
        <div class="dots"><i></i><i></i><i></i></div>
        <div class="addr"><span>${I('lock')} ${label}</span></div>
        <span class="demo-tag${concept ? ' concept' : ''}">${concept ? 'Demonstração conceitual' : 'Dados fictícios'}</span>
      </div>
      <div class="m-body">${inner}</div>
    </div>`;
  const side = (logo, groups, foot) => `
    <aside class="m-side">
      <div class="m-logo">${logo}</div>
      ${groups.map(g => (g.t ? `<div class="m-sec">${g.t}</div>` : '') +
        g.i.map(([ic, tx, on]) => `<div class="m-mi${on ? ' on' : ''}">${I(ic)}<span>${tx}</span></div>`).join('')).join('')}
      ${foot ? `<div class="foot">${foot}</div>` : ''}
    </aside>`;
  const user = (ini, name, role) => `<div class="m-av">${ini}</div><div class="m-user"><b>${name}</b>${role}</div>`;
  const kpis = (cols, list) => `<div class="m-kpis" style="grid-template-columns:repeat(${cols},1fr)">${list.map(k =>
    `<div class="m-kpi" style="${k.c ? '--kc:' + k.c : ''}"><div class="l">${k.i ? I(k.i) : ''}${k.l}</div><div class="v">${k.v}</div>${k.f ? `<div class="f">${k.f}</div>` : ''}</div>`).join('')}</div>`;
  const table = (heads, rows, cls) => `<table class="m-table ${cls || ''}"><thead><tr>${heads.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r => {
    const tr = Array.isArray(r) ? { c: r } : r;
    return `<tr class="${tr.cls || ''}">${tr.c.map(c => `<td>${c}</td>`).join('')}</tr>`;
  }).join('')}</tbody></table>`;
  const bars = (list, max) => `<div class="m-bars">${list.map(([l, v, suf]) =>
    `<div class="m-bar"><span>${l}</span><div class="tr"><i style="width:${Math.round(v / max * 100)}%"></i></div><b>${v}${suf || ''}</b></div>`).join('')}</div>`;
  const cols = (list, max, h) => `<div class="m-cols" style="${h ? 'height:' + h + 'px' : ''}">${list.map(([l, v]) =>
    `<div class="c"><i style="height:${Math.round(v / max * 100)}%"></i>${l}</div>`).join('')}</div>`;
  const qr = () => {
    let s = '', seed = 7;
    const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
    for (let y = 0; y < 21; y++) for (let x = 0; x < 21; x++) {
      const finder = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13);
      if (finder) continue;
      if (rnd() > .52) s += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
    }
    const f = (x, y) => `<rect x="${x}" y="${y}" width="7" height="7" fill="#0b2345"/><rect x="${x + 1}" y="${y + 1}" width="5" height="5" fill="#fff"/><rect x="${x + 2}" y="${y + 2}" width="3" height="3" fill="#0b2345"/>`;
    return `<div class="qr"><svg viewBox="0 0 21 21" shape-rendering="crispEdges"><g fill="#0b2345">${s}</g>${f(0, 0)}${f(14, 0)}${f(0, 14)}</svg></div>`;
  };
  const steps = (list, cur) => `<div class="steps">${list.map((t, i) =>
    `${i ? `<div class="ln${i <= cur ? ' done' : ''}"></div>` : ''}<div class="st${i < cur ? ' done' : i === cur ? ' on' : ''}"><i>${i < cur ? '✓' : i + 1}</i>${t}</div>`).join('')}</div>`;

  const M = {};

  /* =====================================================================
     BIBLIOTECA VIRTUAL
     ===================================================================== */
  const bibHeader = `
    <div class="m-top" style="height:70px;background:rgba(8,26,56,.6)">
      <img src="${LOGO}" style="height:34px">
      <div style="line-height:1.2"><div style="font-size:11.5px;letter-spacing:.18em;font-weight:700;color:#8fbcef">REDE INTERNA</div><b>Biblioteca Virtual Santa Casa de Pelotas</b></div>
      <div class="sp"></div>
      <span class="m-btn sm">${I('usercheck')} Usuário Demonstração · Qualidade</span>
      <span class="m-btn sm">Configurações</span><span class="m-btn sm">Alterar senha</span><span class="m-btn sm">Sair</span>
    </div>`;
  M.bibMenu = () => {
    const card = (ic, c, t, d, f) => `
      <div class="m-card" style="display:flex;flex-direction:column;gap:8px;padding:16px">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="width:44px;height:44px;border-radius:13px;display:grid;place-items:center;font-size:22px;color:${c};background:linear-gradient(160deg,${c}44,${c}14);border:1px solid ${c}55">${I(ic)}</div>
          <b style="font-size:18px">${t}</b>
        </div>
        <span style="font-size:14px;color:var(--m-muted);line-height:1.35">${d}</span>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:auto;font-size:13px;color:${c};font-weight:700">${f}<span class="m-iconbtn" style="width:30px;height:30px;font-size:15px;color:${c}">${I('right')}</span></div>
      </div>`;
    return win('t-bib', 'Biblioteca Virtual — Menu principal', `
      <div class="m-main" style="height:100%">
        ${bibHeader}
        <div class="m-content" style="gap:14px">
          <div class="m-h"><div><div class="k">Menu principal</div><h3>Biblioteca Virtual Santa Casa de Pelotas</h3>
            <p>Escolha uma área para navegar, enviar documentos, aprovar pendências ou acompanhar seus envios.</p></div></div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
            ${card('folder', '#7fb6ff', 'Biblioteca', 'Acesse pastas, navegue pelos documentos e visualize.', 'Pasta atual: Biblioteca')}
            ${card('upload', '#6fe0a8', 'Enviar documentos', 'Anexe arquivos, escolha a pasta de destino e encaminhe para revisão.', '7 pastas disponíveis')}
            ${card('filepen', '#7fd7ff', 'Criar POP', 'Assistente que gera o POP no modelo oficial.', 'Modelo institucional')}
            ${card('clipboard', '#b49cff', 'Revisão da Qualidade', 'Analise documentos recém-enviados e aprove ou reprove com justificativa.', '2 documentos pendentes')}
            ${card('usercheck', '#ffc266', 'Aprovação do Gestor', 'Documentos do seu setor que já passaram pela Qualidade.', '1 aguardando gestor')}
            ${card('listcheck', '#66d9ef', 'Status de envio', 'Acompanhe pendências, aprovações e justificativas.', 'Acompanhamento')}
          </div>
          ${kpis(4, [
            { i: 'filetext', l: 'Enviados', v: '13', c: '#7fb6ff' },
            { i: 'eye', l: 'Em revisão', v: '2', c: '#b49cff' },
            { i: 'checkcircle', l: 'Aprovados', v: '9', c: '#4fdc9a' },
            { i: 'alert', l: 'Reprovados', v: '2', c: '#ff8591' }])}
        </div>
      </div>`);
  };
  M.bibPop = () => win('t-bib', 'Biblioteca Virtual — Criar POP', `
    <div class="m-main" style="height:100%">
      ${bibHeader}
      <div class="m-content">
        <div class="m-h"><div><div class="k">Criar POP</div><h3>Procedimento Operacional Padrão</h3><p>Preencha as etapas — o documento é gerado no modelo oficial da instituição.</p></div>
          <span class="m-badge b-blue">${I('filetext')} Modelo institucional</span></div>
        <div class="m-card" style="padding:18px 20px">${steps(['Identificação', 'Siglas', 'Materiais', 'Tarefas', 'Registros', 'Referências', 'Alterações'], 3)}</div>
        <div style="display:grid;grid-template-columns:1.45fr 1fr;gap:14px;flex:1;min-height:0">
          <div class="m-card" style="display:flex;flex-direction:column;gap:12px">
            <div class="ct">Etapa 4 de 7 · Tarefas <small>Descreva a sequência de execução</small></div>
            ${['Realizar a higienização das mãos antes do procedimento.', 'Conferir a identificação do paciente (nome e data de nascimento).', 'Separar os materiais listados na etapa anterior.', 'Registrar o procedimento no prontuário.'].map((t, i) => `
              <div style="display:flex;gap:12px;align-items:center;padding:11px 14px;border-radius:12px;background:var(--m-nest);border:1px solid var(--m-line)">
                <span style="width:28px;height:28px;border-radius:9px;display:grid;place-items:center;font-weight:700;font-size:13.5px;background:rgba(108,182,255,.2);color:#cfe6ff">${i + 1}</span><span style="font-size:15px">${t}</span></div>`).join('')}
            <div class="m-btn sm" style="width:max-content">${I('plus')} Adicionar tarefa</div>
          </div>
          <div class="m-card" style="display:flex;flex-direction:column;gap:12px">
            <div class="ct">Identificação</div>
            <div class="m-field">Título do POP<div class="in">Administração de medicamentos por via oral</div></div>
            <div class="m-field">Setor do POP<div class="in">Enfermagem — Internação</div></div>
            <div class="m-field">Pasta destino<div class="in">${I('folder')} POPs / Enfermagem</div></div>
            <div style="margin-top:auto;display:flex;gap:10px;justify-content:flex-end"><span class="m-btn">Voltar</span><span class="m-btn p">Próxima etapa ${I('right')}</span></div>
          </div>
        </div>
      </div>
    </div>`);
  M.bibReview = () => win('t-bib', 'Biblioteca Virtual — Revisão da Qualidade', `
    <div class="m-main" style="height:100%">
      ${bibHeader}
      <div class="m-content">
        <div class="m-h"><div><div class="k">Revisão da Qualidade</div><h3>Documentos aguardando análise</h3></div>
          <div class="m-tabs"><span class="on">Pendentes da Qualidade · 3</span><span>Enviados aos Gestores</span></div></div>
        <div class="m-card" style="display:flex;align-items:center;gap:14px;padding:14px 18px;font-size:14.5px">
          ${[['upload', 'Envio do colaborador', 'ok'], ['clipboard', 'Revisão da Qualidade', 'now'], ['usercheck', 'Aprovação do Gestor', ''], ['book', 'Publicado na Biblioteca', '']].map(([ic, t, s], i) =>
            `${i ? `<span style="flex:1;height:2px;background:${s || i < 2 ? 'rgba(108,182,255,.55)' : 'var(--m-line)'}"></span>` : ''}<span style="display:flex;align-items:center;gap:9px;${s === 'now' ? 'color:#fff;font-weight:700' : 'color:var(--m-muted)'}"><span style="width:32px;height:32px;border-radius:50%;display:grid;place-items:center;font-size:16px;${s === 'ok' ? 'background:rgba(79,220,154,.22);color:#4fdc9a' : s === 'now' ? 'background:#3d8ff0;color:#fff;box-shadow:0 0 0 4px rgba(61,143,240,.25)' : 'background:var(--m-nest);border:1px solid var(--m-line)'}">${I(ic)}</span>${t}</span>`).join('')}
        </div>
        <div class="m-card" style="padding:8px 10px">
        ${table(['Documento', 'Setor do POP', 'Pasta destino', 'Data e hora', 'Status', 'Ações'], [
          [`<b>POP — Higienização das mãos</b><span class="sub">Versão 3 · PDF</span>`, 'CCIH', 'POPs / Controle de Infecção', '14/11 · 09:42', badge('Pendente Qualidade', 'blue'), `<span class="m-btn sm p">Aprovar</span> <span class="m-btn sm">Reprovar</span>`],
          [`<b>POP — Admissão do paciente</b><span class="sub">Versão 1 · Gerado pelo assistente</span>`, 'Internação', 'POPs / Enfermagem', '14/11 · 08:15', badge('Corrigido pelo colaborador', 'violet'), `<span class="m-btn sm p">Aprovar</span> <span class="m-btn sm">Reprovar</span>`],
          [`<b>Protocolo de prevenção de quedas</b><span class="sub">Versão 2 · PDF</span>`, 'Qualidade', 'Protocolos', '13/11 · 16:30', badge('Pendente Qualidade', 'blue'), `<span class="m-btn sm p">Aprovar</span> <span class="m-btn sm">Reprovar</span>`],
          [`<b>POP — Limpeza terminal</b><span class="sub">Versão 4 · DOCX</span>`, 'Higienização', 'POPs / Apoio', '12/11 · 11:05', badge('Pendente Gestor', 'amber'), `<span class="m-dim" style="font-size:13.5px">Com o gestor</span>`]
        ])}</div>
      </div>
    </div>`);

  /* Meus POPs — rascunhos, correções e enviados */
  M.bibMyPops = () => {
    const row = (t, cod, setor, etapa, st, tone, act) => `
      <div style="display:grid;grid-template-columns:1.6fr .9fr 1fr .9fr auto;gap:14px;align-items:center;padding:13px 16px;border-radius:12px;background:var(--m-nest);border:1px solid var(--m-line);font-size:14.5px">
        <div><b style="font-size:15.5px">${t}</b><div class="m-dim" style="font-size:13px;margin-top:2px">${cod}</div></div>
        <span>${setor}</span><span class="m-dim">${etapa}</span>${badge(st, tone)}<span class="m-btn sm${act[1] ? ' p' : ''}">${act[0]}</span>
      </div>`;
    return win('t-bib', 'Biblioteca Virtual — Meus POPs', `
      <div class="m-main" style="height:100%">
        ${bibHeader}
        <div class="m-content" style="gap:14px">
          <div class="m-h"><div><div class="k">Criar POP</div><h3>Meus POPs</h3><p>Rascunhos, correções e documentos enviados.</p></div>
            <span class="m-btn p">${I('plus')} Novo POP</span></div>
          ${kpis(4, [
            { i: 'filepen', l: 'Rascunhos', v: '2', c: '#7fb6ff' },
            { i: 'alert', l: 'Devolvidos p/ correção', v: '1', c: '#ff8591' },
            { i: 'eye', l: 'Em revisão', v: '1', c: '#b49cff' },
            { i: 'checkcircle', l: 'Publicados', v: '4', c: '#4fdc9a' }])}
          <div class="m-card" style="display:flex;flex-direction:column;gap:9px">
            <div class="ct">Documentos <small>Continue de onde parou</small></div>
            ${row('Administração de medicamentos por via oral', 'POP.ENF.014 · Revisão 00', 'Enfermagem', 'Etapa 4 de 7', 'Rascunho', 'blue', ['Continuar', 1])}
            ${row('Admissão do paciente na internação', 'POP.ENF.009 · Revisão 02', 'Internação', 'Etapa 7 de 7', 'Devolvido para correção', 'red', ['Corrigir', 1])}
            ${row('Higienização das mãos', 'POP.CCIH.003 · Revisão 03', 'CCIH', 'Enviado', 'Pendente Qualidade', 'violet', ['Visualizar'])}
            ${row('Limpeza concorrente do leito', 'POP.HIG.021 · Revisão 00', 'Higienização', 'Etapa 2 de 7', 'Rascunho', 'blue', ['Continuar'])}
          </div>
        </div>
      </div>`);
  };

  /* Documento gerado no modelo Word oficial */
  M.bibPopDoc = () => {
    const sec = (n, t, body) => `<div style="margin-top:12px"><div style="font-weight:700;font-size:12.5px;color:#0b2a5e;border-bottom:1.5px solid #0b2a5e;padding-bottom:3px">${n}. ${t}</div><div style="font-size:11.5px;line-height:1.5;margin-top:6px;color:#25344d">${body}</div></div>`;
    const cell = (l, v) => `<td style="border:1px solid #9fb2cc;padding:5px 7px;font-size:10.5px"><div style="color:#5a6b85;font-size:9.5px;text-transform:uppercase;letter-spacing:.06em">${l}</div><b style="color:#0b2345">${v}</b></td>`;
    return win('t-bib', 'Biblioteca Virtual — Visualizar documento', `
      <div class="m-main" style="height:100%">
        ${bibHeader}
        <div class="m-content" style="flex-direction:row;gap:16px">
          <div style="flex:1;min-width:0;display:flex;justify-content:center;align-items:flex-start;padding:6px;border-radius:14px;background:rgba(0,0,0,.25);overflow:hidden">
            <div style="width:94%;background:#fff;color:#0b2345;border-radius:4px;padding:22px 26px;box-shadow:0 14px 40px rgba(0,0,0,.4)">
              <table style="width:100%;border-collapse:collapse"><tr>
                <td rowspan="2" style="border:1px solid #9fb2cc;padding:6px;width:92px;text-align:center"><img src="${LOGO}" style="height:34px"></td>
                <td colspan="3" style="border:1px solid #9fb2cc;padding:6px 8px;text-align:center"><div style="font-size:9.5px;letter-spacing:.14em;color:#5a6b85">PROCEDIMENTO OPERACIONAL PADRÃO</div><b style="font-size:14px">Administração de medicamentos por via oral</b></td></tr>
                <tr>${cell('Código', 'POP.ENF.014')}${cell('Revisão', '00')}${cell('Vigência', '2 anos')}</tr>
                <tr>${cell('Setor', 'Enfermagem')}${cell('Elaborador', 'Enf. Responsável')}${cell('Verificador', 'Qualidade')}${cell('Aprovador', 'Gestor do setor')}</tr>
              </table>
              ${sec(1, 'Siglas e definições', 'VO — Via oral · PRM — Prescrição médica')}
              ${sec(2, 'Materiais', 'Copo descartável · Bandeja · Prescrição médica · Etiqueta de identificação')}
              ${sec(3, 'Tarefas', '1. Realizar a higienização das mãos.<br>2. Conferir a identificação do paciente.<br>3. Conferir medicamento, dose, via e horário.<br>4. Registrar a administração no prontuário.')}
              ${sec(4, 'Registros', 'Prontuário do paciente · Checagem da prescrição')}
            </div>
          </div>
          <div style="width:250px;display:flex;flex-direction:column;gap:12px">
            <div class="m-card" style="display:flex;flex-direction:column;gap:10px">
              <div class="ct">Documento gerado</div>
              <div style="display:flex;gap:10px;align-items:center;font-size:14px"><span style="width:38px;height:38px;border-radius:10px;display:grid;place-items:center;background:rgba(108,182,255,.2);color:#cfe6ff;font-size:19px">${I('filetext')}</span><div><b>POP.ENF.014.docx</b><div class="m-dim" style="font-size:12.5px">Modelo Word oficial</div></div></div>
              ${badge('Etapa 7 de 7 concluída', 'green')}
            </div>
            <div class="m-card" style="display:flex;flex-direction:column;gap:10px">
              <span class="m-btn">${I('download')} Salvar rascunho</span>
              <span class="m-btn">${I('eye')} Visualizar documento</span>
              <span class="m-btn p">${I('send')} Enviar para Qualidade</span>
            </div>
          </div>
        </div>
      </div>`);
  };

  /* =====================================================================
     MP — MOVIMENTAÇÃO DE PESSOAL
     ===================================================================== */
  const mpSide = (on) => side(`<div class="badge-sq">SC</div><div class="lt"><b>MP</b>Movimentação de Pessoal</div>`, [{
    i: [['plus', 'Criar nova MP', on === 0], ['listcheck', 'Status MP', on === 1], ['check', 'Pendentes para aprovação', on === 2], ['eye', 'Monitoramento RH'], ['chart', 'Relatórios e Dashboards', on === 4], ['filetext', 'Relatórios detalhados'], ['settings', 'Administração']]
  }], 'Alterar senha · Sair<br>MP v1.0');
  const mpTop = (crumb) => `<div class="m-top"><span>Santa Casa / <b>${crumb}</b></span><div class="sp"></div>${user('UD', 'Usuário Demonstração', 'Gestor imediato')}</div>`;
  M.mpNew = () => win('t-mp', 'MP — Criar nova MP', `
    <div class="m-app">${mpSide(0)}
      <div class="m-main">${mpTop('Nova MP')}
        <div class="m-content" style="gap:18px">
          <div class="m-h"><div><div class="k">Nova solicitação</div><h3>Criar nova MP</h3><p>Etapa 1 de 3 – Qual tipo de movimentação?</p></div></div>
          <div class="m-card" style="padding:16px 20px">${steps(['Tipo de movimentação', 'Dados da solicitação', 'Revisão e envio'], 0)}</div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
            <div class="opt on"><div class="oi">${I('trending')}</div><b>Aumento de quadro</b><span>Abertura de nova vaga no setor.</span></div>
            <div class="opt"><div class="oi">${I('refresh')}</div><b>Reposição</b><span>Substituição de colaborador desligado ou transferido.</span></div>
            <div class="opt"><div class="oi">${I('users')}</div><b>Banco de Talentos</b><span>Aproveitamento de candidatos já avaliados.</span></div>
            <div class="opt"><div class="oi">${I('swap')}</div><b>Alteração</b><span>Mudança de cargo, setor, salário ou jornada.</span></div>
            <div class="opt"><div class="oi">${I('logout')}</div><b>Desligamento</b><span>Solicitação de desligamento de colaborador.</span></div>
            <div class="opt" style="justify-content:center;align-items:flex-start;background:transparent;border-style:dashed">
              <span style="font-size:14px">Após o envio, a MP segue automaticamente para as aprovações necessárias.</span></div>
          </div>
          <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:auto"><span class="m-btn">Cancelar</span><span class="m-btn p">Continuar ${I('right')}</span></div>
        </div>
      </div>
    </div>`);
  M.mpApprove = () => win('t-mp', 'MP — Pendentes para minha aprovação', `
    <div class="m-app">${mpSide(2)}
      <div class="m-main">${mpTop('Aprovações')}
        <div class="m-content">
          <div class="m-h"><div><div class="k">Fila de trabalho</div><h3>Pendentes para minha aprovação</h3></div></div>
          <div style="display:grid;grid-template-columns:1.25fr 1fr;gap:14px;flex:1;min-height:0">
            <div class="m-card" style="padding:8px 10px">
              ${table(['MP', 'Cargo', 'Na etapa', ''], [
                { cls: 'hl', c: ['<span class="mono">MP-000128</span><span class="sub">Reposição</span>', 'Téc. de Enfermagem<span class="sub">UTI Adulto</span>', badge('2d 3h', 'amber'), '<span class="m-btn sm p">Abrir</span>'] },
                ['<span class="mono">MP-000131</span><span class="sub">Aumento de quadro</span>', 'Farmacêutico<span class="sub">Farmácia</span>', badge('1d 6h', 'neutral'), '<span class="m-btn sm">Abrir</span>'],
                ['<span class="mono">MP-000133</span><span class="sub">Alteração</span>', 'Assistente Adm.<span class="sub">Faturamento</span>', badge('5h', 'neutral'), '<span class="m-btn sm">Abrir</span>'],
                ['<span class="mono">MP-000134</span><span class="sub">Desligamento</span>', 'Auxiliar<span class="sub">Nutrição</span>', badge('2h', 'neutral'), '<span class="m-btn sm">Abrir</span>']
              ])}
            </div>
            <div class="m-card" style="display:flex;flex-direction:column;gap:12px">
              <div class="ct"><span><span class="mono" style="font-family:Consolas,monospace;color:var(--m-acc)">MP-000128</span> · Reposição</span>${badge('Aguardando Direção', 'blue')}</div>
              <div class="timeline">
                <div class="tl ok"><i>✓</i><div><b>Solicitação criada</b><span>Gestor imediato</span></div><em>11/11</em></div>
                <div class="tl ok"><i>✓</i><div><b>Gerente</b><span>Aprovado</span></div><em>12/11</em></div>
                <div class="tl ok"><i>✓</i><div><b>Gestão de Pessoas</b><span>Aprovado</span></div><em>13/11</em></div>
                <div class="tl now"><i>●</i><div><b>Direção</b><span>Aguardando decisão</span></div><em>agora</em></div>
                <div class="tl"><i>○</i><div><b>Em contratação</b><span>Monitoramento RH</span></div><em></em></div>
              </div>
              <div style="display:flex;gap:8px;margin-top:auto"><span class="m-btn p" style="flex:1;justify-content:center">${I('check')} Aprovar</span><span class="m-btn" style="flex:1;justify-content:center">Devolver</span><span class="m-btn" style="flex:1;justify-content:center;color:#ffa5b2">Reprovar</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>`);
  M.mpDash = () => win('t-mp', 'MP — Dashboard de Movimentações', `
    <div class="m-app">${mpSide(4)}
      <div class="m-main">${mpTop('Visão geral')}
        <div class="m-content" style="gap:14px">
          <div class="m-h"><div><div class="k">Indicadores</div><h3>Dashboard de Movimentações</h3></div><span class="m-btn">${I('filetext')} Consultar e exportar relatórios</span></div>
          ${kpis(4, [
            { l: 'MPs abertas', v: '27', c: '#8bcaff' }, { l: 'Aguardando Gerente', v: '6', c: '#a3d7ff' },
            { l: 'Aguardando Gestão de Pessoas', v: '5', c: '#a3d7ff' }, { l: 'Aguardando Direção', v: '4', c: '#a3d7ff' },
            { l: 'Aguardando Jurídico', v: '2', c: '#f4ce88' }, { l: 'Aguardando Financeiro', v: '3', c: '#f4ce88' },
            { l: 'Aguardando Provedor', v: '1', c: '#f4ce88' }, { l: 'Concluídas no mês', v: '38', c: '#93e4c0' }])}
          <div style="display:grid;grid-template-columns:1.6fr 1fr;gap:14px;flex:1;min-height:0">
            <div class="m-card"><div class="ct">MPs por mês <small>Últimos 12 meses</small></div>
              ${cols([['dez', 22], ['jan', 30], ['fev', 26], ['mar', 34], ['abr', 29], ['mai', 37], ['jun', 33], ['jul', 41], ['ago', 36], ['set', 44], ['out', 40], ['nov', 31]], 46, 170)}</div>
            <div class="m-card" style="display:flex;flex-direction:column;gap:10px"><div class="ct">Tempo médio de conclusão</div>
              <div style="font-size:52px;font-weight:700;letter-spacing:-.02em">4,6 <span style="font-size:20px;color:var(--m-muted);font-weight:500">dias</span></div>
              <div class="ct" style="margin-top:6px">MPs por tipo</div>
              ${bars([['Reposição', 46], ['Aumento de quadro', 21], ['Alteração', 18], ['Desligamento', 15]], 46)}</div>
          </div>
        </div>
      </div>
    </div>`);

  /* =====================================================================
     PAINEL DE FICHAS
     ===================================================================== */
  M.fichasTv = () => `
    <div class="tv"><div class="scr mock t-fichas-tv" style="width:100%;height:660px;border:0;border-radius:8px;box-shadow:none;display:block">
      <div class="m-body" style="height:100%;padding:34px 40px;display:flex;flex-direction:column;gap:22px;font-family:'Trebuchet MS','Segoe UI',sans-serif">
        <span class="demo-tag" style="position:absolute;right:20px;top:18px;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#f4ce88;background:rgba(160,115,43,.2);border:1px solid rgba(244,206,136,.3);padding:3px 10px;border-radius:999px">Dados fictícios</span>
        <div><div style="font-size:15px;letter-spacing:.2em;text-transform:uppercase;color:#f0a46b;font-weight:700">Santa Casa de Pelotas</div>
          <div style="font-size:42px;font-weight:700;margin-top:2px">Recepção Central</div></div>
        <div style="border-radius:22px;padding:24px 32px;background:linear-gradient(120deg,rgba(240,164,107,.22),rgba(22,149,140,.18));border:1px solid rgba(255,255,255,.14);display:flex;align-items:center;gap:30px">
          <div style="font-size:18px;letter-spacing:.14em;text-transform:uppercase;color:#ffd9bd;width:130px;line-height:1.3">Última<br>chamada</div>
          <div style="font-size:88px;font-weight:800;letter-spacing:-.02em;line-height:1">P 07</div>
          <div style="font-size:30px;line-height:1.25"><b>Preferencial</b><br><span style="color:#ffd9bd">Guichê 2</span></div>
          <div style="margin-left:auto;font-size:40px;color:#ffd9bd">${I('volume')}</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1.25fr;gap:22px;flex:1;min-height:0">
          <div style="border-radius:20px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);padding:18px 22px">
            <div style="font-size:16px;letter-spacing:.14em;text-transform:uppercase;color:#a9c3cc;margin-bottom:8px">Últimas 5 chamadas</div>
            ${[['N 23', 'Atendimento Geral', 'Guichê 1'], ['E 11', 'Exames', 'Guichê 3'], ['P 06', 'Preferencial', 'Guichê 2'], ['N 22', 'Atendimento Geral', 'Guichê 1'], ['A 04', 'Agendamento', 'Guichê 4']].map(([f, t, g]) =>
              `<div style="display:flex;align-items:center;gap:16px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.08);font-size:20px"><b style="width:76px;font-size:24px">${f}</b><span style="flex:1;color:#cfdde2">${t}</span><span style="color:#f0a46b">${g}</span></div>`).join('')}
          </div>
          <div style="border-radius:20px;background:linear-gradient(140deg,rgba(13,108,108,.45),rgba(8,21,29,.6));border:1px solid rgba(255,255,255,.1);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;text-align:center">
            <img src="${LOGO}" style="height:70px;opacity:.95"><div style="font-size:22px;font-weight:700">Espaço para mídias institucionais</div><div style="font-size:16px;color:#a9c3cc">Campanhas, avisos e orientações aos pacientes</div>
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:13px;color:#8aa3ad"><span>Desenvolvido pela Equipe de T.I. Santa Casa de Pelotas</span><span>Versão 1.5</span></div>
      </div>
    </div></div>`;
  M.fichasRecep = () => win('t-fichas-light', 'Painel de Fichas — Recepção', `
    <div class="m-main" style="height:100%">
      <div class="m-top" style="height:66px"><b style="font-size:22px">Recepção do Ambulatório</b><div class="sp"></div><span style="color:#0d6c6c;font-weight:700;font-size:14px">Trocar acesso</span></div>
      <div class="m-content" style="gap:14px">
        <div class="m-card" style="display:flex;align-items:flex-end;gap:14px">
          <div class="m-field" style="width:240px">Filtro por tipo<div class="in" style="background:#fff;color:#182028;border-color:rgba(0,0,0,.12)">Todos os tipos</div></div>
          <div class="m-field" style="width:170px">Guichê atual<div class="in" style="background:#e1f1f0;color:#0d6c6c;border-color:transparent;font-weight:700">Guichê 2</div></div>
          <span class="m-btn">Trocar guichê</span><div class="sp" style="flex:1"></div>
          <span class="m-btn p" style="height:50px;font-size:17px;padding:0 24px">${I('volume')} Chamar próxima ficha</span>
        </div>
        <div style="display:grid;grid-template-columns:.8fr 1.2fr 1fr;gap:14px">
          <div class="m-card"><div class="ct">Em aberto agora</div><div style="font-size:58px;font-weight:800;color:#0d6c6c;line-height:1.1">12</div><span class="m-dim" style="font-size:13.5px">fichas aguardando</span></div>
          <div class="m-card"><div class="ct">Fichas do dia por tipo</div>
            ${bars([['Atendimento Geral', 41], ['Preferencial', 18], ['Exames', 23], ['Agendamento', 9]], 41)}</div>
          <div class="m-card"><div class="ct">Status do dia</div>
            <div style="display:grid;gap:9px;margin-top:8px;font-size:15px">
              <div class="m-row"><span class="m-grow">Aguardando</span>${badge('12', 'amber')}</div>
              <div class="m-row"><span class="m-grow">Chamando</span>${badge('1', 'blue')}</div>
              <div class="m-row"><span class="m-grow">Finalizadas</span>${badge('78', 'green')}</div></div></div>
        </div>
        <div class="m-card" style="padding:8px 10px">
          ${table(['Ficha', 'Tipo', 'Status', 'Ações'], [
            { cls: 'hl', c: ['<b style="font-size:17px">P 07</b>', 'Preferencial', badge('Chamando', 'blue'), '<span class="m-btn sm">Repetir chamada</span> <span class="m-btn sm p">Finalizar</span>'] },
            ['<b style="font-size:17px">N 24</b>', 'Atendimento Geral', badge('Aguardando', 'amber'), '<span class="m-btn sm">Chamar ficha</span>'],
            ['<b style="font-size:17px">E 12</b>', 'Exames', badge('Aguardando', 'amber'), '<span class="m-btn sm">Chamar ficha</span>']
          ])}
        </div>
      </div>
    </div>`);
  M.fichasTablet = () => {
    const tab = (inner) => `<div class="tablet" style="width:560px;height:420px;padding:16px;border-radius:30px"><div class="scr" style="background:linear-gradient(160deg,#f7f0e6,#eef3f7 55%,#dbe8ee);font-family:'Trebuchet MS','Segoe UI',sans-serif;color:#182028;padding:26px 28px;display:flex;flex-direction:column">${inner}</div></div>`;
    const b = (t) => `<div style="border-radius:18px;background:linear-gradient(135deg,#0d6c6c,#16958c);color:#fff;font-size:22px;font-weight:700;display:grid;place-items:center;box-shadow:0 10px 24px rgba(13,108,108,.3)">${t}</div>`;
    const e = (em, t) => `<div style="border-radius:18px;background:#fff;border:1px solid rgba(0,0,0,.08);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;font-size:16px;font-weight:700;color:#3a4650"><span style="font-size:44px;line-height:1">${em}</span>${t}</div>`;
    return `<div style="position:relative;z-index:1;display:flex;gap:40px;align-items:center">
      <div style="display:flex;flex-direction:column;align-items:center;gap:16px">${tab(`
        <div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:26px">Recepção Central</b><span style="display:flex;align-items:center;gap:7px;font-size:12.5px;color:#2b9b58;font-weight:700"><i style="width:10px;height:10px;border-radius:50%;background:#2b9b58;display:block"></i>Impressora</span></div>
        <div style="font-size:16px;color:#5f6b76;margin-top:4px">Selecione o atendimento desejado.</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;flex:1;margin-top:18px">${b('Atendimento Geral')}${b('Preferencial')}${b('Exames')}${b('Agendamento')}</div>`)}
        <span style="font-size:20px;color:var(--ink-2);font-weight:600;display:flex;align-items:center;gap:10px">${I('tablet')} Retirada da ficha</span></div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:16px">${tab(`
        <div style="text-align:center;margin-top:6px"><b style="font-size:28px">Como foi seu atendimento?</b><div style="font-size:16px;color:#5f6b76;margin-top:6px">Toque em uma opção para avaliar</div></div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;flex:1;margin-top:24px">${e('😡', 'Ruim')}${e('😐', 'Regular')}${e('🙂', 'Bom')}${e('😁', 'Excelente')}</div>`)}
        <span style="font-size:20px;color:var(--ink-2);font-weight:600;display:flex;align-items:center;gap:10px">${I('smile')} Avaliação do atendimento</span></div>
      <span style="position:absolute;right:0;top:-46px;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#f4ce88;background:rgba(160,115,43,.2);border:1px solid rgba(244,206,136,.3);padding:3px 10px;border-radius:999px">Dados fictícios</span>
    </div>`;
  };

  /* =====================================================================
     VOTE AÍ
     ===================================================================== */
  M.voteMobile = () => {
    const cand = (n, setor, on) => `
      <div style="display:flex;align-items:center;gap:12px;padding:11px 12px;border-radius:14px;background:#fff;border:2px solid ${on ? '#0a9396' : '#e2e9ef'};${on ? 'box-shadow:0 0 0 4px rgba(10,147,150,.12)' : ''}">
        <div style="width:46px;height:46px;border-radius:50%;display:grid;place-items:center;font-weight:800;color:#fff;background:linear-gradient(135deg,#0a9396,#005f73);font-size:16px">${n}</div>
        <div style="flex:1;line-height:1.25"><b style="font-size:15px;color:#16324f">Candidato(a) ${n}</b><div style="font-size:12.5px;color:#5a7088">${setor}</div></div>
        <span style="font-size:12px;font-weight:700;padding:6px 10px;border-radius:9px;${on ? 'background:#0a9396;color:#fff' : 'background:#edf2f7;color:#415468'}">${on ? '✓ Selecionado' : 'Selecionar'}</span>
      </div>`;
    return `<div style="position:relative;z-index:1;display:flex;align-items:center;gap:70px">
      <div class="m-card" style="width:400px;padding:34px;border-radius:28px;background:linear-gradient(160deg,rgba(255,255,255,.08),rgba(255,255,255,.02)),rgba(12,30,66,.6);border:1px solid rgba(150,195,255,.22);text-align:center;display:flex;flex-direction:column;align-items:center;gap:18px;color:var(--ink)">
        <div style="font-size:15px;letter-spacing:.2em;text-transform:uppercase;color:#f5b942;font-weight:700">VotaSanta</div>
        <div style="font-size:30px;font-weight:700;line-height:1.15">Aponte a câmera do celular</div>
        ${qr().replace('class="qr"', 'class="qr" style="width:230px;height:230px;padding:16px;border-radius:20px"')}
        <div style="font-size:18px;color:var(--ink-2);line-height:1.4">O QR Code leva direto à votação. Basta informar o CPF e escolher.</div>
        <span style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#f4ce88;background:rgba(160,115,43,.2);border:1px solid rgba(244,206,136,.3);padding:3px 10px;border-radius:999px">QR Code ilustrativo</span>
      </div>
      <div class="phone"><div class="notch"></div><div class="scr" style="background:#f4f8fb;color:#16324f">
        <div style="background:linear-gradient(135deg,#005f73,#0a3d55);color:#fff;padding:54px 22px 22px">
          <div style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;opacity:.8">Votação aberta</div>
          <div style="font-size:22px;font-weight:800;margin-top:4px">Eleição Demonstração</div>
          <div style="font-size:13px;opacity:.85;margin-top:2px">Encerra em 28/11 às 17h</div>
        </div>
        <div style="padding:18px 16px;display:flex;flex-direction:column;gap:10px">
          <b style="font-size:18px">Escolha seu candidato</b>
          ${cand(1, 'Enfermagem · UTI', false)}${cand(2, 'Farmácia', true)}${cand(3, 'Manutenção', false)}${cand(4, 'Recepção', false)}
          <div style="font-size:12.5px;color:#5a7088;margin-top:4px">CPF</div>
          <div style="height:44px;border-radius:12px;border:1px solid #cbd8e3;background:#fff;display:flex;align-items:center;padding:0 14px;color:#9aabbc;font-size:15px">000.000.000-00</div>
          <div style="height:50px;border-radius:14px;background:linear-gradient(135deg,#0a9396,#005f73);color:#fff;font-weight:800;display:grid;place-items:center;font-size:17px;margin-top:4px">Confirmar voto</div>
        </div>
      </div></div>
    </div>`;
  };
  M.voteTv = () => {
    const rank = [['1', 'Candidato(a) 2', 'Farmácia', 312, 37], ['2', 'Candidato(a) 4', 'Recepção', 228, 27], ['3', 'Candidato(a) 1', 'Enfermagem · UTI', 176, 21], ['4', 'Candidato(a) 3', 'Manutenção', 126, 15]];
    return win('t-vote', 'VotaSanta — Modo TV', `
      <div style="height:100%;padding:26px 30px;display:flex;flex-direction:column;gap:16px">
        <div class="m-h"><div><div class="k">Modo TV · atualização automática</div><h3 style="font-size:32px">Eleição Demonstração — Apuração parcial</h3></div>
          <div style="display:flex;align-items:center;gap:8px;font-size:14px;color:#93e4c0"><i style="width:10px;height:10px;border-radius:50%;background:#4ade80;display:block;box-shadow:0 0 10px #4ade80"></i>Ao vivo</div></div>
        ${kpis(3, [{ i: 'vote', l: 'Total de votos', v: '842', c: '#f5b942' }, { i: 'checkcircle', l: 'Status', v: '<span style="font-size:26px">' + badge('ABERTA', 'green').replace('m-badge', 'm-badge" style="height:34px;font-size:17px;padding:0 16px') + '</span>', c: '#4ade80' }, { i: 'clock', l: 'Encerramento', v: '28/11 · 17h', c: '#8bcaff' }])}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;flex:1;min-height:0">
          <div class="m-card"><div class="ct">Votos por candidato</div>
            <div style="display:flex;align-items:flex-end;gap:22px;height:250px;padding:16px 8px 0">${rank.map(r => `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:8px;height:100%;justify-content:flex-end"><b style="font-size:16px">${r[3]}</b><i style="display:block;width:100%;height:${r[3] / 312 * 80}%;border-radius:9px 9px 3px 3px;background:linear-gradient(180deg,#f5b942,rgba(245,185,66,.35))"></i><span style="font-size:13px;color:var(--m-muted)">${r[1].replace('Candidato(a) ', 'Cand. ')}</span></div>`).join('')}</div></div>
          <div class="m-card" style="display:flex;flex-direction:column;gap:10px"><div class="ct">Parcial em destaque</div>
            ${rank.map(r => `<div style="display:flex;align-items:center;gap:14px;padding:10px 12px;border-radius:13px;background:var(--m-nest);border:1px solid ${r[0] === '1' ? 'rgba(245,185,66,.5)' : 'var(--m-line)'}">
              <b style="font-size:20px;width:30px;color:${r[0] === '1' ? '#f5b942' : 'var(--m-muted)'}">#${r[0]}</b>
              <div style="width:40px;height:40px;border-radius:50%;display:grid;place-items:center;font-weight:800;background:linear-gradient(135deg,#0a9396,#005f73);font-size:15px">${r[1].slice(-1)}</div>
              <div style="flex:1;line-height:1.2"><b style="font-size:16px">${r[1]}</b><div style="font-size:13px;color:var(--m-muted)">${r[2]}</div></div>
              <div style="text-align:right;line-height:1.15"><b style="font-size:18px">${r[3]}</b><div style="font-size:13px;color:var(--m-muted)">${r[4]}%</div></div></div>`).join('')}
          </div>
        </div>
      </div>`);
  };

  /* =====================================================================
     SIC — SISTEMA INTEGRADO DE CHAMADOS
     ===================================================================== */
  const sicSide = (on) => side(`<img src="assets/img/chip-avatar.png" style="height:44px;border-radius:50%"><div class="lt"><b>SIC</b>Santa Casa de Pelotas</div>`, [
    { t: 'Atendimento', i: [['home', 'Portal Principal', on === 0], ['plus', 'Novo Chamado'], ['ticket', 'Meus Chamados', on === 1]] },
    { t: 'Painel técnico de TI', i: [['inbox', 'Fila de Chamados', on === 2], ['headset', 'Meus Atendimentos'], ['chart', 'Produtividade & SLAs'], ['book', 'Base de Conhecimento']] }
  ], 'Suporte Interno TI');
  const sicTop = `<div class="m-top"><b>SIC</b><span>— Sistema Integrado de Chamados</span><div class="sp"></div><span class="m-iconbtn">${I('bell')}</span>${user('CD', 'Colaborador Demonstração', 'Colaborador')}</div>`;
  M.sicPortal = () => {
    const cat = (ic, c, t, d) => `<div class="m-card" style="padding:14px 16px;display:flex;flex-direction:column;gap:8px">
      <div style="display:flex;gap:12px;align-items:center"><div style="width:42px;height:42px;border-radius:12px;display:grid;place-items:center;font-size:21px;color:${c};background:${c}22;border:1px solid ${c}44">${I(ic)}</div><div style="line-height:1.2"><b style="font-size:16.5px">${t}</b><div style="font-size:13px;color:var(--m-muted)">${d}</div></div></div>
      <span class="m-btn sm" style="width:max-content;color:${c}">Abrir chamado ${I('right')}</span></div>`;
    return win('t-sic', 'SIC — Portal Principal', `
      <div class="m-app">${sicSide(0)}
        <div class="m-main">${sicTop}
          <div class="m-content" style="gap:14px">
            <div class="m-card" style="display:flex;align-items:center;gap:18px;padding:14px 20px;background:linear-gradient(110deg,rgba(37,99,235,.35),rgba(6,182,212,.12)),var(--m-panel)">
              <img src="assets/img/chip-avatar.png" style="height:62px;border-radius:50%">
              <div><b style="font-size:23px">Bem-vindo ao SIC, Colaborador!</b><div style="font-size:15px;color:var(--m-muted);margin-top:2px">Como a equipe de T.I. pode ajudar hoje?</div></div>
              <div style="margin-left:auto"><span class="m-btn p">${I('plus')} Novo Chamado</span></div>
            </div>
            <div class="ct" style="font-size:16px;font-weight:700">Categorias de Atendimento Rápido</div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
              ${cat('layers', '#38bdf8', 'Software', 'Sistemas, travamentos e erros')}
              ${cat('printer', '#60a5fa', 'Hardware e Rede', 'Computador, impressora, rede')}
              ${cat('usercheck', '#a78bfa', 'Solicitar Login', 'Acesso a sistemas')}
              ${cat('filetext', '#34d399', 'Relatório', 'Novos relatórios e ajustes')}
              ${cat('download', '#fbbf24', 'Novo Software', 'Instalação de programas')}
              ${cat('settings', '#f472b6', 'Manutenção', 'Equipamentos e infraestrutura')}
            </div>
            <div class="m-card" style="padding:10px 12px"><div class="ct" style="padding:4px 4px 8px">Meus Chamados Recentes <small>Ver todos</small></div>
              ${table(['Protocolo', 'Categoria', 'Resumo', 'Status', 'Data'], [
                ['<span class="mono">#000245</span>', 'Hardware e Rede', 'Impressora do posto não imprime', badge('Em Atendimento', 'cyan'), '16/11'],
                ['<span class="mono">#000231</span>', 'Solicitar Login', 'Acesso ao sistema de prescrição', badge('Concluído', 'neutral'), '12/11']
              ])}</div>
          </div>
        </div>
      </div>`);
  };
  M.sicChat = () => win('t-sic', 'SIC — Acompanhamento do chamado', `
    <div class="m-app">${sicSide(1)}
      <div class="m-main">${sicTop}
        <div class="m-content">
          <div class="m-h"><div><div class="k">Chamado <span style="font-family:Consolas,monospace">#000245</span></div><h3 style="font-size:26px">Impressora do posto não imprime</h3></div>${badge('Em Atendimento', 'cyan')}</div>
          <div style="display:grid;grid-template-columns:1.5fr 1fr;gap:14px;flex:1;min-height:0">
            <div class="m-card" style="display:flex;flex-direction:column;gap:12px">
              <div class="ct">Conversa com a T.I. <small>em tempo real</small></div>
              <div class="chat" style="flex:1">
                <div class="bubble me"><small>Você · 08:12</small>A impressora do posto de enfermagem não está imprimindo as etiquetas.</div>
                <div class="bubble them"><small>Técnico de T.I. · 08:20</small>Bom dia! Assumi seu chamado. Pode confirmar se aparece alguma luz piscando no equipamento?</div>
                <div class="bubble me"><small>Você · 08:22</small>Sim, a luz laranja está piscando.</div>
                <div class="bubble them"><small>Técnico de T.I. · 08:31</small>Já estou a caminho do setor para verificar. 👍</div>
              </div>
              <div class="m-field"><div class="in ph">Escreva uma mensagem…<span style="margin-left:auto;color:var(--m-acc)">${I('send')}</span></div></div>
            </div>
            <div style="display:flex;flex-direction:column;gap:14px">
              <div class="m-card" style="display:grid;gap:9px;font-size:14.5px">
                <div class="m-row"><span class="m-grow m-dim">Categoria</span><b>Hardware e Rede</b></div>
                <div class="m-row"><span class="m-grow m-dim">Setor</span><b>Internação 3º andar</b></div>
                <div class="m-row"><span class="m-grow m-dim">Prioridade</span>${badge('Alta', 'orange')}</div>
                <div class="m-row"><span class="m-grow m-dim">Responsável</span><b>Técnico de T.I.</b></div>
                <div class="m-row"><span class="m-grow m-dim">Aberto há</span><b>32 min</b></div>
              </div>
              <div class="m-card" style="display:flex;flex-direction:column;gap:10px;align-items:flex-start;background:linear-gradient(140deg,rgba(37,99,235,.28),rgba(6,182,212,.1)),var(--m-panel)">
                <b style="font-size:16px">Problema resolvido?</b>
                <span style="font-size:14px;color:var(--m-muted)">Ao final, confirme a conclusão e avalie o atendimento.</span>
                <div class="m-stars">★★★★★</div>
                <span class="m-btn p">${I('check')} Confirmar Conclusão &amp; Avaliar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`);
  M.sicQueue = () => win('t-sic', 'SIC — Fila Geral de Chamados', `
    <div class="m-app">${sicSide(2)}
      <div class="m-main"><div class="m-top"><b>SIC</b><span>— Sistema Integrado de Chamados</span><div class="sp"></div>${user('TT', 'Técnico de T.I.', 'Técnico')}</div>
        <div class="m-content" style="gap:14px">
          <div class="m-h"><div><div class="k">Central de Atendimento TI</div><h3>Fila Geral de Chamados</h3></div><div class="btns"><span class="m-btn">${I('refresh')} Atualizar</span><span class="m-btn p">Meus Atendimentos</span></div></div>
          ${kpis(5, [{ l: 'Aguardando TI', v: '9', c: '#60a5fa' }, { l: 'Em Atendimento', v: '14', c: '#22d3ee' }, { l: 'Aguardando Usuário', v: '4', c: '#fbbf24' }, { l: 'Alta Prioridade', v: '3', c: '#fb923c' }, { l: 'Resolvidos Hoje', v: '27', c: '#34d399' }])}
          <div class="m-tabs"><span class="on">Todos os Chamados</span><span>Aguardando Atendimento</span><span>Em Atendimento</span><span>Aguardando Usuário</span><span>Resolvidos</span></div>
          <div class="m-card" style="padding:8px 10px">
            ${table(['Protocolo', 'Chamado & Categoria', 'Setor', 'Prioridade', 'Status', 'Aberto', 'Ações'], [
              ['<span class="mono">#000251</span>', '<b>Sistema lento na recepção</b><span class="sub">Software</span>', 'Recepção', badge('Urgente', 'red'), badge('Aberto', 'blue'), '6 min', '<span class="m-btn sm p">Assumir</span>'],
              ['<span class="mono">#000249</span>', '<b>Acesso ao prontuário</b><span class="sub">Solicitar Login</span>', 'Centro Cirúrgico', badge('Alta', 'orange'), badge('Em Triagem', 'violet'), '18 min', '<span class="m-btn sm p">Assumir</span>'],
              ['<span class="mono">#000245</span>', '<b>Impressora não imprime</b><span class="sub">Hardware e Rede</span>', 'Internação', badge('Alta', 'orange'), badge('Em Atendimento', 'cyan'), '32 min', '<span class="m-dim" style="font-size:13.5px">Técnico de T.I.</span>'],
              ['<span class="mono">#000240</span>', '<b>Novo relatório de altas</b><span class="sub">Relatório</span>', 'Faturamento', badge('Média', 'blue'), badge('Aguardando Você', 'amber'), '1 d', '<span class="m-dim" style="font-size:13.5px">Técnico de T.I.</span>']
            ])}
          </div>
        </div>
      </div>
    </div>`);

  /* =====================================================================
     SIO — SISTEMA INTEGRADO DE OUVIDORIA
     ===================================================================== */
  const sioSide = (on) => side(`<img src="${LOGO}" style="height:40px">`, [{ t: 'Ambiente institucional', i: [['grid', 'Painel indicador', on === 0], ['clipboard', 'Manifestações', on === 1], ['chart', 'Relatórios'], ['settings', 'Cadastros'], ['shieldcheck', 'Perfis'], ['filetext', 'Auditoria']] }],
    `${I('lock')} Acesso protegido<br>Informações de uso interno`);
  const sioTop = `<div class="m-top"><span class="m-iconbtn" style="color:var(--m-acc)">${I('message')}</span><b>SIO</b><span>Sistema Integrado de Ouvidoria</span><div class="sp"></div><span class="m-iconbtn">${I('bell')}</span>${user('O', 'Ouvidoria Demonstração', 'Ouvidoria')}</div>`;
  M.sioCases = () => win('t-sio', 'SIO — Manifestações', `
    <div class="m-app">${sioSide(1)}
      <div class="m-main">${sioTop}
        <div class="m-content">
          <div class="m-h"><div><div class="k">Atendimento</div><h3>Manifestações</h3><p>Registre, encaminhe e acompanhe cada atendimento.</p></div><span class="m-btn p">${I('plus')} Nova manifestação</span></div>
          <div class="m-card" style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
            <div class="m-field">Tipo<div class="in">Todos</div></div><div class="m-field">Status<div class="in">Em andamento</div></div>
            <div class="m-field">Área<div class="in">Todas as áreas</div></div><div class="m-field">Período<div class="in">${I('calendar')} Novembro / 2026</div></div>
          </div>
          <div class="m-card" style="padding:8px 10px">
            <div class="ct" style="padding:6px 4px 8px">Registros autorizados <small>Ordenar por vencimento ↑</small></div>
            ${table(['Registro', 'Data', 'Tipo', 'Área / motivo', 'Vencimento', 'Status'], [
              { cls: 'late', c: ['<span class="mono">OUV-000318</span>', '07/11', 'Reclamação', 'Recepção<span class="sub">Tempo de espera</span>', '<b style="color:#ff8a9a">14/11</b>', badge('Em atraso · com gestor', 'red')] },
              ['<span class="mono">OUV-000321</span>', '10/11', 'Sugestão', 'Hotelaria<span class="sub">Acomodações</span>', '17/11', badge('Com gerente · 24h', 'amber')],
              ['<span class="mono">OUV-000325</span>', '12/11', 'Elogio', 'Enfermagem<span class="sub">Atendimento</span>', '19/11', badge('Em validação', 'violet')],
              ['<span class="mono">OUV-000327</span>', '13/11', 'Informação', 'Faturamento<span class="sub">Contas</span>', '21/11', badge('Em andamento', 'blue')],
            ])}
          </div>
        </div>
      </div>
    </div>`);
  M.sioDash = () => win('t-sio', 'SIO — Painel indicador', `
    <div class="m-app">${sioSide(0)}
      <div class="m-main">${sioTop}
        <div class="m-content" style="gap:14px">
          <div class="m-h"><div><div class="k">Painel institucional</div><h3>Painel indicador</h3></div><div class="btns"><span class="m-btn">${I('refresh')} Atualizar</span><span class="m-btn">Exportar PDF</span><span class="m-btn">Exportar Excel</span></div></div>
          ${kpis(3, [{ l: 'Total de ouvidorias', v: '326', c: '#8fc2ff' }, { l: 'Abertas', v: '41', c: '#a3d7ff' }, { l: 'Com gestor no prazo', v: '33', c: '#93e4c0' },
            { l: 'Em atraso · com gestor', v: '5', c: '#ff8a9a' }, { l: 'Gerente em atraso', v: '1', c: '#ff5c74' }, { l: 'Não responderam no prazo', v: '2', c: '#f4ce88' }])}
          <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:14px;flex:1;min-height:0">
            <div class="m-card"><div class="ct">Por tipo de manifestação</div>
              <div style="margin-top:12px">${bars([['Elogio', 118], ['Reclamação', 97], ['Sugestão', 54], ['Solicitação de informação', 41], ['Denúncia', 16]], 118)}</div></div>
            <div class="m-card" style="display:flex;flex-direction:column;gap:9px"><div class="ct">Vencem nas próximas 24h ${badge('3', 'amber')}</div>
              ${[['OUV-000321', 'Hotelaria', 'Gerente'], ['OUV-000319', 'Laboratório', 'Gestor'], ['OUV-000316', 'Emergência', 'Gestor']].map(([n, a, w]) => `<div style="display:flex;align-items:center;gap:12px;padding:9px 12px;border-radius:12px;background:var(--m-nest);border:1px solid var(--m-line);font-size:14.5px"><span style="font-family:Consolas,monospace;color:var(--m-acc)">${n}</span><span class="m-grow">${a}</span><span class="m-dim">${w}</span>${I('clock')}</div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>`);
  M.sioDetail = () => win('t-sio', 'SIO — Detalhe da manifestação', `
    <div class="m-app">${sioSide(1)}
      <div class="m-main">${sioTop}
        <div class="m-content">
          <div class="m-h"><div><div class="k">Manifestação <span style="font-family:Consolas,monospace">OUV-000325</span></div><h3 style="font-size:26px">Elogio · Enfermagem</h3></div><div class="btns">${badge('Em validação', 'violet')}<span class="m-btn">Voltar à lista</span><span class="m-btn p">${I('send')} Responder</span></div></div>
          <div class="m-card" style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px 18px;font-size:14px">
            ${[['Data da manifestação', '12/11/2026'], ['Cadastro efetivo', '12/11/2026'], ['Motivo', 'Atendimento'], ['Local', 'Internação 2º andar'], ['Envio ao gestor', '12/11 · 10:40'], ['Resposta do gestor', '13/11 · 15:02'], ['Escalonada ao gerente', 'Não'], ['Prazo', '19/11/2026']].map(([l, v]) => `<div><div class="m-dim" style="font-size:12.5px">${l}</div><b style="font-size:15px">${v}</b></div>`).join('')}
          </div>
          <div style="display:grid;grid-template-columns:1.3fr 1fr;gap:14px;flex:1;min-height:0">
            <div class="m-card" style="display:flex;flex-direction:column;gap:10px">
              <div class="ct">Relato recebido</div>
              <p style="font-size:15px;line-height:1.5;color:var(--m-text);opacity:.92">Relato de demonstração: agradecimento à equipe de enfermagem pela atenção e cuidado durante a internação.</p>
              <div class="ct" style="margin-top:6px">Resposta do gestor</div>
              <p style="font-size:15px;line-height:1.5;color:var(--m-muted)">Resposta de demonstração: elogio compartilhado com a equipe em reunião de setor.</p>
            </div>
            <div class="m-card"><div class="ct" style="margin-bottom:12px">Encaminhamentos</div>
              <div class="timeline">
                <div class="tl ok"><i>✓</i><div><b>Registrada pela Ouvidoria</b><span>Canal: presencial</span></div><em>12/11</em></div>
                <div class="tl ok"><i>✓</i><div><b>Encaminhada ao gestor</b><span>Prazo iniciado</span></div><em>12/11</em></div>
                <div class="tl ok"><i>✓</i><div><b>Gestor respondeu</b><span>Dentro do prazo</span></div><em>13/11</em></div>
                <div class="tl now"><i>●</i><div><b>Validação da Ouvidoria</b><span>Aprovar ou pedir complemento</span></div><em>agora</em></div>
                <div class="tl"><i>○</i><div><b>Resposta final ao manifestante</b><span>Conclusão</span></div><em></em></div>
              </div></div>
          </div>
        </div>
      </div>
    </div>`);

  /* =====================================================================
     AVALIAÇÃO DE DESEMPENHO (em desenvolvimento)
     ===================================================================== */
  const avSide = (on) => side(`<div class="lt" style="font-size:12px;letter-spacing:.12em"><b style="font-size:14px;letter-spacing:.12em">SANTA CASA</b>DE PELOTAS<div style="letter-spacing:0;font-size:15px;color:#e6bc7f;margin-top:6px;font-weight:700">Avaliação &amp; Desenvolvimento</div></div>`,
    [{ i: [['clipboard', 'Avaliações', on === 0], ['grid', 'Visão geral'], ['users', 'Funcionários'], ['usercheck', 'Usuários'], ['building', 'Núcleos'], ['layers', 'Setores'], ['award', 'Cargos'], ['flow', 'Hierarquia'], ['upload', 'Importação'], ['filetext', 'Auditoria']] }],
    'Gestão de Pessoas · Desenvolvimento');
  const avTop = `<div class="m-top"><span>☰</span><b>Desenvolvimento de colaboradores</b><div class="sp"></div>${user('GD', 'Gestor Demonstração', 'Gestor imediato')}<span class="m-btn sm">Senha</span><span class="m-btn sm">Sair</span></div>`;
  M.avList = () => win('t-aval', 'Avaliação de Desempenho — Avaliações', `
    <div class="m-app">${avSide(0)}
      <div class="m-main">${avTop}
        <div class="m-content">
          <div class="m-tabs"><span class="on">Minhas avaliações</span><span>Ciclos e resultados</span><span>Competências</span><span>Perguntas</span><span>Questionários por cargo</span></div>
          <div class="m-h"><div><div class="k">Ciclo 2027</div><h3>Minhas avaliações</h3><p>Autoavaliação e avaliações da sua equipe neste ciclo.</p></div></div>
          ${kpis(3, [{ l: 'Pendentes', v: '4', c: '#f4ce88' }, { l: 'Concluídas', v: '7', c: '#93e4c0' }, { l: 'Prazo do ciclo', v: '30/04', c: '#82b8e0' }])}
          <div class="m-card" style="padding:8px 10px">
            ${table(['Ciclo', 'Colaborador', 'Tipo', 'Prazo', 'Situação', 'Ações'], [
              ['Ciclo 2027', 'Gestor Demonstração', 'Autoavaliação', '30/04', badge('Pendente', 'amber'), '<span class="m-btn sm p">Abrir avaliação</span>'],
              ['Ciclo 2027', 'Colaborador 01', 'Avaliação do gestor', '30/04', badge('Pendente', 'amber'), '<span class="m-btn sm p">Abrir avaliação</span>'],
              ['Ciclo 2027', 'Colaborador 02', 'Avaliação do gestor', '30/04', badge('Concluída', 'green'), '<span class="m-btn sm">Consultar respostas</span>'],
              ['Ciclo 2027', 'Colaborador 03', 'Avaliação do gestor', '30/04', badge('Concluída', 'green'), '<span class="m-btn sm">Consultar respostas</span>']
            ])}
          </div>
        </div>
      </div>
    </div>`);
  M.avResult = () => {
    const labels = ['Comunicação', 'Trabalho em equipe', 'Responsabilidade', 'Foco no paciente', 'Iniciativa', 'Organização'];
    const g = [4.2, 4.5, 4.0, 4.6, 3.4, 4.1], a = [4.6, 4.4, 4.5, 4.8, 4.4, 3.9];
    const cx = 190, cy = 175, R = 130;
    const pt = (i, v) => { const ang = -Math.PI / 2 + i * 2 * Math.PI / 6; return [cx + Math.cos(ang) * R * v / 5, cy + Math.sin(ang) * R * v / 5]; };
    const poly = (vals) => vals.map((v, i) => pt(i, v).map(n => n.toFixed(1)).join(',')).join(' ');
    let grid = '';
    [1, 2, 3, 4, 5].forEach(l => grid += `<polygon points="${poly(Array(6).fill(l))}" fill="none" stroke="rgba(185,202,220,.18)"/>`);
    labels.forEach((t, i) => { const [x, y] = pt(i, 5); const [lx, ly] = pt(i, 6.05); grid += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="rgba(185,202,220,.14)"/><text x="${lx}" y="${ly + 4}" text-anchor="${Math.abs(lx - cx) < 5 ? 'middle' : lx > cx ? 'start' : 'end'}">${t}</text>`; });
    const svg = `<svg class="radar" viewBox="-95 -12 570 374" style="width:100%;height:100%">${grid}
      <polygon points="${poly(a)}" fill="rgba(230,188,127,.18)" stroke="#e6bc7f" stroke-width="2.5"/>
      <polygon points="${poly(g)}" fill="rgba(130,184,224,.22)" stroke="#82b8e0" stroke-width="2.5"/></svg>`;
    return win('t-aval', 'Avaliação de Desempenho — Resultado consolidado', `
      <div class="m-app">${avSide(0)}
        <div class="m-main">${avTop}
          <div class="m-content" style="gap:14px">
            <div class="m-h"><div><div class="k">Avaliação de desempenho</div><h3>Resultado consolidado · Colaborador 02</h3></div></div>
            ${kpis(3, [{ l: 'Nota final dos gestores', v: '4,13 <small>de 5,00</small>', c: '#82b8e0' }, { l: 'Limite de divergência', v: '0,80', c: '#e6bc7f' }, { l: 'Resultado ao colaborador', v: '<span style="font-size:24px">Liberado pelo RH</span>', c: '#93e4c0' }])}
            <div style="display:grid;grid-template-columns:1fr 1.05fr;gap:14px;flex:1;min-height:0">
              <div class="m-card" style="display:flex;flex-direction:column"><div class="ct">Mapa comparativo de competências</div>
                <div style="flex:1;min-height:0">${svg}</div>
                <div style="display:flex;gap:18px;font-size:13.5px;color:var(--m-muted)"><span><i style="display:inline-block;width:12px;height:12px;border-radius:3px;background:#82b8e0;margin-right:6px"></i>Gestores</span><span><i style="display:inline-block;width:12px;height:12px;border-radius:3px;background:#e6bc7f;margin-right:6px"></i>Autoavaliação</span></div></div>
              <div class="m-card" style="padding:8px 10px">
                ${table(['Competência', 'Auto', 'Gestores', 'Percepção'], labels.map((l, i) => {
                  const d = a[i] - g[i];
                  return [l, a[i].toFixed(1).replace('.', ','), `<b>${g[i].toFixed(1).replace('.', ',')}</b>`, Math.abs(d) >= .8 ? `<span style="color:#edc789;font-weight:700">Diferença relevante</span>` : '<span class="m-dim">Alinhada</span>'];
                }))}
              </div>
            </div>
          </div>
        </div>
      </div>`);
  };

  /* =====================================================================
     GERP — GESTÃO DE RISCOS PSICOSSOCIAIS (em desenvolvimento)
     ===================================================================== */
  M.gerpForm = () => win('t-green', 'GERP — Portal do Colaborador', `
    <div style="height:100%;display:grid;place-items:center;padding:30px">
      <div class="m-card" style="width:900px;padding:30px 36px;display:flex;flex-direction:column;gap:18px;border-radius:24px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span class="m-badge b-green" style="height:30px;font-size:13px;letter-spacing:.12em">AVALIAÇÃO DO COLABORADOR</span>
          <span style="font-size:15px;color:var(--m-muted)">Questão 7 de 30</span></div>
        <div class="m-progress"><i style="width:23%"></i></div>
        <div style="font-size:14px;letter-spacing:.14em;text-transform:uppercase;color:var(--m-acc);font-weight:700;margin-top:8px">Demandas e carga de trabalho</div>
        <div style="font-size:30px;font-weight:700;line-height:1.3">Consigo realizar minhas tarefas dentro da minha jornada de trabalho.</div>
        <div class="likert" style="margin-top:6px">
          <div><b>1</b>Discordo totalmente</div><div><b>2</b>&nbsp;</div><div><b>3</b>&nbsp;</div><div class="on"><b>4</b>&nbsp;</div><div><b>5</b>Concordo totalmente</div>
        </div>
        <div style="display:flex;align-items:center;gap:12px;margin-top:8px">
          <span style="display:flex;align-items:center;gap:8px;font-size:14px;color:var(--m-muted)">${I('lock')} Respostas anônimas · resultados exibidos somente por grupo</span>
          <div style="margin-left:auto;display:flex;gap:10px"><span class="m-btn">Anterior</span><span class="m-btn p">Próxima ${I('right')}</span></div>
        </div>
      </div>
    </div>`);
  M.gerpDash = () => {
    const risk = (t) => t === 'a' ? badge('Alto Risco', 'red') : t === 'm' ? badge('Risco Moderado', 'amber') : badge('Favorável (Baixo Risco)', 'green');
    const fav = (v, c) => `<div style="display:flex;align-items:center;gap:10px;width:200px"><div class="m-progress" style="flex:1"><i style="width:${v}%;background:${c}"></i></div><b style="font-size:14px">${v}%</b></div>`;
    return win('t-green', 'GERP — Dashboard de Riscos Psicossociais', `
      <div class="m-app">${side(`<img src="${LOGO}" style="height:32px"><div class="lt"><b>GERP</b></div>`, [{ t: 'Administração', i: [['grid', 'Visão geral', true], ['alert', 'Inventário de Riscos'], ['calendar', 'Campanhas'], ['clipboard', 'Questionários'], ['users', 'Colaboradores e RH'], ['usercheck', 'Usuários'], ['filetext', 'Auditoria']] }], 'Gestão Integrada<br>Riscos psicossociais · NR-01')}
        <div class="m-main"><div class="m-top"><span style="color:var(--m-acc)">${I('shield')}</span><b>GERP</b><span>Gestão de Riscos e PGR (NR - 01)</span><div class="sp"></div>${user('A', 'Administrador Demonstração', 'SESMT')}</div>
          <div class="m-content" style="gap:14px">
            <div class="m-h"><div><div class="k">Monitoramento estratégico</div><h3>Dashboard de Riscos Psicossociais</h3></div><div class="btns"><span class="m-btn p">${I('plus')} Novo Plano de Ação</span><span class="m-btn">${I('refresh')} Atualizar</span></div></div>
            ${kpis(4, [{ l: 'Colaboradores Elegíveis', v: '1.240' }, { l: 'Participações Concluídas', v: '868' }, { l: 'Taxa de Participação', v: '70%', f: '<div class="m-progress" style="margin-top:6px"><i style="width:70%"></i></div>' }, { l: 'Campanhas Abertas', v: '1' }])}
            <div class="m-card" style="padding:8px 10px"><div class="ct" style="padding:6px 4px 8px">Resultados Agregados por Dimensão <small>Amostra suficiente (≥ 5)</small></div>
              ${table(['Dimensão de fator psicossocial', 'Escore médio', 'Nível de risco', 'Percepção favorável'], [
                ['Demandas e carga de trabalho', '<b>2,6</b>', risk('a'), fav(38, '#e8695c')],
                ['Controle e autonomia no trabalho', '<b>3,3</b>', risk('m'), fav(55, '#e6a74e')],
                ['Suporte da liderança e dos colegas', '<b>3,9</b>', risk('f'), fav(74, '#2fae76')],
                ['Relacionamentos, respeito e segurança psicossocial', '<b>4,1</b>', risk('f'), fav(79, '#2fae76')],
                ['Papel, organização e mudanças', '<b>3,4</b>', risk('m'), fav(58, '#e6a74e')]
              ])}</div>
          </div>
        </div>
      </div>`);
  };

  /* =====================================================================
     SESMT / CIPA (em desenvolvimento)
     ===================================================================== */
  const cipaSide = (env, on) => side(`<img src="${LOGO}" style="height:32px"><div class="lt"><b>SESMT SCMP</b>Segurança &amp; Medicina</div>`, [
    ...(env === 'cipa'
      ? [{ t: 'Gestão CIPA', i: [['grid', 'Painel da CIPA', true], ['users', 'Composição'], ['calendar', 'Reuniões e Atas'], ['message', 'Sugestões'], ['listcheck', 'Planos de Ação'], ['sparkle', 'SIPAT'], ['award', 'Certificados']] }]
      : [{ t: 'SESMT Principal', i: [['grid', 'Painel Integrado', on === 0], ['alert', 'Ocorrências & Acidentes', on === 1], ['filetext', 'Módulo CAT (eSocial)']] },
         { t: 'Saúde Ocupacional', i: [['users', 'Colaboradores'], ['medkit', 'Atestados Médicos'], ['calendar', 'Afastamentos & Retorno'], ['stethoscope', 'Exames & Vencimentos']] }])
  ]);
  const cipaToggle = (env) => `<div class="m-tabs" style="margin:-4px 0 0"><span class="${env === 'sesmt' ? 'on' : ''}">${I('medkit')}&nbsp; SESMT</span><span class="${env === 'cipa' ? 'on' : ''}">${I('shield')}&nbsp; CIPA</span></div>`;
  const cipaTop = (env) => `<div class="m-top">${cipaToggle(env)}<span style="margin-left:6px">SESMT — Saúde Ocupacional, Segurança do Trabalho e CIPA</span><div class="sp"></div>${user('TS', 'Técnico Demonstração', 'Técnico de Segurança')}</div>`;
  M.cipaPanel = () => win('t-green', 'SESMT/CIPA — Painel Geral Integrado', `
    <div class="m-app">${cipaSide('sesmt', 0)}
      <div class="m-main">${cipaTop('sesmt')}
        <div class="m-content" style="gap:14px">
          <div class="m-h"><div><div class="k">SESMT</div><h3>Painel Geral Integrado</h3></div><div class="btns"><span class="m-btn danger">${I('alert')} Registrar ocorrência</span><span class="m-btn">${I('refresh')} Atualizar Dados</span></div></div>
          ${kpis(3, [{ i: 'users', l: 'Colaboradores', v: '1.240', c: '#7fe6b5' }, { i: 'stethoscope', l: 'Exames Periódicos', v: '86', f: 'vencendo em 30 dias', c: '#60a5fa' }, { i: 'calendar', l: 'Afastamentos Ativos', v: '23', c: '#fbbf24' },
            { i: 'medkit', l: 'Atestados Médicos', v: '142', f: 'no mês', c: '#a78bfa' }, { i: 'alert', l: 'Ocorrências SST', v: '9', f: 'no mês', c: '#f87171' }, { i: 'filetext', l: 'CATs em Aberto', v: '2', c: '#fb923c' }])}
          <div class="m-card" style="flex:1"><div class="ct">Ocorrências e Medidas Preventivas por Setor Hospitalar <small>Últimos 6 meses</small></div>
            ${cols([['Emergência', 18], ['UTI Adulto', 14], ['Centro Cirúrgico', 11], ['Internação', 16], ['Higienização', 9], ['Nutrição', 6], ['Laboratório', 7], ['Manutenção', 10]], 18, 150)}</div>
        </div>
      </div>
    </div>`);
  M.cipaIncidents = () => win('t-green', 'SESMT/CIPA — Ocorrências & Acidentes', `
    <div class="m-app">${cipaSide('sesmt', 1)}
      <div class="m-main">${cipaTop('sesmt')}
        <div class="m-content">
          <div class="m-h"><div><div class="k">SESMT</div><h3>Gestão de Ocorrências, Incidentes &amp; Acidentes</h3></div><span class="m-btn danger">${I('plus')} Registrar ocorrência</span></div>
          <div class="m-card" style="display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:12px">
            <div class="m-field">Buscar<div class="in ph">${I('search')} Código, setor ou tipo…</div></div><div class="m-field">Tipo de evento<div class="in">Todos</div></div><div class="m-field">Situação<div class="in">Todas</div></div></div>
          <div class="m-card" style="padding:8px 10px">
            ${table(['Código', 'Data / Hora', 'Setor hospitalar', 'Tipo de evento', 'CAT', 'Situação'], [
              ['<span class="mono">OC-2026-041</span>', '15/11 · 22:10', 'Emergência', 'Perfurocortante', badge('Emitida', 'green'), badge('EM INVESTIGAÇÃO', 'amber')],
              ['<span class="mono">OC-2026-040</span>', '13/11 · 07:45', 'Centro Cirúrgico', 'Material Biológico', badge('Prazo: 1 dia', 'amber'), badge('REGISTRADO', 'red')],
              ['<span class="mono">OC-2026-038</span>', '09/11 · 14:20', 'Higienização', 'Queda no mesmo nível', '<span class="m-dim">—</span>', badge('PLANO DE AÇÃO CRIADO', 'amber')],
              ['<span class="mono">OC-2026-035</span>', '02/11 · 10:05', 'Nutrição', 'Queimadura', badge('Emitida', 'green'), badge('CONCLUÍDO', 'green')],
              ['<span class="mono">OC-2026-031</span>', '27/10 · 16:40', 'Manutenção', 'Esforço físico', '<span class="m-dim">—</span>', badge('CONCLUÍDO', 'green')]
            ])}</div>
        </div>
      </div>
    </div>`);
  M.cipaCipa = () => win('t-green', 'SESMT/CIPA — Painel da Gestão CIPA', `
    <div class="m-app">${cipaSide('cipa')}
      <div class="m-main">${cipaTop('cipa')}
        <div class="m-content" style="gap:14px">
          <div class="m-h"><div><div class="k">CIPA · NR-05 ${badge('Mandato vigente', 'green')}</div><h3>Painel da Gestão CIPA</h3></div><div class="btns"><span class="m-btn">${I('refresh')} Atualizar</span><span class="m-btn p">${I('plus')} Nova sugestão</span></div></div>
          ${kpis(4, [{ i: 'calendar', l: 'Próxima Reunião', v: '<span style="font-size:26px">02/12 · 14h</span>' }, { i: 'message', l: 'Sugestões Recebidas', v: '37' }, { i: 'listcheck', l: 'Planos de Ação', v: '12' }, { i: 'sparkle', l: 'Semana SIPAT', v: '<span style="font-size:26px">Março</span>' }])}
          <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:14px;flex:1;min-height:0">
            <div class="m-card"><div class="ct">Sugestões e Demandas por Setor</div><div style="margin-top:12px">${bars([['Emergência', 9], ['Internação', 7], ['Centro Cirúrgico', 6], ['Higienização', 5], ['Administrativo', 4]], 9)}</div></div>
            <div class="m-card" style="display:flex;gap:16px;align-items:center">
              ${qr().replace('class="qr"', 'class="qr" style="width:120px;height:120px;flex:none"')}
              <div><b style="font-size:17px">Certificados NR-5</b><div style="font-size:14px;color:var(--m-muted);margin-top:6px;line-height:1.45">Gerados em PDF, com verificação de autenticidade por QR Code.</div>${badge('Ilustrativo', 'amber')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>`);

  /* =====================================================================
     GESTÃO DA QUALIDADE E CAPACITAÇÕES (conceito)
     ===================================================================== */
  const qSide = (on) => side(`<div class="badge-sq">NQ</div><div class="lt"><b>Capacitações</b>Núcleo da Qualidade</div>`, [{
    i: [['grid', 'Painel', on === 0], ['cap', 'Cursos e treinamentos'], ['calendar', 'Programação'], ['listcheck', 'Listas de presença', on === 1], ['building', 'Participação por setor'], ['alert', 'Pendências'], ['chart', 'Relatórios'], ['history', 'Histórico']]
  }], 'Proposta · Previsão 2027');
  const qTop = `<div class="m-top"><b>Gestão da Qualidade e Capacitações</b><div class="sp"></div>${user('NQ', 'Núcleo da Qualidade', 'Demonstração')}</div>`;
  M.qualDash = () => win('t-qual', 'Gestão da Qualidade e Capacitações — Painel', `
    <div class="m-app">${qSide(0)}
      <div class="m-main">${qTop}
        <div class="m-content" style="gap:14px">
          <div class="m-h"><div><div class="k">Indicadores de capacitação</div><h3>Painel de capacitações</h3></div><div class="btns"><span class="m-btn">${I('filetext')} Relatórios</span><span class="m-btn p">${I('plus')} Novo treinamento</span></div></div>
          ${kpis(4, [{ i: 'calendar', l: 'Cursos programados', v: '24', c: '#b4b1ff' }, { i: 'checkcircle', l: 'Cursos realizados', v: '58', c: '#93e4c0' }, { i: 'trending', l: 'Adesão média', v: '82%', c: '#8bcaff' }, { i: 'alert', l: 'Colaboradores com pendências', v: '137', c: '#f4ce88' }])}
          <div style="display:grid;grid-template-columns:1.15fr 1fr;gap:14px;flex:1;min-height:0">
            <div class="m-card"><div class="ct">Adesão por setor</div><div style="margin-top:12px">${bars([['UTI Adulto', 94, '%'], ['Centro Cirúrgico', 88, '%'], ['Emergência', 79, '%'], ['Internação', 74, '%'], ['Higienização', 66, '%'], ['Administrativo', 58, '%']], 100)}</div></div>
            <div class="m-card" style="display:flex;flex-direction:column;gap:9px"><div class="ct">Próximos treinamentos</div>
              ${[['03/12', 'Higienização das mãos', 'Todos os setores'], ['05/12', 'Prevenção de quedas', 'Enfermagem'], ['10/12', 'Brigada de incêndio', 'Turma 2'], ['12/12', 'Segurança do paciente', 'Internação']].map(([d, t, s]) => `<div style="display:flex;align-items:center;gap:12px;padding:9px 12px;border-radius:12px;background:var(--m-nest);border:1px solid var(--m-line)"><b style="width:48px;color:var(--m-acc)">${d}</b><div style="flex:1;line-height:1.2"><b style="font-size:15px">${t}</b><div style="font-size:12.5px;color:var(--m-muted)">${s}</div></div>${I('right')}</div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>`, true);
  M.qualPresence = () => win('t-qual', 'Gestão da Qualidade e Capacitações — Lista de presença', `
    <div class="m-app">${qSide(1)}
      <div class="m-main">${qTop}
        <div class="m-content" style="gap:14px">
          <div class="m-h"><div><div class="k">Lista de presença</div><h3>Higienização das mãos · Turma 03</h3><p>03/12 · 14h · Auditório · Instrutor: Núcleo da Qualidade</p></div><div class="btns"><span class="m-btn">${I('printer')} Exportar</span><span class="m-btn p">${I('check')} Encerrar lista</span></div></div>
          <div style="display:grid;grid-template-columns:1.45fr 1fr;gap:14px;flex:1;min-height:0">
            <div class="m-card" style="padding:8px 10px">
              <div class="m-row" style="padding:8px 6px 10px"><b class="m-grow">38 de 45 presentes</b><div class="m-progress" style="width:220px"><i style="width:84%"></i></div></div>
              ${table(['Colaborador', 'Setor', 'Presença'], [
                ['Colaborador 01', 'UTI Adulto', badge('Presente', 'green')], ['Colaborador 02', 'Emergência', badge('Presente', 'green')],
                ['Colaborador 03', 'Internação', badge('Ausente', 'red')], ['Colaborador 04', 'Centro Cirúrgico', badge('Presente', 'green')],
                ['Colaborador 05', 'Higienização', badge('Aguardando', 'amber')]
              ])}</div>
            <div class="m-card" style="display:flex;flex-direction:column;gap:10px"><div class="ct">Setores com treinamentos pendentes</div>
              ${[['Higienização', 31], ['Administrativo', 27], ['Internação', 22], ['Emergência', 14]].map(([s, n]) => `<div style="display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:12px;background:var(--m-nest);border:1px solid var(--m-line);font-size:15px"><span style="color:#f4ce88">${I('alert')}</span><span class="m-grow">${s}</span><b>${n}</b><span class="m-dim" style="font-size:13px">colab.</span></div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>`, true);

  window.MOCKS = M;
})();
