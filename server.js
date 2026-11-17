/* =========================================================================
   Servidor da apresentação (para acessar pela rede: http://<IP>:2026)
   Sem dependências: usa apenas o Node.js. Iniciado pelo pm2:
     pm2 start ecosystem.config.js
   A apresentação continua funcionando também abrindo o index.html direto.
   ========================================================================= */
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT) || 2026;
const ROOT = __dirname;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};
// arquivos que não devem ser servidos
const BLOCKED = new Set(['server.js', 'ecosystem.config.js']);

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' }); return res.end();
  }
  let rel;
  try { rel = decodeURIComponent(new URL(req.url, 'http://x').pathname); }
  catch (e) { res.writeHead(400); return res.end('Requisição inválida'); }
  if (rel === '/') rel = '/index.html';

  const file = path.normalize(path.join(ROOT, rel));
  const name = path.basename(file);
  // impede sair da pasta e servir arquivos internos
  if (!file.startsWith(ROOT + path.sep) || name.startsWith('.') || BLOCKED.has(name) || !TYPES[path.extname(file).toLowerCase()]) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end('Não encontrado');
  }

  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end('Não encontrado');
    }
    res.writeHead(200, {
      'Content-Type': TYPES[path.extname(file).toLowerCase()],
      'Content-Length': st.size,
      // sempre a versão mais recente após atualizar os arquivos
      'Cache-Control': 'no-cache',
      'Last-Modified': st.mtime.toUTCString()
    });
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(file).on('error', () => res.destroy()).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Apresentação disponível em http://localhost:${PORT} (e pelo IP desta máquina)`);
});
