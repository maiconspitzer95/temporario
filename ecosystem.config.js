// pm2 start ecosystem.config.js   →   http://<IP desta máquina>:2026
module.exports = {
  apps: [{
    name: 'apresentacao-ti',
    script: 'server.js',
    cwd: __dirname,
    env: { PORT: 2026 },
    autorestart: true,
    max_restarts: 20
  }]
};
