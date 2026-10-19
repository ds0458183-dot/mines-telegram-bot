# MINES BOT para Telegram

Bot inicial que recebe mensagens e prints do Mines. Ele não finge prever bombas escondidas: casas fechadas não fornecem informação suficiente para confirmar posições.

## Criar o bot no Telegram
1. Abra https://t.me/BotFather
2. Envie `/newbot`.
3. Escolha nome e username (o username deve terminar em `bot`).
4. Copie o token recebido. **Não compartilhe o token publicamente.**

## Executar
Requisitos: Node.js 18 ou superior.

```bash
npm install
```

Defina a variável de ambiente `TELEGRAM_BOT_TOKEN` com o token do BotFather e execute:

```bash
npm start
```

No Android, pode ser mais fácil hospedar este projeto num serviço de Node.js que mantenha o processo ativo. Configure a variável de ambiente no painel do serviço; não coloque o token diretamente no código nem publique-o no GitHub.

## Limitação
Este starter não acessa o servidor do 520win.one e não consegue inferir bombas escondidas a partir de um screenshot. Para previsões verificáveis seria necessária uma fonte oficial e documentada do jogo que forneça os dados relevantes.
