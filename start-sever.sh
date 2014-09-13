#!/bin/sh

export PATH=/usr/local/bin:$PATH
forever start /home/andy/www/swingschlampen.de/server.js > /dev/null
