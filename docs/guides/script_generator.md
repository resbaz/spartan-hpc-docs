

<div class="container">

	<div class="row" id="homeimage">
		<div class="twelve columns" id="homeimageinner">
		</div><!-- homeimageinner -->
	</div><!-- homeimage -->

	<div class="row" id="title">
		<h1 class="twelve columns">Job script generator for Slurm</h1>
	</div><!-- title -->

	<div class="row" id="intro">
		<p class="twelve columns">This page generates job scripts for the <a href="https://slurm.schedmd.com/">Slurm Workload manager</a>. Enter the details of your job in the form below and then click on the <a href="#makescript">make script</a> button below.</p>
	</div><!-- intro -->

	<div class="row" id="jobnameheading">
		<strong class="twelve columns">Job Name</strong>
	</div><!-- jobnameheading -->

	<div class="row" id="jobname">
		<input class="eight columns" id="name" type="text" value="" />
		<input class="four columns" id="shownamehelp" type="button" value="help" />
	</div><!-- jobname -->

	<div class="helpbox row" id="namehelp" style="display:none">
		<div class="twelve columns helpboxtext">
			<p>It is a good idea to give your job a meaningful name. This will help you identify it when listing the job queue.</p>
		</div><!-- helpboxtext -->
	</div><!-- namehelp -->

	<div class="row" id="projectidheading">
		<strong class="twelve columns">Project ID</strong>
	</div><!-- projectidheading -->

	<div class="row" id="projectidsection">
		<input class="eight columns" id="projectid" type="text" value="" />
		<input class="four columns" id="showprojectidhelp" type="button" value="help" />
	</div><!-- projectid -->

	<div class="helpbox row" id="projectidhelp" style="display:none">
		<div class="twelve columns helpboxtext">
			<p>Specify the project ID to which this job should be attributed. For example, UOM1234 or VR1234.</p>
		</div><!-- helpboxtext -->
	</div><!-- pidhelp -->

	<div class="row" id="jobtypeheading">
		<strong class="twelve columns">Job Type</strong>
	</div><!-- jobtypeheading -->

	<div class="row" id="jobtypesettings">
		<select class="eight columns" id="jobtype">
			<option value="single">Single Core</option>
			<option value="multithreaded">Multithreaded (SMP)</option>
			<option value="mpi">MPI, single or multiple node</option>
		</select>
		<input class="four columns" id="showjobtypehelp" type="button" value="hide help" />
	</div><!-- jobtypesettings -->

	<div class="helpbox row" id="jobtypehelp">
		<div class="twelve columns helpboxtext">
			<strong>Single Core</strong>
			<p>Suitable for single CPU core jobs only (not parallel). These are allocated to the "cloud" partition.</p>
			<strong>Multithreaded (SMP)</strong>
			<p>Suitable for shared-memory multithreaded jobs. <em>Note</em> these jobs cannot use more than one node and cannot use more cores than the number of cores on a node. These are allocated to the "cloud" partition and are limited to 8 cores.</p>
			<strong>MPI</strong>
			<p>Suitable for distributed parallel jobs that use MPI. May use more than one cluster node. These are allocated to the "physical" partition.</p>
			<strong>Notes</strong>
			<p>If the job submission is more complex that these deliberately restrictive criteria (e.g., SMP jobs with more than 8 cores, MPI jobs with specific node allocations, GPU partition and GRES requirements), then you should be at the stage of writing your own scripts!</p>
		</div><!-- helpboxtext -->
	</div><!-- jobtypehelp -->

	<div class="row" id="coressectionheading" style="display:none">
		<strong class="twelve columns">CPU Cores (total)</strong>
	</div><!-- coressection -->

	<div class="row" id="coressection" style="display:none">
		<input class="eight columns numinput" id="cores" type="text" value="1" />
		<input class="four columns" id="showcoreshelp" type="button" value="help" />
	</div><!-- coressection -->

	<div class="helpbox row" id="coreshelp" style="display:none">
		<div class="twelve columns helpboxtext">
			<p>Enter the maximum number of CPU cores needed by your job.</p>
		</div><!-- helpboxtext -->
	</div><!-- coreshelp -->

	<div class="row" id="memoryingbheading">
		<strong class="twelve columns">Memory in Gigabytes</strong>
	</div><!-- memoryingbheading -->

	<div class="row" id="memoryingb">
		<input class="eight columns numinput" id="memory" type="text" />
		<input class="four columns" id="showmemoryhelp" type="button" value="help" />
	</div><!-- memoryingb -->

	<div class="helpbox row" id="memoryhelp" style="display:none">
		<div class="twelve columns helpboxtext">
			<strong>Single Core and MPI</strong>
			<p>For Single Core and MPI jobs this specifies the amount of memory allocated to each CPU core requested by the job. The total memory used is equal to the number of cores in the job multiplied by the amount of memory requested. If you leave this blank then your job will be allocated 8 gigabyte per CPU core on the "cloud" partition and 21 gigabytes per core on "physical" partition.</p>
			<p>For example if you request 2 CPU cores and 8GB of memory per core, the total memory used by the job is 16GB.</p>
			<strong>Multithreaded (SMP) jobs</strong>
			<p>For Multithreaded (SMP) jobs this is the total memory allocated for the job, irrespective of the number of CPU cores.</p>
		</div><!-- helpboxtext -->
	</div><!-- memoryhelp -->

	<div class="row" id="emailheading">
		<strong class="twelve columns">Email</strong>
	</div><!-- emailheading -->

	<div class="row" id="emailsettings">
		<div class="four columns" id="emailevents">
			<p>Send yourself an email when the job:</p>
			<input id="emailjobstart" type="checkbox" />&nbsp;starts running<br />
			<input id="emailjobend" type="checkbox" />&nbsp;ends successfully<br />
			<input id="emailjobdie" type="checkbox" />&nbsp;ends with an error<br />
		</div><!-- emailevents -->
		<div class="four columns" id="emailaddressdiv">
			Use this email address:<br />
			<input id="emailaddress" type="text" />
		</div><!-- emailaddressdiv -->
		<input class="four columns" id="showemailhelp" type="button" value="help" />
	</div><!-- emailsettings -->

	<div class="helpbox row" id="emailhelp" style="display:none">
		<div class="twelve columns helpboxtext">
			<p>You can be notified by email when your job starts running or when it ends (either successfully or with an error).</p>
			<p>You can specify an address to receive the email. If you leave it blank the email will be sent to the address registered with your user account.</p>
		</div><!-- helpboxtext -->
	</div><!-- emailhelp -->

	<div class="row" id="walltimeheading">
		<strong class="twelve columns">Walltime</strong>
	</div><!-- walltimeheading -->

	<div class="row" id="walltimedays">
		<span class="two columns">Days</span>
		<input class="six columns numinput" id="days" type="text" value="0" />
	</div><!-- walltimedays -->

	<div class="row" id="walltimehours">
		<span class="two columns">Hours</span>
		<input class="six columns numinput" id="hours" type="text" value="1" />
	</div><!-- walltimehours -->

	<div class="row" id="walltimeminutes">
		<span class="two columns">Minutes</span>
		<input class="six columns numinput" id="minutes" type="text" value="0" />
		<input class="four columns" id="showtimehelp" type="button" value="help" />
	</div><!-- walltimeminutes -->

	<div class="helpbox row" id="timehelp" style="display:none">
		<div class="twelve columns helpboxtext">
			<p>Enter the maximum amount of time needed by your whole job.</p>
		</div><!-- helpboxtext -->
	</div><!-- timehelp -->

	<div class="row" id="directorysettingsheading">
		<strong class="twelve columns">Directory</strong>
	</div><!-- directorysettingsheading -->

	<div class="row" id="directorysettings">
		<div class="eight columns" id="runfrom">
			<p>Run the job from:</p>
			<input checked="CHECKED" id="workdir" name="directory" type="radio" value="workdir" />
			The same directory where it is launched.<br />
			<input id="homedir" name="directory" type="radio" value="homedir" />
			Your home directory.<br />
			<input id="otherdir" name="directory" type="radio" value="otherdir" />
			The directory with this name:
			<input id="otherdirname" type="text" />
		</div><!-- runfrom -->
		<input class="four columns" id="showdirhelp" type="button" value="help" />
	</div><!-- directorysettings -->

	<div class="helpbox row" id="dirhelp" style="display:none">
		<div class="helpboxtext">
			<p>Each job is run from a given directory on the computer's filesystem - this is called the <em>working directory</em> in Unix terminology.</p>
			<p>You need to set the working directory correctly so that your job can find its input files and generate its output files in the appropriate location.</p>
			<p>In most cases it is desirable to set this to the directory where the job was launched, but you might also like it to be your home directory, or from some other specific directory on the computer.</p>
			<p>If you specify the directory, it must be an absolute reference (i.e. /home/foo/mydir) or relative to the launch directory.</p>
		</div><!-- helpboxtext -->
	</div><!-- dirhelp -->

	<div class="row" id="moduleslistheading">
		<div class="twelve columns" id="modulesheadinginner">
			<strong>Modules</strong>
			<p>Enter the modules that you would like to load:</p>
		</div>
	</div><!-- moduleslistheading -->

	<div class="row" id="moduleslist">
		<textarea class="eight columns" id="modules"></textarea>
		<input class="four columns" id="showmoduleshelp" type="button" value="help" />
	</div><!-- moduleslist -->

	<div class="helpbox row" id="moduleshelp" style="display:none">
		<div class="twelve columns helpboxtext">
			<p>The <em>modules</em> utility sets up your environment paths for particular versions of specified programs. It is possible to use more than one module in your job (just list all the ones you need on separate lines).</p>
			<p>For example to use version <code>3.2</code> of the application <code>foo</code>, which was compiled with <code>gcc</code> version 4.9.2, you should load the module called:</p>
			<p><code>foo/3.2-gcc-4.9.2</code></p>
		</div><!-- helpboxtext -->
	</div><!-- moduleshelp -->

	<div class="row" id="commandheading">
		<strong class="twelve columns">Command</strong>
	</div><!-- commandheading -->

	<div class="row" id="commandlist">
		<textarea class="eight columns" id="command"></textarea>
		<input class="four columns" id="showcommandhelp" type="button" value="help" />
	</div><!-- commandlist -->

	<div class="helpbox row" id="commandhelp" style="display:none">
		<div class="twelve columns helpboxtext">
			<p>Enter the command (or commands) that you want to run, one per line.</p>
			<p>Note that MPI jobs need to prefix the command with <em>srun</em>.</p>
		</div><!-- helpboxtext -->
	</div><!-- commandhelp -->

	<div class="row" id="finaljobscript">
		<div class="twelve columns" id="finaljobscriptinner">
			<strong>The job script</strong>
			<p>Select the button to make your script. If you change any of the values in the form above you can re-generate the script by selecting the button again.</p>
			<input class="button-primary" id="makescript" type="button" value="make script" />
		</div><!-- finaljobscriptinner -->
	</div><!-- finaljobscript -->

	<div class="row" id="resultswrapper">
		<div class="twelve columns" id="jobscript">
			<!-- output to be inserted here -->
		</div><!-- jobscript -->
	</div><!-- resultswrapper -->

	<div class="row" id="downloadsection" style="display:none">
		<div class="twelve columns" id="downloadlink">
			<a class="button button-primary" id="downloadanchor" download="sbatch-script.txt" href="">Download this script</a>
		</div><!-- downloadlink -->
	</div><!-- downloadsection -->

	<script type="text/javascript" src="slurm.js"></script>
</div><!-- container -->

