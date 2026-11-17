/* =========================================================================
   CONTEÚDO DA APRESENTAÇÃO
   Para editar textos, altere apenas este arquivo.
   Funcionalidades descritas a partir da análise dos sistemas reais.
   ========================================================================= */
window.CATEGORIES = [
  {
    id: '2026', num: '01', label: 'Entregues em 2026',
    title: '2026 — Um ano de entregas e transformação digital',
    titleHtml: '<em>2026</em> — Um ano de entregas e transformação digital',
    sub: 'Sistemas em uso que já transformam a rotina da instituição.',
    color: '#6cb6ff',
    status: { text: 'Entregue em 2026', color: '#93e4c0' }
  },
  {
    id: 'dez', num: '02', label: 'Disponíveis em 1º de dezembro de 2026',
    title: 'Novas soluções. Novas possibilidades.',
    titleHtml: 'Novas soluções. <em>Novas possibilidades.</em>',
    sub: 'Disponíveis a partir de 1º de dezembro de 2026.',
    color: '#5ec4ff',
    status: { text: 'Disponível a partir de 1º/12/2026', color: '#7fd9ff', pulse: true }
  },
  {
    id: '2027', num: '03', label: 'Previstos para 2027',
    title: '2027 — O futuro já está em desenvolvimento',
    titleHtml: '<em>2027</em> — O futuro já está em desenvolvimento',
    sub: 'Projetos em construção para os próximos passos da instituição.',
    color: '#e6bc7f',
    status: { text: 'Em desenvolvimento — Previsão 2027', color: '#f4ce88' }
  }
];

