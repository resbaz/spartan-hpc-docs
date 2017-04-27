## Documentation for the Spartan HPC cluster, using mkdocs.

# Contributing
Fork/clone this repo, and make a pull request to master, which will automatically deploy changes once accepted. Remember to `mkdocs build` before committing.

# Deployment
We automatically deploy to a Swift bucket on Nectar upon pushing to master.

1. Setup an Ubuntu 14.04 VM.
2. `sudo apt-get install python python-pip git python-swiftclient`
3. `git clone https://github.com/razius/github-webhook-handler.git`
4. Modify repos.json as per that included in `deployment/repos.json`.
5. `export REPOS_JSON_PATH=/home/ubuntu/github-webhook-handler/repos.json` and run `sudo -E python index.py 80` to start server (see sample rc.local to do this on boot).
6. Connect GitHub webhook of this repo to your VM IP address.
7. Create 'openstack_credentials.sh', based on OpenStack RC file (download from dashboard), modified with password pre-filled.
