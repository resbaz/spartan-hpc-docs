#!/bin/bash

cd /home/ubuntu
rm -rf spartan-hpc-docs

git clone -b master https://github.com/resbaz/spartan-hpc-docs.git

scp -r -i ~/.ssh/spartan_docs_host -o ProxyCommand="ssh -W %h:%p perryd@spartan.hpc.unimelb.edu.au -i ~/.ssh/spartan_metrics_perryd" spartan-hpc-docs/site/* root@dashboard.hpc.unimelb.edu.au:/var/www/html/test
#ssh -i ~/.ssh/spartan_docs_host -o ProxyCommand="ssh -W %h:%p perryd@spartan.hpc.unimelb.edu.au -i ~/.ssh/spartan_metrics_perryd" root@dashboard.hpc.unimelb.edu.au