pm2 start index.js --watch --name 'test2' -o --output './logs/out.log' -e --error './logs/error.log'

pm2 start index.js --watch --name 'ztstest' -o logs/out.log -e logs/error.log

pm2 stop all

pm2 flush

pm2 stop webhookServer
启动 mongodb 服务
./bin/mongod -f conf/mongod.conf

php natapp.php --authtoken=1bc681b31a23b8c0