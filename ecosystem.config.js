module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   * pm2 deploy ecosystem.config.js production setup
   */
  apps : [
    // First application
    {
      name: 'xcx',
      script: 'server/index.js',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: 'ogs/err.log',
      out_file: 'logs/out.log',
      max_memory_restart: '1000M', // 限制最大内存
      min_uptime: '200s', // 应用运行少于时间被认为是异常启动, 防止不断重启
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_testing: {
        name: 'testing',
        NODE_ENV: 'testing' // 默认
      },
      env_production : {
        name: 'production',
        NODE_ENV: 'production' // 默认
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'root',
      host : '47.97.7.154',
      ref  : 'origin/master',
      repo : 'git@gitee.com:f2ee/auto-deploy-admin.git',
      path : '/mnt/webapps/deployProject/auto-test',
      'post-deploy' : 'git pull && cnpm install && pm2 reload ecosystem.config.js --env development'
    },
    dev : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/development',
      'post-deploy' : 'git pull && npm install && pm2 reload ecosystem.config.js --env development',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
};
