# awk는 파일로부터 레코드(record)를 선택하고, 선택된 레코드에 포함된 값을 조작하거나 데이터화하는 것을 목적
# 2>&1 means: stderr also goes to the stdout
# & at the end means: run this command as a background task.

nohup npm run dev > ./server.log  2>&1 &
