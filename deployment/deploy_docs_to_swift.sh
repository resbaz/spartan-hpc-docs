#!/bin/bash

cd /home/ubuntu
rm -rf spartan-hpc-docs

git clone -b master https://github.com/resbaz/spartan-hpc-docs.git

source openstack_credentials.sh

cd spartan-hpc-docs/site/
swift delete spartan_docs
swift upload spartan_docs *
swift post --read-acl ".r:*" spartan_docs
swift post -m 'web-index:index.html' spartan_docs