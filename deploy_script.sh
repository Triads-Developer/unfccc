#!/bin/bash

sftp greg@research-dev.artsci.wustl.edu:/home/greg/TRIADS/unfccc/public <<EOF
put -r ./build/*
exit
EOF

