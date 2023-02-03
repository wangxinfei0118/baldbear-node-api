module.exports = {
  apps : [{
    name: 'baldbear-node-api',
    script: 'app.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'pro'
    }
  }]
}
