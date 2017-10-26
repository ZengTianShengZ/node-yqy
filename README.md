pm2 start index.js --watch --name 'test2' -o --output './logs/out.log' -e --error './logs/error.log'

pm2 start index.js --watch --name 'test2' -o out.log -e error.log

pm2 stop all