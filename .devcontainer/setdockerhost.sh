DOCKER_IP=$(/sbin/ip route|awk '/default/ { print $3 }')
DOCKER_HOST="$DOCKER_IP docker.host.internal"

grep -qxF "$DOCKER_HOST" /etc/hosts || echo $DOCKER_HOST >> /etc/hosts
