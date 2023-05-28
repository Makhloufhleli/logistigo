module.exports = {
  apps: [
    {
      name: 'logistigo-prod',
      script: 'dist/main.js',
      args: '',
      instances: 'max',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 8000,
      },
    },
  ],
};
