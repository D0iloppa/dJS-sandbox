// kill_dev.sh
HERE=$( cd "$(dirname "$0")" ; pwd )
cd $HERE
cd "svelte"
 
kill -9 `cat $HERE/save_pid.txt`
rm "$HERE/save_pid.txt"