window.PROJECTS = [
  /* ------------------------------------------------------------- 2026 */
  {
    id: 'biblioteca', cat: '2026', icon: 'book', accent: '#6cb6ff',
    url: 'http://192.168.2.214:3000/',
    name: 'Biblioteca Virtual', full: 'Documentos institucionais em um só lugar',
    card: 'Documentos oficiais, sempre atualizados.',
    tagline: 'A versão certa de cada documento, ao alcance de todos.',
    what: 'Repositório interno dos documentos oficiais do hospital, como os POPs. Os colaboradores encontram, consultam e baixam a versão vigente — e cada novo documento só é publicado após revisão da Qualidade e aprovação do gestor.',
    features: [
      ['folder', 'Biblioteca organizada', 'Pastas, busca e visualização dos documentos direto no navegador.'],
      ['upload', 'Envio de documentos', 'Anexe o arquivo, escolha a pasta de destino e encaminhe para revisão.'],
      ['filepen', 'Criação de POP guiada', 'Assistente em 7 etapas gera o POP no modelo oficial.'],
      ['clipboard', 'Revisão e aprovação', 'Qualidade revisa, gestor aprova; reprovações exigem justificativa.'],
      ['history', 'Versões e auditoria', 'Histórico de versões e registro de cada ação realizada.']
    ],
    badge: 'Novo: Criar POP',
    update: {
      tab: 'Novidade',
      kicker: 'Atualização · Nova funcionalidade',
      title: 'Agora o POP é criado <em>direto no sistema.</em>',
      sub: 'O colaborador preenche o procedimento em etapas e a Biblioteca gera o documento no modelo Word oficial da instituição — pronto para seguir à Qualidade.',
      before: ['Baixar o modelo do POP e preencher no Word', 'Risco de usar um modelo antigo ou fora do padrão', 'Salvar o arquivo e anexá-lo manualmente', 'Correções trocadas por e-mail, em versões soltas'],
      after: ['Formulário guiado, preenchido no navegador', 'Documento gerado sempre no modelo oficial', 'Rascunho salvo e envio direto para a Qualidade', 'POP devolvido para correção no mesmo lugar'],
      steps: ['Identificação', 'Siglas', 'Materiais', 'Tarefas', 'Registros', 'Referências', 'Alterações']
    },
    screens: [
      { tab: 'Menu principal', mock: 'bibMenu', title: 'Criar POP agora está no menu', points: ['Nova área “Criar POP” ao lado das demais.', 'Cada perfil vê somente as áreas que lhe cabem.', 'Permissões por perfil, setor e pasta.'] },
      { tab: 'Criar POP', mock: 'bibPop', title: 'POP padronizado em 7 etapas', points: ['Da identificação ao controle de alterações.', 'Tarefas em sequência, reordenadas com as setas.', 'Materiais, registros e referências em listas.'] },
      { tab: 'Meus POPs', mock: 'bibMyPops', title: 'Rascunhos e correções em um só lugar', points: ['Salve o rascunho e continue depois.', 'POP devolvido volta para correção aqui.', 'Situação de cada POP sempre visível.'] },
      { tab: 'Documento gerado', mock: 'bibPopDoc', title: 'O documento sai no modelo oficial', points: ['Visualize o POP antes de enviar.', 'Cabeçalho, código, revisão e vigência preenchidos.', 'Um clique envia para a Qualidade.'] },
      { tab: 'Revisão', mock: 'bibReview', title: 'Publicado só depois de aprovado', points: ['Qualidade analisa e encaminha ao gestor do setor.', 'Reprovação sempre com justificativa.', 'O autor corrige e reenvia uma nova versão.'] }
    ],
    benefitTitle: 'Informação confiável, <em>sem papel e sem cópias desatualizadas.</em>',
    benefits: [
      ['Colaboradores', 'book', 'Documento certo, na hora certa', 'Acesso rápido à versão vigente de cada procedimento.'],
      ['Instituição', 'shieldcheck', 'Rastreabilidade para a acreditação', 'Cada aprovação registrada, com responsável e data.'],
      ['Gestão', 'flow', 'Fluxo 100% digital', 'Revisão e aprovação sem papel, com acesso controlado por setor.']
    ],
    mascot: 'assets/img/mascote-biblioteca.png'
  },
  {
    id: 'mp', cat: '2026', icon: 'swap', accent: '#8bcaff',
    url: 'http://192.168.2.214:5001/',
    name: 'MP', full: 'Movimentação de Pessoal',
    card: 'Solicitações de pessoal online, com aprovações rastreáveis.',
    tagline: 'Do pedido à contratação, cada etapa visível.',
    what: 'Os gestores solicitam online as movimentações de pessoal — aumento de quadro, reposição, alteração e desligamento. Cada MP percorre automaticamente as aprovações necessárias, com acompanhamento em tempo real.',
    features: [
      ['plus', 'Nova MP em 3 etapas', 'Aumento de quadro, Reposição, Banco de Talentos, Alteração ou Desligamento.'],
      ['flow', 'Fluxo de aprovação', 'Gerente, Gestão de Pessoas, Jurídico, Direção, Provedor e Financeiro, conforme o tipo.'],
      ['check', 'Fila de aprovações', 'Aprovar, devolver para ajuste ou reprovar, com tempo em cada etapa.'],
      ['eye', 'Monitoramento RH', 'Acompanhamento de vagas, preenchimentos e contratação.'],
      ['chart', 'Indicadores e relatórios', 'Painel de movimentações e tempo médio de conclusão.']
    ],
    screens: [
      { tab: 'Nova MP', mock: 'mpNew', title: 'Solicitar ficou simples', points: ['Assistente guiado em 3 etapas.', 'O tipo escolhido define quem precisa aprovar.', 'Cada MP recebe um número único.'] },
      { tab: 'Aprovações', mock: 'mpApprove', title: 'Cada decisão registrada', points: ['Fila com o tempo de cada MP na etapa.', 'Histórico completo e imutável.', 'Aprovar, devolver ou reprovar em um clique.'] },
      { tab: 'Indicadores', mock: 'mpDash', title: 'Gestão com indicadores', points: ['Onde cada solicitação está aguardando.', 'Volume mensal e tipos de movimentação.', 'Tempo médio de conclusão.'] }
    ],
    benefitTitle: 'Menos formulários, <em>mais transparência nas decisões.</em>',
    benefits: [
      ['Gestores', 'clock', 'Acompanhamento em tempo real', 'O gestor sabe exatamente em que etapa está cada solicitação.'],
      ['Gestão de Pessoas', 'listcheck', 'Fim do papel e do e-mail', 'Solicitações numeradas, completas e centralizadas.'],
      ['Instituição', 'shieldcheck', 'Decisões auditáveis', 'Níveis de aprovação claros e histórico de cada decisão.']
    ]
  },
  {
    id: 'fichas', cat: '2026', icon: 'ticket', accent: '#3cc8b8',
    url: 'http://192.168.2.214:4000/',
    name: 'Painel de Fichas', full: 'Gerenciamento de fichas de atendimento',
    card: 'Fila organizada: ficha no tablet, chamada na TV.',
    tagline: 'Fila organizada, chamada clara, paciente bem orientado.',
    what: 'Organiza a fila de atendimento. O paciente retira a ficha no tablet, a recepção chama pelo sistema e o painel na TV exibe e anuncia a chamada em voz alta. Ao final, o paciente pode avaliar o atendimento.',
    features: [
      ['tablet', 'Autoatendimento no tablet', 'Escolha do tipo de atendimento e impressão automática da ficha.'],
      ['volume', 'Chamada pela recepção', 'Chamar próxima ficha, repetir chamada e finalizar, por guichê.'],
      ['tv', 'Painel na TV', 'Chamada em destaque, aviso sonoro, anúncio por voz e mídias institucionais.'],
      ['smile', 'Avaliação do atendimento', 'O paciente avalia: Ruim, Regular, Bom ou Excelente.'],
      ['chart', 'Relatórios', 'Fichas emitidas, finalizadas e tempos médios por tipo.']
    ],
    screens: [
      { tab: 'Painel na TV', mock: 'fichasTv', title: 'Chamada que todos veem e ouvem', points: ['Ficha, tipo e guichê em destaque.', 'Aviso sonoro e anúncio por voz.', 'Espaço para campanhas e orientações.'] },
      { tab: 'Recepção', mock: 'fichasRecep', title: 'A recepção no controle da fila', points: ['Chamar a próxima ficha com um clique.', 'Visão do dia por tipo e por status.', 'Repetir chamada e finalizar atendimento.'] },
      { tab: 'Tablet', mock: 'fichasTablet', title: 'Autoatendimento do início ao fim', points: ['O paciente escolhe o atendimento e recebe a ficha impressa.', 'Indicador de impressora conectada.', 'Avaliação rápida da experiência.'] }
    ],
    benefitTitle: 'Uma recepção mais organizada <em>e acolhedora.</em>',
    benefits: [
      ['Pacientes', 'volume', 'Chamada visual e sonora', 'Mais acessibilidade e menos aglomeração no balcão.'],
      ['Recepção', 'listcheck', 'Fila e prioridades organizadas', 'Atendimentos preferenciais respeitados e fila sob controle.'],
      ['Instituição', 'chart', 'Dados para decidir', 'Tempos de espera e satisfação medidos continuamente.']
    ]
  },
  {
    id: 'voteai', cat: '2026', icon: 'vote', accent: '#f5b942',
    url: 'http://192.168.2.214:2001/admin/login',
    name: 'VotaSanta', full: 'Sistema de Votações Corporativas',
    card: 'Votação pelo celular, com apuração imediata.',
    tagline: 'Votar leva segundos. Apurar, também.',
    what: 'A urna eletrônica institucional. O colaborador vota pelo celular, lendo um QR Code e informando o CPF. A comissão acompanha a apuração em tempo real e emite a ata ao final.',
    features: [
      ['calendar', 'Criação de votações', 'CIPA, Comissão de Funcionários e outras, com cadastro de candidatos.'],
      ['qr', 'Voto por QR Code', 'Um voto por colaborador, validado na base de funcionários ativos.'],
      ['tv', 'Modo TV', 'Apuração parcial ao vivo, com atualização automática.'],
      ['filetext', 'Resultados e ata', 'Gráficos, exportação para Excel e ata em PDF.'],
      ['lock', 'Sigilo e auditoria', 'Voto sigiloso, permissões por perfil e trilha de auditoria.']
    ],
    screens: [
      { tab: 'Votação no celular', mock: 'voteMobile', title: 'Do QR Code ao voto confirmado', points: ['Sem urna, sem cédula, sem fila.', 'CPF validado entre os colaboradores ativos.', 'Um único voto por pessoa.'] },
      { tab: 'Modo TV', mock: 'voteTv', title: 'Apuração transparente, ao vivo', points: ['Parcial atualizada automaticamente.', 'Ranking com votos e percentuais.', 'Ao encerrar, ata em PDF e planilha prontas.'] }
    ],
    benefitTitle: 'Participação mais fácil, <em>resultado mais confiável.</em>',
    benefits: [
      ['Colaboradores', 'phone', 'Votar pelo próprio celular', 'Em qualquer turno, em poucos segundos.'],
      ['Comissões', 'zap', 'Apuração imediata', 'Resultado disponível no encerramento, sem contagem manual.'],
      ['Instituição', 'shieldcheck', 'Sigilo e voto único', 'Processo auditável, com ata gerada automaticamente.']
    ]
  },

  /* ------------------------------------------------------- DEZEMBRO */
  {
    id: 'sic', cat: 'dez', icon: 'headset', accent: '#38bdf8',
    url: 'http://192.168.2.214:5002/login',
    name: 'SIC', full: 'Sistema Integrado de Chamados',
    card: 'O canal oficial de suporte da T.I.',
    tagline: 'Precisou da T.I.? Abra um chamado.',
    what: 'O novo canal oficial para pedir suporte à Tecnologia da Informação. O colaborador abre o chamado na categoria certa, acompanha cada etapa, conversa com o técnico e avalia a solução.',
    features: [
      ['grid', 'Abertura por categoria', 'Software, Hardware e Rede, Solicitar Login, Relatório, Manutenção e outras.'],
      ['ticket', 'Protocolo e acompanhamento', 'Cada pedido com número, status e histórico.'],
      ['message', 'Conversa com o técnico', 'Chat em tempo real dentro do próprio chamado.'],
      ['star', 'Avaliação do atendimento', 'Confirme a conclusão e avalie de 1 a 5 estrelas.'],
      ['book', 'Base de Conhecimento', 'Orientações para resolver dúvidas comuns, com o assistente Chip.']
    ],
    screens: [
      { tab: 'Portal do colaborador', mock: 'sicPortal', title: 'Pedir ajuda em poucos cliques', points: ['Categorias de atendimento rápido.', 'Formulário adequado a cada tipo de pedido.', 'Seus chamados recentes sempre à vista.'] },
      { tab: 'Acompanhamento', mock: 'sicChat', title: 'Converse com quem está resolvendo', points: ['Chat em tempo real com o técnico.', 'Prioridade, setor e responsável visíveis.', 'Confirmação e avaliação ao final.'] },
      { tab: 'Fila da T.I.', mock: 'sicQueue', title: 'Na T.I., nenhum pedido se perde', points: ['Fila única com prioridades.', 'O técnico assume o chamado — sem duplicidade.', 'Indicadores de produtividade e SLA.'] }
    ],
    howto: ['Acesse o SIC com seu usuário de rede', 'Escolha a categoria e descreva o pedido', 'Acompanhe, converse e avalie'],
    benefitTitle: 'Suporte mais rápido, <em>organizado e mensurável.</em>',
    benefits: [
      ['Colaboradores', 'smile', 'Fim do pedido por telefone e mensagem', 'Um único canal, com protocolo e retorno garantido.'],
      ['Equipe de T.I.', 'listcheck', 'Prioridades claras', 'Fila organizada, prazos de atendimento e histórico.'],
      ['Instituição', 'chart', 'Gestão por indicadores', 'Setores que mais demandam e tempo médio de solução.']
    ],
    mascot: 'assets/img/mascote-sic.png'
  },
  {
    id: 'sio', cat: 'dez', icon: 'message', accent: '#8fb8ff',
    url: 'http://192.168.2.214:5004/',
    name: 'SIO', full: 'Sistema Integrado de Ouvidoria',
    card: 'Cada manifestação ouvida, respondida e no prazo.',
    tagline: 'Escutar, acompanhar e responder.',
    what: 'Registra e acompanha as manifestações de pacientes e do público — elogios, reclamações, sugestões, denúncias e pedidos de informação — garantindo que cada uma receba resposta dentro do prazo.',
    features: [
      ['clipboard', 'Registro de manifestações', 'Tipo, área, motivo, setor e canal de cada atendimento.'],
      ['clock', 'Prazos controlados', 'Encaminhamento ao gestor com alertas e escalonamento ao gerente em 24h.'],
      ['checkcircle', 'Validação e resposta final', 'A Ouvidoria valida a resposta antes de concluir.'],
      ['lock', 'Sigilo e permissões', 'Acesso por perfil, casos restritos e auditoria.'],
      ['chart', 'Painel e relatórios', 'Indicadores para a Direção, com exportação em PDF e Excel.']
    ],
    screens: [
      { tab: 'Manifestações', mock: 'sioCases', title: 'Todas as manifestações em um só lugar', points: ['Registro numerado e completo.', 'Vencimentos sempre à vista.', 'Atrasos destacados automaticamente.'] },
      { tab: 'Acompanhamento', mock: 'sioDetail', title: 'Do registro à resposta final', points: ['Encaminhamento ao gestor com prazo definido.', 'Escalonamento ao gerente se o prazo vencer.', 'Ouvidoria valida e conclui.'] },
      { tab: 'Painel indicador', mock: 'sioDash', title: 'Indicadores para a Direção', points: ['Manifestações por tipo, área e período.', 'Cumprimento de prazo por gestor.', 'Relatórios em PDF e Excel.'] }
    ],
    howto: ['A Ouvidoria registra e encaminha', 'O gestor responde pelo sistema, no prazo', 'A Ouvidoria valida e conclui'],
    benefitTitle: 'Nenhuma manifestação <em>sem resposta.</em>',
    benefits: [
      ['Pacientes e público', 'heart', 'Resposta no prazo', 'Cada manifestação acompanhada até a conclusão.'],
      ['Gestores', 'bell', 'Prazos lembrados automaticamente', 'Alertas e escalonamento evitam esquecimentos.'],
      ['Direção', 'shieldcheck', 'Sigilo e rastreabilidade', 'Histórico completo e indicadores para a acreditação.']
    ],
    mascot: 'assets/img/mascote-sio.png'
  },

  /* ------------------------------------------------------------- 2027 */
  {
    id: 'avaliacao', cat: '2027', icon: 'radar', accent: '#e6bc7f',
    url: 'http://192.168.2.214:5005/',
    name: 'Avaliação de Desempenho', full: 'Avaliação e desenvolvimento de colaboradores',
    card: 'Ciclos de avaliação por competências.',
    tagline: 'Pessoas que cuidam. Talentos que evoluem.',
    what: 'Portal para os ciclos de avaliação de desempenho. Cada colaborador faz sua autoavaliação, os gestores avaliam por competências e a Gestão de Pessoas libera um resultado consolidado.',
    features: [
      ['calendar', 'Ciclos de avaliação', 'Abertura, participantes, prazos e encerramento.'],
      ['usercheck', 'Autoavaliação e avaliação do gestor', 'Escala de 1 a 5, com opção de salvar rascunho.'],
      ['award', 'Competências por cargo', 'Banco de perguntas e questionários por cargo.'],
      ['radar', 'Resultado consolidado', 'Mapa comparativo entre autoavaliação e gestores.'],
      ['flow', 'Estrutura organizacional', 'Núcleos, setores, cargos e hierarquia.']
    ],
    screens: [
      { tab: 'Minhas avaliações', mock: 'avList', title: 'Cada um sabe o que precisa fazer', points: ['Autoavaliação e avaliações da equipe.', 'Prazo e situação de cada avaliação.', 'Respostas salvas como rascunho.'] },
      { tab: 'Resultado consolidado', mock: 'avResult', title: 'Uma visão justa do desempenho', points: ['Comparativo por competência.', 'Diferenças relevantes destacadas.', 'Resultado liberado pela Gestão de Pessoas.'] }
    ],
    benefitTitle: 'Um processo de avaliação <em>padronizado e justo.</em>',
    benefits: [
      ['Colaboradores', 'trending', 'Desenvolvimento visível', 'Clareza sobre pontos fortes e oportunidades.'],
      ['Gestores', 'listcheck', 'Critérios únicos', 'Mesmas competências e escala para todos.'],
      ['Gestão de Pessoas', 'shieldcheck', 'Processo auditável', 'Histórico preservado, mesmo com mudanças de setor.']
    ]
  },
  {
    id: 'gerp', cat: '2027', icon: 'brain', accent: '#7fe6b5',
    url: 'http://192.168.2.214:5003/',
    name: 'GERP', full: 'Gestão de Riscos Psicossociais',
    card: 'Bem-estar no trabalho, medido com sigilo.',
    tagline: 'Cuidar de quem cuida.',
    what: 'Os colaboradores respondem a um questionário anônimo sobre carga de trabalho, autonomia, apoio e relacionamentos. O SESMT e a Gestão de Pessoas enxergam os riscos psicossociais por setor e registram planos de ação, conforme a NR-01.',
    features: [
      ['calendar', 'Campanhas de avaliação', 'Para todo o hospital ou setores escolhidos.'],
      ['clipboard', 'Questionário do colaborador', 'Respostas anônimas, em escala de concordância.'],
      ['chart', 'Resultados por dimensão', 'Cinco dimensões de fatores psicossociais.'],
      ['alert', 'Inventário de riscos', 'Classificação de risco por setor, conforme a NR-01.'],
      ['listcheck', 'Planos de ação', 'Ações com responsável, prazo e situação.']
    ],
    screens: [
      { tab: 'Questionário', mock: 'gerpForm', title: 'Responder é simples e anônimo', points: ['Uma pergunta por vez, com progresso.', 'Escala de "Discordo totalmente" a "Concordo totalmente".', 'Resultados só por grupo — mínimo de 5 respostas.'] },
      { tab: 'Painel de riscos', mock: 'gerpDash', title: 'Riscos identificados, ações planejadas', points: ['Participação acompanhada em tempo real.', 'Nível de risco por dimensão.', 'Planos de ação vinculados.'] }
    ],
    benefitTitle: 'Prevenção, cuidado <em>e conformidade com a NR-01.</em>',
    benefits: [
      ['Colaboradores', 'heart', 'Voz com sigilo', 'Participação anônima, protegida por amostra mínima.'],
      ['SESMT e RH', 'alert', 'Detecção precoce', 'Fatores de risco identificados por setor.'],
      ['Instituição', 'shieldcheck', 'Conformidade legal', 'Inventário de riscos para o PGR e ações mensuráveis.']
    ],
    mascot: 'assets/img/mascote-gerp.png'
  },
  {
    id: 'cipa', cat: '2027', icon: 'hardhat', accent: '#4ade80',
    url: 'http://192.168.2.214:3001/',
    name: 'SESMT/CIPA', full: 'Saúde Ocupacional, Segurança do Trabalho e CIPA',
    card: 'Segurança e saúde do trabalho integradas.',
    tagline: 'Segurança e saúde do trabalho, integradas.',
    what: 'Um único sistema para a Segurança e Medicina do Trabalho e para a CIPA: atestados, afastamentos, exames ocupacionais, ocorrências e CAT, além de reuniões, sugestões, SIPAT e certificados.',
    features: [
      ['grid', 'Painel integrado', 'Visões SESMT e CIPA em um só ambiente.'],
      ['alert', 'Ocorrências e CAT', 'Registro, investigação, plano de ação e CAT no padrão eSocial.'],
      ['stethoscope', 'Saúde ocupacional', 'Atestados, afastamentos, exames e ASO com vencimentos.'],
      ['users', 'Gestão da CIPA', 'Reuniões, atas, sugestões, planos de ação e SIPAT.'],
      ['award', 'Certificados NR-5', 'Emissão em PDF com verificação por QR Code.']
    ],
    screens: [
      { tab: 'Painel integrado', mock: 'cipaPanel', title: 'Uma visão completa da saúde ocupacional', points: ['Exames a vencer, afastamentos e atestados.', 'Ocorrências por setor hospitalar.', 'Registro de ocorrência em destaque.'] },
      { tab: 'Ocorrências', mock: 'cipaIncidents', title: 'Do registro à conclusão', points: ['Investigação e plano de ação.', 'Controle do prazo da CAT.', 'Situação de cada caso sempre visível.'] },
      { tab: 'CIPA', mock: 'cipaCipa', title: 'A CIPA organizada e atuante', points: ['Reuniões, sugestões e planos de ação.', 'Planejamento da SIPAT.', 'Certificados com verificação por QR Code.'] }
    ],
    benefitTitle: 'Mais segurança para quem trabalha <em>e menos papel para quem cuida.</em>',
    benefits: [
      ['Colaboradores', 'hardhat', 'Prevenção de acidentes', 'Ocorrências investigadas e ações acompanhadas.'],
      ['SESMT', 'clock', 'Nenhum prazo esquecido', 'Alertas de exames, ASO e CAT.'],
      ['Instituição', 'shieldcheck', 'Conformidade legal', 'NR-05, NR-07 e eSocial com dados protegidos.']
    ],
    mascot: 'assets/img/mascote-sesmt.png'
  },

  /* ---------------------------------------------- 2026 · novos sistemas */
  {
    id: 'scs', cat: '2026', icon: 'door', accent: '#7cc4ff',
    url: 'http://192.168.0.10:5013/',
    name: 'SCS', full: 'Sistema de Controle de Salas',
    card: 'Reserva de salas com calendário e aprovação.',
    tagline: 'A sala certa, no horário certo, sem conflito.',
    what: 'Centraliza o agendamento das salas de reunião e treinamento. O setor solicita a reserva informando sala, horário, pauta e público; a reserva passa por aprovação e aparece no calendário de todos.',
    features: [
      ['calendar', 'Calendário de reservas', 'Visão mensal ou semanal, com feriados e fins de semana marcados.'],
      ['plus', 'Nova reserva', 'Data, sala, horário, setor, pauta e presença de público externo.'],
      ['checkcircle', 'Fluxo de aprovação', 'Reservas aprovadas, pendentes, canceladas ou rejeitadas.'],
      ['chart', 'Painel do dia', 'Reservas de hoje, pendências e ocupação das salas.'],
      ['printer', 'Relatórios em PDF', 'Horas aprovadas e público externo por sala e setor.']
    ],
    screens: [],
    benefitTitle: 'Salas bem utilizadas, <em>reuniões sem conflito.</em>',
    benefits: [
      ['Setores', 'calendar', 'Agendamento sem telefonema', 'Disponibilidade visível antes de pedir a sala.'],
      ['Administração', 'listcheck', 'Fim das reservas duplicadas', 'Cada reserva aprovada e registrada.'],
      ['Instituição', 'chart', 'Ocupação medida', 'Relatórios de uso das salas e do público externo.']
    ]
  },
  {
    id: 'netscope', cat: '2026', icon: 'network', accent: '#4fd1ff',
    url: 'http://192.168.1.129:4321',
    name: 'NetScope', full: 'Central de Monitoramento de Rede',
    card: 'Rede, links e nobreaks monitorados ao vivo.',
    tagline: 'A rede do hospital, vista em tempo real.',
    what: 'Central de monitoramento da infraestrutura de T.I.: equipamentos, links de internet e nobreaks acompanhados ao vivo, com a localização de cada ponto na planta baixa do hospital, alertas de queda e relatórios de indisponibilidade.',
    features: [
      ['network', 'Painel de rede ao vivo', 'Topologia em árvore, por conexões ou por andar, atualizada a cada 5 segundos.'],
      ['building', 'Planta baixa', 'Localização real dos equipamentos em cada andar, com status online e offline.'],
      ['globe', 'Links externos e consumo de banda', 'Links de internet monitorados e tráfego por máquina em tempo real.'],
      ['bell', 'Alertas e auditoria', 'Aviso no Telegram quando um equipamento cai e log de cada evento.'],
      ['zap', 'Nobreaks e relatórios', 'Validade das baterias, uptime, causas de queda e equipamentos críticos.']
    ],
    screens: [],
    benefitTitle: 'Problemas encontrados <em>antes de virarem chamados.</em>',
    benefits: [
      ['Equipe de T.I.', 'bell', 'Queda avisada na hora', 'Alerta automático e localização exata do equipamento.'],
      ['Setores', 'checkcircle', 'Menos tempo parado', 'Falhas identificadas e resolvidas mais rápido.'],
      ['Instituição', 'chart', 'Infraestrutura medida', 'Uptime, causas de queda e manutenção preventiva dos nobreaks.']
    ]
  },
  {
    id: 'sigep', cat: '2026', icon: 'fingerprint', accent: '#5fd3c6',
    url: 'http://192.168.0.10:5016/',
    name: 'SIGEP', full: 'Ponto Médico',
    card: 'Registro e controle do ponto médico.',
    tagline: 'Presença médica registrada com segurança.',
    what: 'Sistema para o registro e o acompanhamento do ponto dos médicos, com acesso por usuário e senha e informações centralizadas para a gestão.',
    features: [
      ['fingerprint', 'Registro do ponto', 'Entradas e saídas dos médicos registradas no sistema.'],
      ['history', 'Histórico de registros', 'Consulta dos registros por profissional e período.'],
      ['lock', 'Acesso controlado', 'Entrada com usuário e senha.'],
      ['chart', 'Apoio à gestão', 'Informação organizada para conferência e fechamento.']
    ],
    screens: [],
    benefitTitle: 'Ponto médico <em>organizado e confiável.</em>',
    benefits: [
      ['Médicos', 'clock', 'Registro simples', 'Presença registrada sem papel.'],
      ['Gestão', 'listcheck', 'Conferência facilitada', 'Registros centralizados e consultáveis.'],
      ['Instituição', 'shieldcheck', 'Rastreabilidade', 'Histórico preservado de cada registro.']
    ]
  },
  {
    id: 'sigtap', cat: '2026', icon: 'database', accent: '#9fb8ff',
    url: 'http://192.168.0.10:5014/',
    name: 'SIGTAPSANTA', full: 'Consulta institucional da tabela SIGTAP',
    card: 'Procedimentos do SUS e compatibilidades.',
    tagline: 'A tabela do SUS, consultada em segundos.',
    what: 'Consulta institucional da tabela SIGTAP: procedimentos, medicamentos, órteses, próteses e materiais especiais do SUS, com vínculos de CID, CBO, habilitações, modalidades, serviços, leitos e regras condicionadas da competência vigente.',
    features: [
      ['search', 'Pesquisa por código ou nome', 'Mais de 5 mil procedimentos da competência ativa.'],
      ['layers', 'Vínculos completos', 'CID, CBO, habilitações, modalidades, serviços e leitos.'],
      ['swap', 'Compatibilidades', 'Procedimento principal e compatível, nas duas direções.'],
      ['database', '41 tabelas carregadas', 'Mais de 14 mil CIDs e 2,7 mil ocupações.'],
      ['printer', 'Impressão de resultados', 'Consulta pronta para conferência e auditoria.']
    ],
    screens: [],
    benefitTitle: 'Faturamento mais seguro, <em>com a regra do SUS à mão.</em>',
    benefits: [
      ['Faturamento', 'search', 'Consulta imediata', 'Sem planilhas nem sites externos.'],
      ['Auditoria', 'checkcircle', 'Compatibilidades conferidas', 'Menos glosas por incompatibilidade.'],
      ['Instituição', 'shieldcheck', 'Competência vigente', 'Todos consultam a mesma versão da tabela.']
    ]
  },
  {
    id: 'sisobre', cat: '2026', icon: 'bell', accent: '#ffb86b',
    url: 'http://192.168.0.10:5015/login',
    name: 'SISOBRE', full: 'Sistema de Sobreaviso e Banco de Horas',
    card: 'Escalas de sobreaviso e banco de horas.',
    tagline: 'Sobreaviso e banco de horas sob controle.',
    what: 'Organiza as escalas de sobreaviso e o banco de horas dos colaboradores, com informações centralizadas para os gestores e para a Gestão de Pessoas, incluindo a exportação de férias.',
    features: [
      ['calendar', 'Escalas de sobreaviso', 'Quem está de sobreaviso, em cada período.'],
      ['clock', 'Banco de horas', 'Saldo de horas acompanhado por colaborador.'],
      ['download', 'Exportação de férias', 'Dados prontos para a Gestão de Pessoas.'],
      ['lock', 'Acesso por perfil', 'Entrada com usuário e senha.']
    ],
    screens: [],
    benefitTitle: 'Horas registradas, <em>escalas transparentes.</em>',
    benefits: [
      ['Colaboradores', 'clock', 'Saldo visível', 'Banco de horas acompanhado sem planilhas.'],
      ['Gestores', 'calendar', 'Escalas organizadas', 'Sobreaviso definido e consultável.'],
      ['Gestão de Pessoas', 'listcheck', 'Menos retrabalho', 'Informação exportada direto do sistema.']
    ]
  },

  /* ---------------------------------------------- 2027 · novos sistemas */
  {
    id: 'dimensionamento', cat: '2027', icon: 'bed', accent: '#f0a8c8',
    url: 'http://192.168.0.10:5017/',
    name: 'Dimensionamento da Assistência', shortName: 'Dimensionamento', full: 'Acompanhamento da Enfermagem',
    card: 'Pacientes-dia e ocupação por unidade.',
    tagline: 'Dimensionar a equipe a partir de dados reais.',
    what: 'Acompanhamento diário da assistência de enfermagem: lançamento de pacientes e leitos por unidade, taxa de ocupação, distribuição SUS e não SUS e indicadores para o dimensionamento das equipes.',
    features: [
      ['clipboard', 'Lançamento diário', 'Pacientes e leitos registrados por unidade.'],
      ['chart', 'Painel de indicadores', 'Pacientes-dia, média diária e ocupação média.'],
      ['pie', 'SUS e não SUS', 'Distribuição dos pacientes por convênio.'],
      ['bed', 'Ocupação por unidade', 'Taxa de ocupação e leitos vigentes.'],
      ['download', 'Histórico e exportação', 'Consulta por período e resumo em CSV.']
    ],
    screens: [],
    benefitTitle: 'Equipes dimensionadas <em>com base em indicadores.</em>',
    benefits: [
      ['Enfermagem', 'clipboard', 'Registro padronizado', 'Lançamento diário simples, por unidade.'],
      ['Gestão assistencial', 'chart', 'Ocupação acompanhada', 'Evolução diária e comparativo entre unidades.'],
      ['Instituição', 'shieldcheck', 'Decisão fundamentada', 'Dados para o dimensionamento das equipes.']
    ]
  },
  {
    id: 'financeiro', cat: '2027', icon: 'wallet', accent: '#6fe0a8',
    url: 'http://192.168.0.10:5020/',
    name: 'Gestão Financeira', full: 'SanPel Financeiro · Gestão financeira hospitalar',
    card: 'Caixa, contas e fluxo financeiro.',
    tagline: 'Caixa e compromissos sob controle.',
    what: 'Gestão de caixa e dos compromissos financeiros do hospital: contas a pagar e a receber, honorários, fluxo de caixa projetado e simulações para apoiar a decisão.',
    features: [
      ['chart', 'Dashboard financeiro', 'Visão consolidada do caixa e dos compromissos.'],
      ['wallet', 'Contas a pagar e a receber', 'Lançamentos e vencimentos acompanhados.'],
      ['trending', 'Fluxo de 21 dias', 'Projeção do caixa para as próximas semanas.'],
      ['zap', 'Simulador', 'Cenários antes de assumir novos compromissos.'],
      ['settings', 'Parâmetros de caixa', 'Regras e limites definidos pela gestão.']
    ],
    screens: [],
    benefitTitle: 'Decisões financeiras <em>com previsibilidade.</em>',
    benefits: [
      ['Financeiro', 'listcheck', 'Tudo em um só lugar', 'Contas, honorários e caixa integrados.'],
      ['Direção', 'trending', 'Visão do futuro', 'Fluxo projetado e simulação de cenários.'],
      ['Instituição', 'shieldcheck', 'Controle e segurança', 'Acesso por usuário e dados na rede interna.']
    ]
  },
  {
    id: 'honorarios', cat: '2027', icon: 'coins', accent: '#ffd36b',
    url: 'http://192.168.0.10:5023/',
    name: 'Honorários Médicos', full: 'SanPel · Débitos de Honorários Médicos PJ',
    card: 'Controle dos honorários médicos PJ.',
    tagline: 'Honorários médicos organizados e conferidos.',
    what: 'Controle dos débitos de honorários dos médicos pessoa jurídica, integrado à gestão financeira, com painel de acompanhamento e acesso seguro.',
    features: [
      ['coins', 'Débitos de honorários PJ', 'Valores devidos a cada prestador organizados.'],
      ['chart', 'Dashboard', 'Visão geral dos honorários em aberto.'],
      ['wallet', 'Integração financeira', 'Parte do ecossistema SanPel Financeiro.'],
      ['lock', 'Acesso seguro', 'Senha provisória com troca obrigatória no primeiro acesso.']
    ],
    screens: [],
    benefitTitle: 'Honorários em dia, <em>com transparência.</em>',
    benefits: [
      ['Corpo clínico', 'heart', 'Pagamentos organizados', 'Débitos registrados e acompanhados.'],
      ['Financeiro', 'listcheck', 'Menos planilhas', 'Controle centralizado dos honorários.'],
      ['Instituição', 'shieldcheck', 'Rastreabilidade', 'Histórico de cada débito e pagamento.']
    ]
  },
  {
    id: 'sigesp', cat: '2027', icon: 'users', accent: '#5ec49a',
    url: 'http://192.168.0.10:5022/',
    name: 'SIGESP', full: 'Sistema de Gestão de Pessoas',
    card: 'Informações de pessoas em um só sistema.',
    tagline: 'Pessoas no centro da gestão.',
    what: 'Sistema de Gestão de Pessoas da Santa Casa, com painel de visão geral e as informações dos colaboradores reunidas em um único ambiente para a área de Gestão de Pessoas.',
    features: [
      ['grid', 'Dashboard', 'Visão geral do quadro e dos processos de pessoas.'],
      ['users', 'Cadastro de colaboradores', 'Informações centralizadas e atualizadas.'],
      ['flow', 'Processos de Gestão de Pessoas', 'Rotinas da área em um só ambiente.'],
      ['lock', 'Acesso controlado', 'Entrada com usuário e senha.']
    ],
    screens: [],
    benefitTitle: 'Gestão de pessoas <em>integrada e digital.</em>',
    benefits: [
      ['Colaboradores', 'users', 'Informação atualizada', 'Dados de cada colaborador em um só lugar.'],
      ['Gestão de Pessoas', 'listcheck', 'Menos retrabalho', 'Rotinas da área centralizadas.'],
      ['Instituição', 'chart', 'Indicadores de pessoas', 'Visão geral para apoiar decisões.']
    ]
  }
];

/* Ordem alfabética dentro de cada categoria (menu, seções e atalhos 1–0). */
window.PROJECTS.sort((a, b) =>
  window.CATEGORIES.findIndex(c => c.id === a.cat) - window.CATEGORIES.findIndex(c => c.id === b.cat) ||
  a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }));

/* CHIP — mascote e IA da Santa Casa (botão separado no menu) */
window.CHIP = {
  name: 'CHIP', full: 'Nosso mascote e IA da Santa Casa',
  url: 'http://192.168.0.10:2000/chip-login',
  img: 'assets/img/chip-avatar.png'
};
