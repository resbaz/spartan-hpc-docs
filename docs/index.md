Spartan is High Performance Computing (HPC) system operated by Research Platform Services (ResPlat) at The University of Melbourne. It combines a high performance bare-metal compute with flexible cloud infrastructure to suit a wide range of use-cases.

If your computing jobs take too long on your desktop computer, or are simply not possible due to a lack of speed and memory, a HPC system like Spartan can help.

## Spartan Daily Weather Report (20180626)
* Utilisation of /projects at 93%, and /home is at 19% (new CephFS partition).
* Spartan is busy, with close to 100% node allocation.
* Many cloud nodes out (111), mainly due to qh2-uom migration and outage.

## Getting Help

### Training

We run regular one-day courses on HPC, shell scripting and parallel programming. ResPlat also offer training in a wide range of other digital tools to accelerate your research. 

Signup here: [http://melbourne.resbaz.edu.au/participate](http://melbourne.resbaz.edu.au/participate)

### Helpdesk

If you can't find an answer here, need advice, or otherwise stuck, you can contact our support team at [hpc-support@unimelb.edu.au](mailto:hpc-support@unimelb.edu.au)

Please submit one topic per ticket. If you require a assistance with a separate matter, compose a new ticket. Do not reply to existing or closed tickets.

For password resets please see [the FAQ](https://dashboard.hpc.unimelb.edu.au/faq/) or contact University Services on +61 3 8344 0999 or ext 40999 or email [service-centre@unimelb.edu.au](mailto:service-centre@unimelb.edu.au).

## Specifications

Spartan has a number of partitions available for general usage. A full list of partitions can be viewed with the command `sinfo -s`.
 
**Cloud**

100 nodes, each with 8 cores and 62 GB of RAM, allocated from the Melbourne node of the Nectar research cloud. This partition is best suited for general-purpose single-node jobs. Multiple node jobs will work, but communication between nodes will be comparatively slow.

**Physical**

21 nodes, each with 12 cores and 251 GB of RAM. Each node is connected by high-speed 56GigE networking with 1.15 µsec latency, making this partition suited to multi-node jobs (e.g. those using OpenMPI).

**GPU**

3 nodes, each with 12 cores, 251 GB of RAM, and four NVidia K80 GPUs. This partition also makes use of high-speed networking.

**GPGPU**
72 nodes, each with four NVIDIA P100 GPUs. See [here](gpu.md) for more details.

**Other Partitions**

There are also special partitions which are outside normal walltime constraints. In particular, `shortcloud` and `shortgpgpu` should be used for quick test cases; the partitions have a maximum time constraint of one hour.

## Citing Spartan

If you use Spartan to obtain results for a publication, we'd appreciate if you'd cite our service, including the DOI below. This makes it easy for us demonstrate research impact, helping to secure ongoing funding for expansion and user support.

`Lev Lafayette, Greg Sauter, Linh Vu, Bernard Meade, "Spartan Performance and Flexibility: An HPC-Cloud Chimera", OpenStack Summit, Barcelona, October 27, 2016. doi.org/10.4225/49/58ead90dceaaa`

## Other Resources

Spartan is just one of many research IT resources offered by The University of Melbourne, or available from other institutions.

**Nectar**

[Nectar](https://nectar.org.au/) is a national initiative to provide cloud-based Infrastructure as a Service (IaaS) resources to researchers. It's based on OpenStack, and allows researchers on-demand access to computation instances, storage, and a variety of application platforms and Virtual Laboratories.

Spartan runs some of it's computation resources in the Nectar cloud.

**Melbourne Bioinformatics**

[Melbourne Bioinformatics](https://www.melbournebioinformatics.org.au/) run two large HPC systems for life sciences researchers.


**Multi-modal Australian ScienceS Imaging and Visualisation Environment (MASSIVE)** 

[MASSIVE](https://www.massive.org.au/) is a HPC system at Monash University and the Australian Synchrotron which is optimized for imaging and visualization. It can run batched jobs, as well as provide a desktop environment for interactive work.

