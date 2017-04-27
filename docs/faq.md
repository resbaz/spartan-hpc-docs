# Frequently Asked Questions

### What's special about Spartan?
Most modern HPC systems are built around a cluster of commodity computers tied together with very-fast networking. This allows computation to run across multiple cores in parallel, quickly sharing data between themselves as needed.

For certain jobs, this architecture is essential to achieving high-performance. For others, however, this is not the case, and each node can run without communicating with the others in the cluster. This class of problems often comes under the guise of *[embarrassingly parallel](https://en.wikipedia.org/wiki/Embarrassingly_parallel)*. That is, they can be run as independent parallel tasks by splitting up the data or calculation into discrete chunks. In this case, high speed networking is unnecessary, and the resources can be better spent on utilizing more cores to achieve high performance.

Spartan combines both approaches. By default, jobs run in the flexible cloud partition. For those that need it, there's a physical partition running on bare-metal hardware, interconnected with low-latency 56 GigE networking.


### How do I get an account?
Access to Spartan requires an an account, which you can request using [Karaage](https://dashboard.hpc.unimelb.edu.au/karaage). 

Accounts are associated with a particular project; you can either join an existing project or create a new one.

New projects are subject to approval by the Head of Research Compute Services. Projects must demonstrate an approved research goal or goals, or demonstrate potential to support research activity. Projects require a Principle Investigator and may have additional Research Collaborators.

### How do I access Spartan once I have an account?
You'll need an SSH client. Mac and Linux computers will already have one installed, just use the command `ssh yourUsername@spartan.hpc.unimelb.edu.au` at your terminal.

For Windows, you'll need to download an SSH client such as [PuTTY](http://www.putty.org/), set hostname as `spartan.hpc.unimelb.edu.au`  and click Open. You'll be asked for your Spartan username and password.


### My password isn't working!

1. Make sure you're using your Spartan password that you set in [Karaage](https://dashboard.hpc.unimelb.edu.au/karaage). ** Your Spartan password is not the same as your central university password.**

2. You can request a password reset [here](https://dashboard.hpc.unimelb.edu.au/karaage/profile/password_request/).


### What are Spartan's specifications?

Spartan consists of 21 bare-metal nodes with 12 cores connected via 56GigE ethernet, achieving a latency of 1.15 µsec.

The cloud partition nominally consists of 100 nodes with 8 cores each from the [Nectar](http://nectar.org.au/) research cloud, however it is capable of accessing more as the load on Spartan grows.

There also exist a number of specialist nodes with expanded memory or [GPGPU](https://en.wikipedia.org/wiki/General-purpose_computing_on_graphics_processing_units) hardware, as well as partitions dedicated to particular departments and research groups.


### What software is installed?

Spartan uses a modules system ([lmod](http://lmod.readthedocs.io/en/latest/)) to load and unload different packages, including different versions of the same software. You can check what's currently installed using the `module avail` command, and load a module with the `module load` command.

Typically one doesn't load modules directly unless they're in an interactive session on a compute node (launched with `sinteractive`). Instead you load the modules in your Slurm script before executing your particular software.

### What if the software I need is not installed?
[Get in contact](mailto:hpc-support@unimelb.edu.au) with us and we can install it for you. Generally speaking, you should avoid compiling software on Spartan, unless you wrote it from scratch for your own use. By letting us handle it, we can make sure that:

* It works
* Software licenses are managed
* Code is compiled with the appropriate flags to maximize performance
* Others users can also make use of the software.


### Where do I go for help?

First off, we encourage researchers that are new to HPC to undertake training with us. It's free! And we can tailor a specific training program for you, for instance around a specific software package, if there is the demand. Check [here](http://melbourne.resbaz.edu.au/calendar) for a calendar of when the next event is planned, along with the other training programs offered in coordination with ResBaz. Sign up to be notified of our next training events at: [http://melbourne.resbaz.edu.au/participate](http://melbourne.resbaz.edu.au/participate)

Second, check the documentation here, as well as for the software you're running on Spartan (like Slurm).

Finally, if you ever get stuck, please feel free to [email HPC support](mailto:hpc-support@unimelb.edu.au). We're here to help make your research more productive and enjoyable, and we'll do everything we can to help. 


### How do I get access to GPUs?
You'll need to add two parameters to your Slurm script, `#SBATCH --partition gpu` and `#SBATCH --gres=gpu`. You can access up four GPUs in a single job using `#SBATCH --gres=gpu:4`.

CUDA 7, 7.5 and 8 are available, along with NVidia driver 367.48. 


### How do I submit a job?
You'll need your data files and scripts, the software you want to run installed on Spartan, and a job script so that Spartan knows how to put everything together. Check out [Getting Started](getting_started.md) for an example.


### Do I need to know how to use Linux?
Just the basics to get started. We teach this in our introductory training course, and there are many online resources available to get you started, such as [this tutorial](http://www.ee.surrey.ac.uk/Teaching/Unix/). 



### How do I create a multi-core job?


### How do I creare a multi-node job?


### How do I create a job array?


### Are there more examples I can look at?