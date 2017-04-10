# Getting Started

*Prerequisite:* You'll need a basic understanding of the Linux command line to use Spartan. But don't worry, you don't need to be an expert, and there are many resources out there to help you. [This tutorial](http://www.ee.surrey.ac.uk/Teaching/Unix/) is a good place to start.

#### 1. Create an account

Go to [Karaage](https://dashboard.hpc.unimelb.edu.au/karaage) to request a Spartan account using your University of Melbourne login. You can either join an existing project, or create a new one.

<br>


#### 2. Login to Spartan via SSH
*Note that your password for Spartan is created during sign-up, and is different to your university password.*

**Windows**

Download an SSH client such as [PuTTY](http://www.putty.org/), set hostname as `spartan.hpc.unimelb.edu.au`  and click Open. You'll be asked for your Spartan username and password.


**Posix (Linux, OS X)**

You'll already have an SSH client installed. Easy! Open a terminal and enter:

```$ ssh yourUsername@spartan.hpc.unimelb.edu.au```

<br>


#### 3. Create a job

Spartan has some shared example code that we can borrow. We'll use the Python example which searches a Twitter dataset.

Copy the example into your home directory, and change working directory:

```$ cp -r /usr/local/common/Python ~/ ```

```$ cd ~/Python```

The dataset is in ```minitwitter.csv```, and the analysis code in ```twitter_search_541635.py```. The files ending in ```.slurm``` tell Spartan how to run your job. For example, ```twitter_one_node_eight_cores.slurm``` requests 8 cores, and a wall time of 12 hours (i.e. maximum time job will run for).


```
#!/bin/bash
#SBATCH --nodes=1
#SBATCH --ntasks=8
#SBATCH --time=0-12:00:00

# Load required modules
module load Python

# Launch multiple process python code
echo "Searching for mentions"
time mpiexec -n 16 python3 twitter_search_541635.py -i /data/projects/COMP90024/twitter.csv -m
echo "Searching for topics"
time mpiexec -n 16 python3 twitter_search_541635.py -i /data/projects/COMP90024/twitter.csv -t
echo "Searching for the keyword 'jumping'"
time mpiexec -n 16 python3 twitter_search_541635.py -i /data/projects/COMP90024/twitter.csv -s jumping
```

<br>

#### 3. Submit your job

First off, when you connect to Spartan, you're connecting to the login node (shared by all users), not an actual computing node. **Please don't run jobs on the login node!**

Instead, use the scheduling tool [Slurm](http://slurm.schedmd.com/), and scripts like the above. They tell Slurm where to run your job, how many cores you need, and how long it will take. Slurm will then allocate resources for your job, placing it in a queue if they're not yet available.

Go ahead and launch your job using `sbatch`:

```
$ sbatch twitter_one_node_sixteen_cores.slurm
> Submitted batch job 27300
```

We can check how it's progressing using `squeue`:
```
$ squeue --job 27300
>            JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
             27300     cloud twitter_   perryd  R      10:48      1 spartan040
```

When complete, an output file is created which logs the output from your job, for the above this has the filename `slurm-27300.out`.

You can also perform interactive work using the ```sinteractive``` command. This is handy for testing and debugging. This will allocate and log you in to a computing node.

