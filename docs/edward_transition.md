# Edward to Spartan : A Short Transition Guide

## When is Edward Being Retired?

Edward, the University of Melbourne's general purpose High Performance Computer (HPC), has been operating since 2011, replacing the even older Alfred system. As of May 13th, Edward has run for a total compute time 19,810,086 hours over 1,260,177 jobs, serving 864 researchers over 368 projects.

Edward will operate until November 2016, when the MOAB license expires and will be replaced by Spartan for general purpose HPC tasks. No new software will be installed on Edward.


## How is Spartan Different?

Spartan is a hybrid HPC/Cloud system. The design is the result of a thorough review of usage on the Edward system which revealed that it was being used for large numbers of single-core (76.35%) and low memory (96.83% under 4GB) of jobs. As a result, the new Spartan system will have a large number (c4000 cores, with 16 cores per node) from the NeCTAR Research cloud as one partition, and a much smaller traditional HPC "physical" partition.

Spartan uses the lmod modules system instead of the traditional tcl-based modules system. In nearly all cases the same commands apply.

However, Spartan will also use Simple Linux Utility for Resource Management (SLURM) for job management, whereas Edward used Terascale Open-source Resource and QUEue Manager (TORQUE), as the resource manager and Moab for job scheduling.

This means that job scripts will be different between the two systems and translation will be required.


## How do we submit jobs in SLURM?

Job submission in SLURM is conceptual identical in SLURM as it in PBS and the structure is very similar as well. Setup and launch consists of writing a short script that initially makes resource requests (walltime, processors, memory, queues) and then commands (loading modules, changing directories, running executables against datasets etc), and optionally checking queueing system.

Core command for checking queue is: showq (TORQUE) or squeue (SLURM)

Core command for job submission is qsub< [jobscript] (TORQUE), or sbatch [jobscript] (SLURM)


## What About Working Directories and Environments?

TORQUE jobs must include cd $PBS_O_WORKDIR to change to the directory where they were launched. SLURM jobs do not require this.

TORQUE jobs do not parse the user's environment to the compute node by default; the #$PBS -V command is required. SLURM does this by default.


## What about Job Status and Output?

Core command for checking job qstat [jobid] (TORQUE), checkjob [jobid] (Moab), squeue -j [jobid] (SLURM), detailed command scontrol show job [jobid] (SLURM) Core command for deleting job qdel [jobid] (TORQUE), scancel [jobid] (SLURM)

Both TORQUE and Slurm provide error and output files (combined into one by default in SLURM, like the `-j oe` option in PBS).


## What are the user command differences?

| User Command      | TORQUE (Edward)       | SLURM (Spartan)       |
| ------------      | ---------------       | ---------------       |    
| Job submission    | qsub [script_file]    | sbatch [script_file]  |
| Job delete        | qdel [job_id]         | scancel [job_id]      |
| Job status        | qstat [job_id]        | squeue [job_id]       |
| Job status        | qstat -u [user_name]  | squeue -u [user_name] |
| Node list         | pbsnodes -a           | sinfo -N              |
| Queue list        | qstat -Q              | squeue                |
| Cluster status    | showq                 | qstatus -a            |

## What are the job command differences?

| Job Specification     | TORQUE (Edward)           | SLURM (Spartan)               |
| -----------------     | ---------------           | ---------------               |
| Script directive      | #PBS                      | #SBATCH                       |
| Queue                 | -q [queue]                | -p [queue]                    |
| Job Name              | -N [name]                 | --job-name=[name]             |
| Nodes                 | -l nodes=[count]          | -N [min[-max]]                |
| CPU Count             | -l ppn=[count]            | -n [count]                    |
| Wall Clock Limit      | -l walltime=[hh:mm:ss]    | -t [days-hh:mm:ss]            | 
| Event Address         | -M [address]              | --mail-user=[address]         |
| Event Notification    | -m abe                    | --mail-type=[events]          |
| Memory Size           | -l mem=[MB]               | --mem=[mem][M G T]            |
| Proc Memory Size      | -l pmem=[MB]              | --mem-per-cpu=[mem][M G T]    |


## What are the environment commands differences?

| Environment       | Command TORQUE (Edward) | SLURM (Spartan)      |
| -----------       | ----------------------- | ---------------      |
| Job ID            | $PBS_JOBID              | $SLURM_JOBID         |
| Submit Directory  | $PBS_O_WORKDIR          | $SLURM_SUBMIT_DIR    |
| Submit Host       | $PBS_O_HOST             | $SLURM_SUBMIT_HOST   |
| Node List         | $PBS_NODEFILE           | $SLURM_JOB_NODELIST  |
| Job Array         | Index $PBS_ARRAYID      | $SLURM_ARRAY_TASK_ID |


## Automation and Acknowledgements

There is a git repository for converting PBS to SLURM: https://github.com/bjpop/pbs2slurm

This guide was written by Lev Lafayette for Research Platforms, University of Melbourne. Version 0.2, June 30 , 2016
