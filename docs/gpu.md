## Using Spartan's GPGPU Partition

Recipients of appropriate LIEF grants are able to access the new GPGPU partition on Spartan. This provides a summary for access and use of the Spartan environment.

## Projects and Accounts

User accounts and projects can be established at `https://dashboard.hpc.unimelb.edu.au/karaage`. All users must belong to a project. A project may have one or more project leaders. Project leaders may invite others to join their project. Projects must be approved by the head of Research Compute Services at the University of Melbourne. 

When applying for a project be explicit in what the project is about. Users may have one account and one account only, however they may belong to multiple projects.

Karaage also provides users the opportunity to change their shell, password etc. Note that your username and password on Spartan is not the same as the username and password that you have for other university authentication services (unless you set it as such). They are separate systems.

## Access

A user will have an account name and password. To access Spartan use of ssh is required. This is built-in to Linux and MacOS X clients. For MS-
Windows systems an application such as PuTTY (http://putty.org) is required. The general syntax is:

`ssh username@spartan.hpc.unimelb.edu.au`.

When logging in you you will be given the Message of the Day, which includes highlights usage rules and system updates.

Once logged in you will be in your home directory (`/home/$username`) on the login node (aka head node). You will also have project directory established (`/data/cephfs/$projectID`). Both the home directories and project directories have default quotas (50GB and 500GB respectively).

## Partitions

Spartan has multiple partitions, which can be viewed with the `sinfo -s` command. The main partitions are 'cloud' (the default), which is useful for single-node jobs, 'physical' which has more powerful systems with a higher speed interconnect, and 'gpgpu', which is large but restricted partition of GPUs.

## Job Submission

Spartan is a shared environment. As a result, compute tasks should be run using the job submission system, known as Slurm. Users need to write a small script file which indicates the resources they wish to
use (processors, memory etc), how long they wish to use them for (walltime), where they wish to use them (partitions), the applications
the wish to use (modules), and the commands they wish to run. 

There are many example jobscripts in the directory `/usr/local/common`. These include multicore jobs, multinode jobs, job arrays, job dependencies, and interactive jobs, with examples across many applications. Note that a Slurm job script invokes a shell, and as such, shell commands and structures (e.g., functions) can be included in a job submission script.

You will need to add some additional parameters to your script to make use of the gpgpu partition, to make use of the specified account, and to request the use of gpu resources. Respectively, those are:

```
#SBATCH -p gpgpu
#SBATCH -A $projectID
#SBATCH --gres=gpu:4    #this will request 4 gpus, 1 whole node.
```

Once such as script is written they can launch it with `sbatch $scriptname`, where it will go into the queue. The status of all jobs in a partition can be checked with `showq -p $queuename | less`. A specific user's jobs can be checked with `squeue -u $username`. 

**Do not run jobs on the login node. Use the queueing system**

## Modules

Spartan makes use of environment modules. This allows multiple versions of applications to be installed on a single system with the application paths added to the user's environment. 

Modules ensure that the system provides application consistency and replication in a research project, different compiler toolchains, and version-specific features. Specific modules can be included in a job submission script with `module load $application/toolchain-version`.

## Help

There are many sources of help for the Spartan system. Firstly, there is the information on the website, `https://dashboard.hpc.unimelb.edu.au`. On the system itself the command `man spartan` will provide various job submission suggestions.

There is also the helpdesk, which can be used to report incidents, general job submission scripting assistance, and feature requests (e.g., software installs). The email for this is : hpc-support@unimelb.edu.au

Please submit one topic per ticket. Try to provide significant information in your ticket (e.g., jobIDs, location of scripts, URL for software to install). If you require a assistance with a separate matter, compose a new ticket. Please do not reply to existing or closed tickets or email individual systems administrators directly.

In addition to this Research Platforms regularly runs training classes for an Introduction to Linux and HPC, Advanced Linux and Shell Scripting, and an Introduction to Parallel Processing. Sign up here: `http://melbourne.resbaz.edu.au/participate`
