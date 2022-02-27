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
      host : 'http://64.227.136.195/',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
