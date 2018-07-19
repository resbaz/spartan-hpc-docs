Chances are you need to run your HPC job against a dataset, perhaps quite a sizable one. There are a number of places to store data on Spartan while you're working with it, and ways to get data in and out.


## Where to Store Your Data on Spartan

**Projects Directory**

Your projects directory is the best place to store research data while you're working on it. It's located at `/data/projects/<projectid>` for older projects, or `/data/cephfs/<projectid>` for newer ones.

Others in your project can access it, and 500 GB of storage is available per project. If you need more than this, [get in touch](mailto:hpc-support@unimelb.edu.au) and we'll try to find a solution. In general 1 TB of project storage is available upon request, and up to 10 TB is possible if needed. Project storage beyond 10 TB will generally require some sort of co-investment, but this may be waived in some circumstances, particularly for high-value shared datasets.

**Home Directory**

Your home directory, i.e. `/home/yourusername` can be used to store small amounts of data, however this is generally discouraged. It's best suited to short-lived and non-critical data, for example while working through our [getting started](getting_started.md) tutorial or testing out new software.

Others in your project won't have access, and you're limited to 50GB of storage.


**Scratch Space**

You can store temporary working data while your job is running at `/tmp`. This will map to a directory on our fast scratch network storage specific to your job ID, and clean up once your job is complete. It's also possible to write directly to `/scratch/`, for instance if you would like to share your working files across multiple nodes. In this case it's your own responsibility to avoid collisions (i.e. two processes writing to the same file at the same time), and clean up afterwards.


**N.B.** Note that home, project and scratch are all network-based storage that can be accessed by multiple nodes and processes at the same time. Take care that you don't inadvertently write to the same file from multiple jobs at the same time.


## How to Transfer Data In and Out of Spartan

**Secure Copy (scp)**

You can use the `scp` command to move data from your local machine to Spartan. For example, to move `mydata.dat` from your current working directory to your project directory on Spartan:

```$ scp local.dat myusername@spartan.hpc.unimelb.edu.au:/data/projects/myproject/remote.dat```

You can transfer files from Spartan to your local machine by reversing the order of the arguments like so:

```$ scp myusername@spartan.hpc.unimelb.edu.au:/data/projects/myproject/remote.dat  local.dat```

For Windows users, PuTTY provides an equivalent tool called `pscp`. If you're data is located on a remote machine, you can SSH into that system first, and then use `scp` from that machine to transfer your data into Spartan.

If you'd prefer a GUI interface, you can use tools like [FileZilla](https://filezilla-project.org/) (cross-platform) or [CyberDuck](https://cyberduck.io/?l=en) (OS X & Windows).

**rsync**

Repeatedly transferring large files in and out of Spartan via `scp` can be tedious. A good alternative is [rsync](https://download.samba.org/pub/rsync/rsync.html), which only transfers the parts that have changed. It can work on single files, or whole directories, and the syntax is much same as for `scp`.

```$ rsync local.dat myusername@spartan.hpc.unimelb.edu.au:/data/projects/myproject/remote.dat  ```

Note that the first argument is the source, and the second is the destination which will be modified to match the source.


## Not for Long-Term Storage
While it's often essential to have fast nearby storage while working on your data, please don't use Spartan as your long-term data repository. It's not designed for that, may not conform to the requirements set by your institution or funding body, and we don't guarantee to store your data indefinitely (though we certainly won't get rid of it without asking you first). 


## Mediaflux Integration

Mediaflux is a very capable, general and extensible data management platform for managing digital assets. You can read a little about it here: [http://www.arcitecta.com/Products](http://www.arcitecta.com/Products)

Clients for Mediaflux are available on Spartan, allowing data to be uploaded/downloaded. Details on using this client are available [here](https://wiki.cloud.unimelb.edu.au/resplat/doku.php?id=data_management:mediaflux:howto:downloaddata_with_spartan).



## Data and Storage Solutions Beyond Spartan

The University offers a range of other data storage and management solutions to meet your needs, beyond the short-term storage available on Spartan, which are described [here](http://research.unimelb.edu.au/infrastructure/research-platform-services/services/data-storage-management). 

In some cases it's possible to integrate these resources with your account on Spartan to streamline your workflow. [Get in touch](mailto:hpc-support@unimelb.edu.au) if you'd like to find out more for your particular application.
