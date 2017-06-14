
This page outlines usage and tips for some of the most popular software being used on Spartan. 

Spartan uses a modules system ([lmod](http://lmod.readthedocs.io/en/latest/)) to load and unload different packages, including different versions of the same software. This allows many different software packages to be installed on Spartan at once without interfering with each other

You can check what's currently installed using the `module avail` command, search using `module spider`, and load a particular module with the `module load` command. For example, to load MATLAB 2016a, use `module load MATLAB/2016a`.

Generally you shouldn't load modules from the login node, instead working on a compute node, either via an interactive session (launched with `sinteractive`), or from within your Slurm script.


## Python

There are multiple versions of Python installed on Spartan, which you can check using `module spider Python`. 

Common packages like numpy are already installed with some versions, but may be missing from others. If a Python package is missing, let us know, and we can install it for you. Alternatively, you can install additional packages locally using `pip install --user <package name>`. This works well for pure-python packages, but you may encounter errors for those that link to other binary packages.


## R

R version 3.2.1 and 3.4.0 are installed on Spartan, along with some common packages. If a package you need is missing, you can either install it locally, or contact us to install it system-wide.


## MATLAB

MATLAB 2016a is installed on Spartan, along with all of the standard toolboxes. 

MATLAB can be invoked with a particular script using `matlab -nodisplay -nodesktop -r "run my_script.m"`. You may need to add particular working directories so MATLAB can find all the scripts necessary for your job.

