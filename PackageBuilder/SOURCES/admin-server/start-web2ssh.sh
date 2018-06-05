#!/bin/bash

. /etc/admin-served.conf
su admin-server -c "/bin/node $ADMIN_SERVER_HOME/web2ssh-gateway.js" &> $ADMIN_SERVER_LOGFILE

