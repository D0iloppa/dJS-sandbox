pids=$(ps -ef | grep node | grep ttys001 | awk '{print $2}')

#서버가 실행중인 경우
if echo $pids | egrep -q '^[0-9]+$'; then
    echo 'server is running now. [${pids}]'
else
    echo 'server not started!'
fi
