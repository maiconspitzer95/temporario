# Tecnologia que Transforma o Cuidado
Apresentação institucional interativa · Projetos de T.I. 2026–2027
Santa Casa de Misericórdia de Pelotas

## Como iniciar

1. Dê dois cliques em **`Abrir apresentação.bat`**. Ele abre a apresentação no Microsoft Edge, já em tela cheia.
2. Outra opção é dar dois cliques em **`index.html`**, que abre no navegador padrão (Edge ou Chrome).

A apresentação não precisa de internet nem de servidor. Imagens, estilos e navegação estão todos dentro desta pasta. Para levar a outro computador, copie a pasta inteira.

## Acesso pela rede (pm2, porta 2026)

A apresentação também pode ser aberta de qualquer computador da rede em **http://192.168.2.214:2026**.

- Iniciar (uma vez, dentro desta pasta): `pm2 start ecosystem.config.js` e depois `pm2 save`
- Após alterar arquivos, não precisa reiniciar: basta recarregar a página (o servidor envia sempre a versão mais recente).
- Ver situação: `pm2 status apresentacao-ti` · Reiniciar: `pm2 restart apresentacao-ti`
- O `server.js` não tem dependências (usa só o Node.js). Abrir o `index.html` direto continua funcionando.

## Tela cheia

- Pressione **F**, ou clique no botão ⛶ no canto superior direito.
- Para sair da tela cheia, pressione **F** de novo ou **Esc**.
- O layout foi feito para Full HD (1920 × 1080, 16:9). Em outras resoluções, ele se ajusta automaticamente sem cortar nada.

## Navegação

| Onde | Como |
|---|---|
| Abertura | Botão **Conhecer nossos projetos**, ou **→** |
| Menu | Clique em qualquer projeto, em qualquer ordem (eles aparecem em ordem alfabética dentro de cada categoria). Clique no título de uma categoria para abrir a tela da seção. |
| Demonstrar ao vivo | O ícone ↗ em cada cartão, ou o botão verde **Abrir sistema** dentro do projeto, abre o sistema real em outra aba (precisa estar na rede interna). |
| CHIP | O botão do **CHIP**, no alto do menu, abre o acesso ao mascote e IA da Santa Casa. |
| Dentro do projeto | Barra inferior com as abas *Visão geral*, telas demonstrativas e *Benefícios*. Também funcionam as setas **← →** e o passador de slides (PgUp/PgDn). |
| De qualquer lugar | Botão **Voltar ao menu** (ou **M** / **Esc**). O ícone de casa (ou **H**) volta à abertura. |
| Encerramento | Botão **Encerramento** no menu (ou **E**). Na tela final há o botão para voltar ao menu. |

Outros atalhos:
- No menu, as teclas **1** a **0** abrem diretamente os projetos, na ordem em que aparecem (o 0 abre o décimo).
- Os links de cada sistema ficam no campo `url` de cada projeto em `js/data.js`; o link do CHIP fica em `window.CHIP`, no fim do mesmo arquivo.
- A tecla **?** mostra a lista de atalhos.

## Estrutura

```
index.html          Estrutura das telas
css/styles.css      Identidade visual (azul-escuro, vidro fosco)
css/mockups.css     Visual das telas demonstrativas de cada sistema
js/data.js          TEXTOS da apresentação: edite aqui nomes, frases e benefícios
js/mockups.js       Telas demonstrativas (dados fictícios)
js/icons.js         Ícones
js/app.js           Navegação
assets/img/         Logotipo oficial, fundo institucional e mascotes
```

Para mudar um texto, edite apenas o arquivo `js/data.js`, salve e recarregue a página (F5).

## Observações sobre o conteúdo

- As funcionalidades foram levantadas a partir dos próprios sistemas, com acesso somente de leitura. Nenhum projeto original foi alterado.
- Todas as telas demonstrativas usam **dados fictícios**. Não há nomes reais, senhas nem dados de pacientes ou de colaboradores.
- Os projetos de 2027 aparecem como **Em desenvolvimento — Previsão 2027**.
- *Gestão da Qualidade e Capacitações* é uma **proposta conceitual**. Suas telas estão identificadas como demonstração conceitual.
