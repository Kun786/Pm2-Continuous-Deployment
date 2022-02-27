module.exports = {
  apps : [{
    script: 'index.js',
    watch: '.'
  }, {
    script: './server.js',
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '64.227.136.195',
      ref  : 'origin/master',
      repo : 'https://github.com/fazi1live/Pm2-Continuous-Deployment',
      path : '/root/Pm2-Continuous-Deployment',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      key : "/root/.ssh/git.pub"
    }
  }
};
