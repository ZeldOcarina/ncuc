module.exports = {"apps":[{"name":"staging-ncuc","script":"app.js","instances":1,"autorestart":true,"watch":false,"max_memory_restart":"1G","out_file":"logs/out.log","log_file":"logs/combined.log","error_file":"logs/errors.log","env":{"NODE_ENV":"production"}}]}