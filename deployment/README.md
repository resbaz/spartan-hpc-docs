Security Notes:

- This deployer runs from an instance that needs access to SSH keys for both Spartan and the docs host (Dashboard), and so access should be locked down, inc:
    - Remove SSH access when not being used
    - Limit HTTP access to GitHub (https://help.github.com/articles/github-s-ip-addresses/)
    