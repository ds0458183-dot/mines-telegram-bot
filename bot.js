const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error('Configure a variável TELEGRAM_BOT_TOKEN com o token do BotFather.');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

const welcome =
`🤖 MINES BOT — Assistente

Posso receber prints do Mines e ajudar a entender o tabuleiro.

⚠️ Importante: casas fechadas não revelam onde estão as bombas. Sem uma fonte confiável do próprio jogo, não posso indicar posições como se fossem verdadeiras nem garantir casas seguras.

Comandos:
/start — abrir o bot
/ajuda — ver ajuda
/analisar — explicar como enviar um print`;

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, welcome);
});

bot.onText(/\/ajuda/, (msg) => {
  bot.sendMessage(msg.chat.id,
`📷 Para enviar um print:
1. Tire uma captura de tela do jogo.
2. Envie a imagem aqui no chat.
3. Eu explicarei o que é visível e o que não pode ser confirmado.

Se as casas estiverem fechadas, a imagem não permite descobrir com certeza onde estão as bombas. Não aposte com base em posições inventadas.`);
});

bot.onText(/\/analisar/, (msg) => {
  bot.sendMessage(msg.chat.id,
'Envie o print do tabuleiro como uma foto. Vou verificar visualmente as informações que aparecem, mas não consigo descobrir bombas escondidas só pelas casas fechadas.');
});

bot.on('photo', async (msg) => {
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId,
'📷 Recebi o print. Posso reconhecer informações visíveis, como o tamanho do tabuleiro e casas já reveladas. Neste print, se todas as casas estiverem fechadas, as posições das bombas não são verificáveis. Não vou chutar fileiras ou colunas.');
});

bot.on('document', async (msg) => {
  const chatId = msg.chat.id;
  const mime = msg.document && msg.document.mime_type;
  if (mime && mime.startsWith('image/')) {
    await bot.sendMessage(chatId,
'🖼️ Recebi a imagem como arquivo. Posso ajudar com o que está visível, mas não consigo confirmar bombas escondidas sem dados confiáveis do jogo.');
  } else {
    await bot.sendMessage(chatId, 'Envie uma imagem PNG ou JPG do tabuleiro, por favor.');
  }
});

bot.on('message', (msg) => {
  if (!msg.text || msg.text.startsWith('/')) return;
  bot.sendMessage(msg.chat.id,
'Entendi. Envie um print do Mines ou use /ajuda. Não há como saber as posições reais de bombas escondidas apenas por adivinhação.');
});

console.log('Mines Bot iniciado.');
