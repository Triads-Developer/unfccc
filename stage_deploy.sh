#!/bin/bash

sftp greg@research-stage.artsci.wustl.edu:/home/greg/TRIADS/unfccc/public <<EOF
put -r ./build/*
exit
EOF

