# Software

This page outlines usage and tips for some of the most popular software being used on Spartan. 

## Python

There are multiple versions of Python installed on Spartan, which you can check using `module spider Python`. 

Common packages like numpy are already installed with some versions, but may be missing from others. If a Python package is missing, let us know, and we can install it for you. Alternatively, you can install additional packages locally using `pip install --user <package name>`. This works well for pure-python packages, but you may encounter errors for those that link to other binary packages.


## R


## MATLAB

MATLAB 2016a is installed on Spartan, along with all of the standard toolboxes. 

MATLAB can be invoked with a particular script using `matlab ...`. You may need to add particular working directories so MATLAB can find your scripts.

## Gaussian


## Singularity

Singularity is a container technology, much like Docker, that allows you to run software in an isolated environment. Singularity containers include not only the software you want to run, but also the operating system and dependencies. This makes them relatively portable across different compute resources, and can be helpful in dealing with legacy or extremely complex dependencies for niche software.

Unlike Docker, Singularity images can run without root (administrator) access, making them suitable for a shared HPC environment.

### Creating an Image


### Running an Image