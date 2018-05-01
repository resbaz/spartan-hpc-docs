## What's special about Spartan?
Most modern HPC systems are built around a cluster of commodity computers tied together with very-fast networking. This allows computation to run across multiple cores in parallel, quickly sharing data between themselves as needed.

For certain jobs, this architecture is essential to achieving high-performance. For others, however, this is not the case, and each node can run without communicating with the others in the cluster. This class of problems often comes under the guise of *[embarrassingly parallel](https://en.wikipedia.org/wiki/Embarrassingly_parallel)*. That is, they can be run as independent parallel tasks by splitting up the data or calculation into discrete chunks. In this case, high speed networking is unnecessary, and the resources can be better spent on utilizing more cores to achieve high performance.

Spartan combines both approaches. By default, jobs run in the flexible cloud partition. For those that need it, there's a physical partition running on bare-metal hardware, interconnected with low-latency 56 GigE networking.

## How do I get an account?
Access to Spartan requires an an account, which you can request using [Karaage](https://dashboard.hpc.unimelb.edu.au/karaage). 

Accounts are associated with a particular project; you can either join an existing project or create a new one.

New projects are subject to approval by the Head of Research Compute Services. Projects must demonstrate an approved research goal or goals, or demonstrate potential to support research activity. Projects require a Principle Investigator and may have additional Research Collaborators.

## How do I access Spartan once I have an account?
You'll need an SSH client. Mac and Linux computers will already have one installed, just use the command `ssh yourUsername@spartan.hpc.unimelb.edu.au` at your terminal.

For Windows, you'll need to download an SSH client such as [PuTTY](http://www.putty.org/), set hostname as `spartan.hpc.unimelb.edu.au` and select Open. You'll be asked for your Spartan username and password.

## My password isn't working!

1. Make sure you're using your Spartan password that you set in [Karaage](https://dashboard.hpc.unimelb.edu.au/karaage). ** Your Spartan password is not necessarily the same as your central university password.**

2. You can request a password reset [here](https://dashboard.hpc.unimelb.edu.au/karaage/profile/password_request/).

3. If you are still having trouble, contact the University of Melbourne Service Desk on +61 3 8344 0999 or ext 40999 or email or [service-centre@unimelb.edu.au](mailto:service-centre@unimelb.edu.au).

## How do I add people to a project?

If you are a project leader you may invite people to join your project. Login to Karaage, and go to your [Karaage project list](https://dashboard.hpc.unimelb.edu.au/karaage/profile/projects/), select the appropriate project, and select the "Invite a new user" option. The user will then receive an invitation link to join the project and set up an account. 

*However* if the belong to an institution that does not have a SAML login process (e.g., international researchers) it is worthwhile contacting the Spartan at [hpc-support@unimelb.edu.au](mailto:hpc-support@unimelb.edu.au). Then the sysadmins will add the person manually to the project and reset their password.

## What are Spartan's specifications?

Spartan consists of 21 bare-metal nodes with 12 cores connected via 56GigE ethernet, achieving a latency of 1.15 us.

The cloud partition nominally consists of 100 nodes with 8 cores each from the [Nectar](http://nectar.org.au/) research cloud, however it is capable of accessing more as the load on Spartan grows.

There also exist a number of specialist nodes with expanded memory or [GPGPU](https://en.wikipedia.org/wiki/General-purpose_computing_on_graphics_processing_units) hardware, as well as partitions dedicated to particular departments and research groups.


## What software is installed?

Spartan uses a modules system ([lmod](http://lmod.readthedocs.io/en/latest/)) to load and unload different packages, including different versions of the same software. You can check what's currently installed using the `module avail` command, and load a module with the `module load` command.

Typically one doesn't load modules directly unless they're in an interactive session on a compute node (launched with `sinteractive`). Instead you load the modules in your Slurm script before executing your particular software.

## What if the software I need is not installed?
[Get in contact](mailto:hpc-support@unimelb.edu.au) with us and we can install it for you. Generally speaking, you should avoid compiling software on Spartan, unless you wrote it from scratch for your own use. By letting us handle it, we can make sure that:

* It works
* Software licenses are managed
* Code is compiled with the appropriate flags to maximize performance
* Others users can also make use of the software.


## Where do I go for help?

First off, we encourage researchers that are new to HPC to undertake training with us. It's free! And we can tailor a specific training program for you, for instance around a specific software package, if there is the demand. Check [here](http://melbourne.resbaz.edu.au/calendar) for a calendar of when the next event is planned, along with the other training programs offered in coordination with ResBaz. Sign up to be notified of our next training events at: [http://melbourne.resbaz.edu.au/participate](http://melbourne.resbaz.edu.au/participate)

Second, check the documentation here, as well as for the software you're running on Spartan (like Slurm).

Finally, if you ever get stuck, please feel free to [email HPC support](mailto:hpc-support@unimelb.edu.au). We're here to help make your research more productive and enjoyable, and we'll do everything we can to help. 


## How do I get access to GPUs?
You'll need to add two parameters to your Slurm script, `#SBATCH --partition gpu` and `#SBATCH --gres=gpu`. You can access up four GPUs in a single job using `#SBATCH --gres=gpu:4`. There is also a specialist partition which can be accessed with `#SBATCH --partition gpgpu`. 

Note that with the generic resource request `gpu` you will be allocated gpus without differentiation. If you need specific gpus these can be specified by type.  We have two different types on the Spartan gpgpu partion, `k80` and `p100`.

For example when submitting a a job that requests `--gres=gpu` for 1 GPU or `--gres=gpu:2` for 2 GPUs per task then that can be satisfied by either type. But if a specific type (for example P100) is neededthen the submission will require `--gres=gpu:p100` and if 2 per task is desired then `--gres=gpu:p100:2` is required.

CUDA 7, 7.5 and 8 are available, along with NVidia driver 367.48. 

_Note:_: As of February 2018, the GPGPU parition (utilising NVidia P100 GPUs), is still undergoing testing and is not yet available for general use.


## How do I submit a job?
You'll need your data files and scripts, the software you want to run installed on Spartan, and a job script so that Spartan knows how to put everything together. Check out [Getting Started](getting_started.md) for an example.


## Do I need to know how to use Linux?
Just the basics to get started. We cover this in our introductory training course, and there are many online resources available to get you started, such as [this tutorial](http://www.ee.surrey.ac.uk/Teaching/Unix/). 


## How do I create a multi-core job?
There are two options here. If you want to run a single instance of your program and have that program access 8 cores, you can do this:


```
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=8
```

This is the typical approach if your program makes use of multi-threading or subprocesses to make use of the additional cores.


Alternatively, if you'd like to run multiple instances (tasks) of your program, each on their own core:

```
#SBATCH --nodes=1
#SBATCH --ntasks=8
#SBATCH --cpus-per-task=1
```

This approach might be used for jobs where there are multiple instances of a program running at once, but they communicate with each other (e.g. using OpenMPI) and so should be kept within a single node so that communication between tasks is quick.

Keep in mind the number of cores that actually exist within a node, eight for the cloud partition and twelve for physical -- you can't request more than this.


## How do I create a multi-node job?

Here's an example of a job with two nodes, each using 12 cores.

```
#SBATCH --nodes=2
#SBATCH --ntasks=2
#SBATCH --cpus-per-task=12
```

Note that you can't have a single instance of a program running across different nodes. Instead, you would usually run two instances of a program (one on each node), and have them pass messages between each other so they can work in parallel using a framework like OpenMPI.

For multi-node jobs, it is usually preferable to use the physical partition, because this partition has faster networking between nodes. 


## What other options are there for running my job?

Many different permutations of cores, memory, nodes, tasks and dependencies are possible to suit different use cases. Refer to the documentation for [Slurm](https://slurm.schedmd.com/) (the job manager we use on Spartan) for details.



## How do I create a job array?

Job arrays are great for kicking off a large number of independent jobs at once. For instance, if you're batch processing a series of files, and the processing for each file can be performed independently of any other.

Say we have an array of files, `data_1.dat` to `data_50.dat` to process with `myProgram`:

```
#!/bin/bash
#SBATCH --ntasks=1
#SBATCH --time=0-00:15:00
#SBATCH --array=1-50

myProgram data_${SLURM_ARRAY_TASK_ID}.dat
```

This will create 50 jobs, each calling `myProgram` with a different data file. These jobs will run in any order, as soon as resources are available (potentially, all at the same time!)



## How do I request more memory?

By default the scheduler will set memory equal to the total amount on a compute node divided by the number of cores requested. In some cases this might not be enough (e.g., very large dataset that needs to be loaded with low level of parallelisation).

Additional memory can be allocated with the `--mem=[mem][M|G|T]` directive (entire job) or `--mem-per-cpu=[mem][M|G|T]` (per core). Maximum should be based around total cores -1 (for system processes). The --mem-per-cpu directive is for threads for OpenMP applications and processor ranks for MPI.

It is best to reserve some memory (about 1 core's worth) for system processes.


## Are there more examples I can look at?

If you go to `/usr/local/common/` on Spartan there are examples for a wide range of programs. You can copy these into your home directory and run them for yourself.



## How do I make my program run fast on Spartan?

Spartan, like almost all modern HPC systems, delivers high-performance by combining lots of smaller computers (nodes) together in a cluster. Each core within a node probably isn't much faster than on your own personal computer, so improved performance is dependent on using parallel processing (MPI or OpenMP) or job arrays. 


## How do I cite Spartan in my publications?

If you use Spartan to obtain results, we'd very much appreciate if you'd cite our service, including the DOI below. This makes it easy for us demonstrate research impact, helping to secure ongoing funding for expansion and user support.

`University of Melbourne (2017) Spartan HPC-Cloud Hybrid: Delivering Performance and Flexibility. https://doi.org/10.4225/49/58ead90dceaaa`


## How do I transition my work from the old HPC system Edward to Spartan?

Here's a [guide](edward_transition.md) to help you.


## How do setup passwordless SSH login?

A passwordless SSH for Spartan will make your life easier. You won't
even need to remember your password!

If you have a *nix system (e.g., UNIX, Linux, MacOS X) open up a
terminal on your _local_ system and generate a keypair.

```
$ ssh-keygen -t rsa
Generating public/private rsa key pair.
Enter file in which to save the key (/home/user/.ssh/id_rsa): 
Created directory '/home/user/.ssh'.
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/user/.ssh/id_rsa.
Your public key has been saved in /home/user/.ssh/id_rsa.pub.
The key fingerprint is:
43:51:43:a1:b5:fc:8b:b7:0a:3a:a9:b1:0f:66:73:a8 user@localhost
```

Now append the new public key to `~/.ssh/authorized_keys` on Spartan (you'll be asked for your password one last time).

```
$ cat .ssh/id_rsa.pub | ssh username@spartan.hpc.unimelb.edu.au 'cat >> .ssh/authorized_keys'
```

Depending on your version of SSH you might also have to do the following
changes:

* Put the public key in .ssh/authorized_keys2
* Change the permissions of .ssh to 700
* Change the permissions of .ssh/authorized_keys2 to 640

You can now SSH to Spartan without having to enter your password!


## How can I avoid typing myUsername@spartan.hpc.unimelb.edu.au everytime I connect?

An SSH config file will also make your life easier. It allows you to create alises (i.e. shortcuts) for a given hostname. 

Create the text file in your `~/.ssh` directory with your preferred text editor, for example, `nano`.

```
nano .ssh/config
```

Enter the following (replacing `username` with your actual username of course!):

```
Host *
ServerAliveInterval 120
Host spartan
       Hostname spartan.hpc.unimelb.edu.au
       User username
```

Now to connect to Spartan, you need only type `ssh spartan`.
