#!/bin/bash

sftp greg@research-prod.artsci.wustl.edu:/exports/nfsdrupal/TRIADS/unfccc/public <<EOF
put -r ./build/*
exit
EOF

