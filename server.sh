#!/bin/bash
APP_NAME='iconfont-http-server'
PORT=4020

usage() {
    echo "Usage: sh server.sh [start|stop|restart|status]"
    exit 1
}

is_exist() {
  pid=$(ps -ef|grep $APP_NAME|grep -v grep|awk '{print $2}')

  if [ -z "${pid}" ]; then
    return 1
  else
    return 0
  fi
}

start() {
  is_exist
  if [ $? -eq "0" ]; then
    echo "${APP_NAME} server is already running. pid=${pid} ."
  else
    nohup python -c "import SimpleHTTPServer; m = SimpleHTTPServer.SimpleHTTPRequestHandler.extensions_map; m[''] = 'text/plain'; m.update(dict([(k, v + ';charset=UTF-8') for k, v in m.items()])); SimpleHTTPServer.test();" ${PORT} ${APP_NAME} >> nohup.out 2>&1 &
  fi
}

stop() {
  is_exist
  if [ $? -eq "0" ]; then
    kill -9 $pid
  else
    echo "${APP_NAME} is not running"
  fi
}

status() {
  is_exist
  if [ $? -eq "0" ]; then
    echo "${APP_NAME} is running. Pid is ${pid}"
  else
    echo "${APP_NAME} is NOT running."
  fi
}

restart() {
  stop
  start
}

case "$1" in
  "start")
    start
    ;;
  "stop")
    stop
    ;;
  "status")
    status
    ;;
  "restart")
    restart
    ;;
  *)
    usage
    ;;
esac
