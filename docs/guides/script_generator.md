# Job script generator for Slurm
This page generates job scripts for Spartan, which uses the <a href="https://slurm.schedmd.com/">Slurm</a> workload manager. It isn't intended to cover every option available, just a little help to get you started with some of the possibilities and how the syntax works.

Enter the details of your job in the form below and then click on the <a href="#makescript">make script</a> button below.

This utility is adapted from work by Bernie Pope, Ben Moran and Lev Lafayette.

<form>


<div>
    <label for="name">Job Name: </label>
    <input id="name" type="text" class="form-control">
    <p  class="form-text text-muted">
      It is a good idea to give your job a meaningful name. This will help you identify it when listing the job queue.
    </p>
</div>

<div>
    <label for="projectid">Project ID: </label>
    <input id="projectid" type="text" class="form-control">
    <p class="form-text text-muted">
      Specify the project ID to which this job should be attributed. For example, UOM1234 or VR1234.
    </p>
</div>

<div>
    <label for="projectid">Job Type: </label>
    <select id="jobtype">
        <option value="single" selected="selected">Single Core</option>
        <option value="multithreaded">Multithreaded (SMP)</option>
        <option value="mpi">MPI, single or multiple node</option>
    </select>
</div>
<div class="modal__dialog" id="jobtype-modal">
        <strong>Single Core</strong>
        <p>Suitable for single CPU core jobs only (not parallel). These are allocated to the "cloud" partition.</p>
        <strong>Multithreaded (SMP)</strong>
        <p>Suitable for shared-memory multithreaded jobs. <em>Note</em> these jobs cannot use more than one node and cannot use more cores than the number of cores on a node. These are allocated to the "cloud" partition and are limited to 8 cores.</p>
        <strong>MPI</strong>
        <p>Suitable for distributed parallel jobs that use MPI. May use more than one cluster node. These are allocated to the "physical" partition.</p>
        <strong>Notes</strong>
        <p>If the job submission is more complex that these deliberately restrictive criteria (e.g., SMP jobs with more than 8 cores, MPI jobs with specific node allocations, GPU partition and GRES requirements), then you should be at the stage of writing your own scripts!</p>
</div>
<p class="form-text text-muted">
    Specify whether your job needs one or more cores <a data-modal-target="jobtype-modal" href="#">(more...)</a>
</p>


<div>
    <label for="cores">CPU Cores (total): </label>
    <input id="cores" type="text" class="form-control" value="1">
    <p class="form-text text-muted">
      The maximum number of CPU cores needed by your job.
    </p>
</div>

<div>
    <label for="memory">Required Memory (GB): </label>
    <input id="memory" type="text" class="form-control">
    <div class="modal__dialog" id="memory-modal">
       <strong>Single Core and MPI</strong>
        <p>For Single Core and MPI jobs this specifies the amount of memory allocated to each CPU core requested by the job. The total memory used is equal to the number of cores in the job multiplied by the amount of memory requested. If you leave this blank then your job will be allocated 8 gigabyte per CPU core on the "cloud" partition and 21 gigabytes per core on "physical" partition.</p>
        <p>For example if you request 2 CPU cores and 8GB of memory per core, the total memory used by the job is 16GB.</p>
        <strong>Multithreaded (SMP) jobs</strong>
        <p>For Multithreaded (SMP) jobs this is the total memory allocated for the job, irrespective of the number of CPU cores.</p>
    </div>
    <p class="form-text text-muted">
      Leave this blank to use the default <a data-modal-target="memory-modal" href="#">(more...)</a>
    </p>
</div>

<div>
    <label for="emailaddress">Notification Email: </label>
    <input id="emailaddress" type="text" class="form-control" >
    <input id="emailjobstart" type="checkbox" /> Job Starts<br />
    <input id="emailjobend" type="checkbox" /> Job Ends (Success)<br />
    <input id="emailjobdie" type="checkbox" /> Job Ends (Error)<br />
    <p class="form-text text-muted">
      You can be notified by email when your job starts running or when it ends (either successfully or with an error).
    </p>
</div>

<div>
    <label for="days">Walltime: </label>
    <input id="days" type="text" value="0" class="form-control" /> days
    <input id="hours" type="text" value="1" class="form-control" /> hours
    <input id="minutes" type="text" value="0" class="form-control" /> minutes

    <p class="form-text text-muted">
      Maximum amount of time needed for your job to complete (it will be terminated after this time).
    </p>
</div>

<div>
    <label for="workdir">Directory to run the job from:</label>

    <div class="inline">
        <input checked aria-required="true" id="workdir" value="workdir" name="directory" type="radio" value="yes" data-error="Please make a selection" />
        <label for="workdir">
          <span>The same directory where it is launched</span>
        </label>
     </div>
     <div class="inline">
        <input checked aria-required="true" id="homedir" value="homedir" name="directory" type="radio" value="yes" data-error="Please make a selection" />
        <label for="workdir">
          <span>Home directory</span>
        </label>
     </div>
     <div class="inline">
        <input checked aria-required="true" id="otherdir" value="otherdir" name="directory" type="radio" value="yes" data-error="Please make a selection" />
        <label for="workdir">
          <span>Other</span>
        </label>
        <input id="otherdirname" type="text" />
     </div>

    <div class="modal__dialog" id="dir-modal">
        <p>Each job is run from a given directory on the computer's filesystem - this is called the <em>working directory</em> in Unix terminology.</p>
        <p>You need to set the working directory correctly so that your job can find its input files and generate its output files in the appropriate location. In most cases it is desirable to set this to the directory where the job was launched, but you might also like it to be your home directory, or from some other specific directory on the computer.</p>
        <p>If you specify the directory, it must be an absolute reference (i.e. /home/foo/mydir) or relative to the launch directory.</p>
    </div>
    <p class="form-text text-muted">
        The working directory for your job <a data-modal-target="dir-modal" href="#">(more...)</a>
    </p>
</div>


<div>
    <label for="modules">Modules:</label>
    <textarea id="modules" type="textarea" class="form-control" ></textarea>

    <div class="modal__dialog" id="modules-modal">
       <strong>Single Core and MPI</strong>
         <p>The <em>modules</em> utility sets up your environment paths for particular versions of specified programs. It is possible to use more than one module in your job (just list all the ones you need on separate lines).</p>
         <p>For example to use version <code>3.2</code> of the application <code>foo</code>, which was compiled with <code>gcc</code> version 4.9.2, you should load the module called: <code>foo/3.2-gcc-4.9.2</code></p>
         <p>You can list all available modules on Spartan using the <code>module avail</code> command.</p>
    </div>
    <p class="form-text text-muted">
        List of modules to load for your job, one per line <a data-modal-target="modules-modal" href="#">(more...)</a>
    </p>
</div>


<div>
    <label for="command">Command: </label>
    <textarea id="command" type="text" value="0" class="form-control" ></textarea>


    <p class="form-text text-muted">
      Enter the command (or commands) that you want to run, one per line. Note that MPI jobs need to prefix the command with <em>srun</em>.
    </p>
</div>


<div>
    <input class="button-primary" id="makescript" type="button" value="make script" />
</div>

<div class="row" id="resultswrapper">
    <div id="jobscript">
        <!-- output to be inserted here -->
    </div>
</div>

<div class="row" id="downloadsection" style="display:none">
    <div class="twelve columns" id="downloadlink">
        <a class="button button-primary" id="downloadanchor" download="sbatch-script.txt" href="">Download this script</a>
    </div><!-- downloadlink -->
</div><!-- downloadsection -->

</form>



<script type="text/javascript" src="slurm.js"></script>

