#!/bin/bash
rm -r node_modules
rm -r bower_components
grunt build
scp -Cr ~/darwin/Backend/src/main/webapp/seatmap hydrogen:/home/darwin
ssh hydrogen "sudo rm -r /opt/tomcat-backend/webapps/ROOT/seatmap"
ssh hydrogen "sudo mv /home/darwin/seatmap /opt/tomcat-backend/webapps/ROOT/seatmap"
npm install
bower install
