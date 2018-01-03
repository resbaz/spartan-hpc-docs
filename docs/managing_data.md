
Chances are you need to run your HPC job against a dataset, perhaps quite a sizable one. There are a number of places to store data on Spartan while you're working with it, and ways to get data in and out.

## Not for Long-Term Storage
While it's often essential to have fast nearby storage while working on your data, don't use Spartan as your long-term data repository. It's not designed for that, may not conform to the requirements set by your institution or funding body, and we don't guarantee to store your data indefinitely (though we certainly won't get rid of it without asking you first). 

## Data Storage and Tools
Research Platforms has a dedicated team of experts to assist in you in [data tools and storage](http://research.unimelb.edu.au/infrastructure/research-platform-services/services/data-storage-management).

## Where to Store Your Data on Spartan

**Projects Directory**

Your projects directory is the best place to store research data while you're working on it. It's located at `/data/projects/myprojectname`.

Others in your project can access it, and 500 GB of storage is available per project. If you need more than this, [get in touch](mailto:hpc-support@unimelb.edu.au) and we'll try to find a solution.

**Home Directory**

Your home directory, i.e. `/home/yourusername` can be used to store small amounts of data, however this is generally discouraged. It's best suited to short-lived and non-critical data, for example while working through our [getting started](getting_started.md) tutorial or testing out new software.

Others in your project won't have access, and you're limited to 50GB of storage.


**Scratch Space**

You can store temporary working data while your job is running at `/scratch/`. This is handy if your job generates large files while it's running that you don't need to keep. Total scratch space is limited to 8TB, shared among all users.



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

**VicNode**

VicNode provides data storage that can be mounted on Spartan. It's then very easy to transfer files back and fourth as needed. [Contact us](mailto:hpc-support@unimelb.edu.au) with details of the VicNode resources you'd like to mount, and we can arrange this for you.

