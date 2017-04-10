# Frequently Asked Questions

### What's special about Spartan?
Most modern HPC systems are built around a cluster of commodity computers tied together with very-fast networking. This allows computation to run across multiple cores in parallel, quickly sharing data between themselves as needed.

For certain jobs, this architecture is essential to achieving high-performance. For others, however, this is not the case, and each node can run without communicating with the others in the cluster. This class of problems often comes under the guise of *[embarrassingly parallel](https://en.wikipedia.org/wiki/Embarrassingly_parallel)*. That is, they can be run as independent parallel tasks by splitting up the data or calculation into discrete chunks. In this case, high speed networking is unnecessary, and the resources can be better spent on utilizing more cores to achieve high performance.

Spartan combines both approaches. By default, jobs run in the flexible cloud partition. For those that need it, there's a physical partition running on bare-metal hardware, interconnected with low-latency 56 GigE networking.


### How do I get an account?
Access to Spartan requires an an account, which you can request using [Karaage](https://dashboard.hpc.unimelb.edu.au/karaage). 

Accounts are associated with a particular project; you can either join an existing project or create a new one.

New projects are subject to approval by the Head of Research Compute Services. Projects must demonstrate an approved research goal or goals, or demonstrate potential to support research activity. Projects require a Principle Investigator and may have additional Research Collaborators.


### What are Spartan's specifications?

Spartan consists of ?? bare-metal nodes with ?? cores connected via 56GigE ethernet, achieving a latency of 1.15 µsec.

The cloud partition nominally consists of ?? cores from the [Nectar](http://nectar.org.au/) research cloud, however it is capable of accessing many more as the load on Spartan increases.

There also exist a number of specialist nodes with expanded memory or [GPGPU](https://en.wikipedia.org/wiki/General-purpose_computing_on_graphics_processing_units) hardware, as well as partitions dedicated to particular departments and research groups.


### What software is installed?

Spartan uses a modules system ([lmod](http://lmod.readthedocs.io/en/latest/)) to load and unload different packages, including different versions of the same software. You can check what's currently installed using the `module avail` command, and load a module with the `module load` command.

Typically one doesn't load modules directly unless they're in an interactive session on a compute node (launched with `sinteractive`). Instead you load the modules in your Slurm script before executing your particular software.

### What if the software I need is not installed?
[Get in contact](mailto:hpc-support@unimelb.edu.au) with us and we can install it for you. You should not compile software on Spartan yourself, unless you wrote it from scratch for your own use. By letting us handle it, we can make sure that:
- It works
- Software licenses are managed
- Code is compiled with the appropriate flags to maximize performance
- Others users can also make use of the software.


### Where do I go for help?

First off, we encourage researchers that are new to HPC to undertake training with us. It's free! And we can tailor a specific training program for you, for instance around a specific software package, if there is the demand. Check [here](http://melbourne.resbaz.edu.au/calendar) for a calendar of when the next event is planned, along with the other training programs offered in coordination with ResBaz.

Second, check the documentation here, as well as for the software you're running on Spartan (like Slurm).

Finally, if you ever get stuck, please feel free to [email HPC support](mailto:hpc-support@unimelb.edu.au). We're here to help make your research more productive and enjoyable, and we'll do everything we can to help. 



