Container frameworks such as Docker allow your application, its dependencies and operating system to be encapsulated in a single file that can then be run in isolation from the host system. It's a bit like a light-weight virtual machine. This allows your software to be more portable, for example if you need to share your analysis environment with a colleague, but the dependencies are complex to install and keep consistent. 

In general, we recommend that you [check](/software/md) if the software you need is already installed directly on Spartan, and if it's not, or the wrong version, get in contact to see if it can be installed for you. By allowing us to manage software for you, we can make sure that it's optimised for our particular hardware, and is available for everyone. 

However, there are cases when it might be more practical to bring your own container instead.


## When should I consider a container?

When your software:

* Has complex or out-of-date dependencies that aren't easily installed on Spartan.
* Assumes a particular operating system, e.g. requires Ubuntu, but Spartan runs on Red Hat.
* Is highly-modified or a legacy version that isn't likely to be of use to other researchers.
* Is being run across heterogeneous infrastructure (e.g. Spartan, your laptop, other HPC systems and/or cloud), and containers make it easier to maintain consistency.


## What are the downsides of containers?

* The images themselves can be very large, consuming your storage quota, and being slow to transfer to/from Spartan.
* The container might be optimized for a particular processor architecture, running slowly (or not at all) on systems that differ.
* Their makeup and integrity can be opaque (although many common software packages will have officially supported container images).


## Containers on Spartan

It general Docker isn't appropriate for HPC environments like Spartan in which regular users don't have administrator (root) access. A good alternative is [Singularity](https://www.sylabs.io/docs/), a container framework targeted for research use, which many HPC centres support (including Spartan). Check out [Singularity's documentation](https://www.sylabs.io/docs/) to learn more, in conjunction with below which is specific to Spartan.


### Creating a Container

In general, it's not possible to build a new container on Spartan. Instead, you would fetch an existing container (from Docker or Singularity Hub), build one on your own computer, or on a computer in the cloud. For the latter, the [Melbourne Research Cloud](https://research.unimelb.edu.au/infrastructure/research-platform-services/services/research-cloud) is suitable, and often quite convenient as file transfer between Spartan and cloud instances are fast since they are in the same data centre.


### Running a Container on Spartan

You can load Singularity using our modules system like so:

`module load Singularity/2.5.0-intel-2017.u2`

An example job script is available at `/usr/local/common/Singularity`, which is also [mirrored](https://github.com/resbaz/spartan-examples/tree/master/Singularity) on GitHub. 



