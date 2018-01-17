
# Contributing
Fork/clone this repo, and make a pull request to master, which will automatically deploy changes once accepted. 

Remember to `mkdocs build` before committing.

# Deployment
We automatically deploy to dashboard web host upon pushing to master.

1. Setup an Ubuntu 14.04 VM.
2. `sudo apt-get install python python-pip git`
3. `git clone https://github.com/razius/github-webhook-handler.git`
4. Modify repos.json as per that included in `deployment/repos.json`.
5. `export REPOS_JSON_PATH=/home/ubuntu/github-webhook-handler/repos.json` and run `sudo -E python index.py 80` to start server. Ideally set this up via supervisord to keep it running.
6. Connect GitHub webhook of this repo to your VM IP address.

# Security Notes
- Remove SSH access on doc deployment host when not being used
- Limit incoming HTTP access to GitHub (https://help.github.com/articles/github-s-ip-addresses/)
- Auto-apply package updates, inc. security patches: https://help.ubuntu.com/community/AutomaticSecurityUpdates
    
