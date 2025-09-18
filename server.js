const express = require('express');
const path = require('path');

const app = express();

// Porta configurável via env PORT, padrão 3000
const PORT = parseInt(process.env.PORT, 10) || 3000;

// Servir arquivos estáticos do diretório atual (onde está index.html)
const publicDir = path.resolve(__dirname);
app.use(express.static(publicDir));

app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor iniciado em http://0.0.0.0:${PORT} (acessível por qualquer IP`) ;
  console.log('Pressione CTRL+C para parar');
});
