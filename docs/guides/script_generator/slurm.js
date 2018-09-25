// branding
  var myorganisation = "University of Melbourne"

// these are given initial values in the html document
  var days = $('#days').val();
  var hours = $('#hours').val();
  var minutes = $('#minutes').val();
  var seconds = $('#seconds').val() || '00';
  var memory = $('#memory').val();
  var jobtype = $('#jobtype').val();
  var cores = $('#cores').val();
  var directory = $('#workdir').val()

  var emailJobStart = false;
  var emailJobEnd = false;
  var emailJobDie = false;

  // Write the job script into the HTML document.
  function setJobScript(text) {
   $('#jobscript').html('<h4>The job script:<\/h4><div id="jobCode"><pre><code>' + text + '<\/code><\/pre><\/div>');
  }

  // Add a download link
  function addDownloadLink(text) {
   var encodedtext = btoa(unescape(encodeURIComponent(text)));
   $('#downloadanchor').attr('href','data:text/plain;charset=utf-8;base64,' + encodedtext);
   $('#downloadsection').show();
  }

  // Build up the script from its parts and then write it to the HTML document.
  // The order of the document parts should follow the order of the form
  // elements as closely as possible.
  function makeScript() {
   script = "#!/bin/bash\n# Created by the " + myorganisation + " job script generator for SLURM\n# " + Date() + "\n\n";
   script = setJobType(script);
   script = setName(script);
   script = setPid(script);
   script = setCores(script);
   script = setMemory(script);
   script = setEmail(script);
   script = setWallTime(script);
   script += "# check that the script is launched with sbatch\n";
   script += "if [ \"x$SLURM_JOB_ID\" == \"x\" ]; then\n   echo \"You need to submit your job to the queuing system with sbatch\"\n   exit 1\nfi\n\n";
   script = setDirectory(script);
   script = setModules(script);
   script = setCommand(script);
   setJobScript(script);
   addDownloadLink(script);
  }

  // Convert a number to a string and pad with leading zeros.
  // As seen on Stackoverflow: 
  // http://stackoverflow.com/questions/2998784/how-to-output-integers-with-leading-zeros-in-javascript
  function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

  // Set the walltime section of the script.
  function setWallTime(script) {
   // The values of days, hours, minutes are already sanitised.
   var comment = "# The maximum running time of the job in days-hours:mins:sec\n";
   var command = "#SBATCH --time=" + days + "-" + hours + ":" + minutes + ":" + seconds + "\n\n";
   return script + comment + command;
  }


  // Set the memory section of the script.
  function setMemory(script) {
   // The value of memory is already sanitised.
   // If memory is empty then leave the script unchanged.
   var memoryInMB = parseInt(memory) * 1024;
   if (memory.length != 0) {
      // The value of the jobtype determines how memory is set.
         var comment = "# The amount of memory in megabytes per process in the job:\n";
                 if (jobtype == "multithreaded" || jobtype == "single") {
                        var command = "#SBATCH --mem=" + memoryInMB + "\n";
                 } else if (jobtype == "mpi") {
                        var command = "#SBATCH --mem-per-cpu=" + memoryInMB + "\n";
                 } else {
                        // unknown job type, just ignore it, user should have selected from drop down list
                        var command = "\n";
                 }
         return script + comment + command + "\n";
   }
   else
      return script;
  }

  // Set the email section of the script.
  function setEmail(script) {
   // check if any specific email events were requested.
   if (emailJobStart || emailJobEnd || emailJobDie) {
      // Build up the comment and command based on the settings.
      script += "# Send yourself an email when the job:\n";
      if (emailJobDie) {
         script += "# aborts abnormally (fails)\n";
         script += "#SBATCH --mail-type=FAIL\n";
      }
      if (emailJobStart) {
         script += "# begins\n";
         script += "#SBATCH --mail-type=BEGIN\n";
      }
      if (emailJobEnd) {
         script += "# ends successfully\n";
         script += "#SBATCH --mail-type=END\n";
      }
      script += "\n";
   }
   // Check if an email address was specified.
   var address = sanitiseString($("#emailaddress").val());
   if (address.length != 0) {
      var addressComment = "# Use this email address:\n";
      var addressCommand = "#SBATCH --mail-user=" + address + "\n\n";
      script += addressComment + addressCommand;
   }
   return script;
  }

  // set the project ID (account) of the job
  function setPid(script) {
   // Sanitise the project ID
   var pid = sanitiseString($('#projectid').val());
   if (pid.length != 0) {
      var comment = "# The project ID which this job should run under:\n";
      var command = '#SBATCH --account="' + pid + '"\n\n';
      return script + comment + command;
   }
   else
      return script;
  }

  // Set the job name section of the script.
  function setName(script) {
   // Sanitise the job name 
   var name = sanitiseString($('#name').val());
   if (name.length != 0) {
      var comment = "# The name of the job:\n";
      var command = '#SBATCH --job-name="' + name + '"\n\n';
      return script + comment + command;
   }
   else
      return script;
  }

  // Set the CPU cores section of the script.
  function setCores(script) {
   var comment = "# Maximum number of tasks/CPU cores used by the job:\n";
   if (jobtype == "single") {
      var command = "#SBATCH --ntasks=1\n#SBATCH --cpus-per-task=1\n"
   } else if (jobtype == "multithreaded") {
      var command = "#SBATCH --ntasks=1\n#SBATCH --cpus-per-task=" + cores + "\n";
   } else if (jobtype == "mpi") {
      var command = "#SBATCH --ntasks=" + cores + "\n";
   } else {
      // unknown job type, just ignore it, user should have selected from drop down list
      var command = "\n";
   }
   return script + comment + command + '\n';
  }

  // Set the jobtype section of the script.
  function setJobType(script) {
   // The value of jobtype is determined by a select box.
   var comment = "# Partition for the job:\n";
   if (jobtype == "multithreaded" || jobtype == "single" ) {
      var comment2 = "# Multithreaded (SMP) job: must run on one node and the cloud partition\n";
      var command = "#SBATCH --partition=cloud\n\n";
      var command2 = "#SBATCH --nodes=1\n\n"
      return script + comment + command + comment2 + command2;
   } else {
      var command = "#SBATCH --partition=physical\n\n";
      return script + comment + command;
   }
  }

  // Set the directory section of the script.
  // XXX perhaps we should use the -d flag of PBS?
  function setDirectory(script) {
   // The value of directory is determined by a radio button.
   if (directory == "homedir") {
      var comment = "# Run the job from your home directory:\n";
      return script + comment + "cd $HOME\n\n";
   }
   else if (directory == "workdir") {
      var comment = "# Run the job from the directory where it was launched (default)\n\n";
      return script + comment;
   }
   // Allow the user to specify their directory explicitly.
   else if (directory == "otherdir") {
      var otherDirName = sanitiseString($('#otherdirname').val());
      if (otherDirName.length != 0) {
         var comment = "# Run the job from this directory:\n";
         return script + comment + "cd " + otherDirName + "\n\n";
      }
      else
         return script;
   }
  }

  // Set the modules section of the script.
  function setModules(script) {
   // don't clean the string here, we do it on the split lines
   var command = $('#modules').val();

   if (command.length != 0) {
      var comment = "# The modules to load:\n";
      // Split the modules into lines so we can prefix "module load" on the front of each.
      var lines = command.split('\n');
      var newScript = script + comment;
      $.each(lines, function (index, value) {
         value = sanitiseString(value);
         if (value.length != 0) {
            if ((/^module load/).test(value)) {
               newScript += value + '\n';
            }
            else {
               newScript += 'module load ' + value + '\n';
            }
         }
      });
      return newScript + '\n';
   }
   else
      return script;
  }

  // Set the command section of the script.
  function setCommand(script) {
   // don't trim the string
   var command = escapeHTML($('#command').val());

   if (command.length != 0) {
      var comment = "# The job command(s):\n";
      return script + comment + command;
   }
   else
      return script;
  }

  // Check if a string is a positive integer.
  function isInt(n) {
   var reInt = new RegExp(/^\d+$/);
   if (!reInt.test(n)) {
      return false;
   }
   return true;
  }

  // Check if a string is empty or an integer
  function isEmptyOrInt (str) {
   return (str.length == 0 || isInt(str));
  }

  // Validate an object's value.
  function validateAndUpdate(obj, validator, updater, def) {
   // Don't sanitise here, leave it to the validator
   var value = obj.val();
   if (validator(value)) {
      updater(value);
      obj.css("background-color","#FFFFFF");
   }
   else {
       obj.val(def);
       obj.css("background-color","#FF2222");
   }
  }

  // trim off whitespace and escape HTML
  function sanitiseString(str) {
    return escapeHTML(str.trim());
  }

  // I can't believe there isn't a standard way in Javascript to do this:
  function escapeHTML(str)
  {
   return jQuery('<pre>').text(str).html();
  }

  // Event handlers

  $('#days').change(function () {
   validateAndUpdate ($(this), isInt, function (x) { days = x; }, '0')
  });
  $('#hours').change(function () {
   validateAndUpdate ($(this), isInt, function (x) { hours = x; }, '0')
  });
  $('#minutes').change(function () {
   validateAndUpdate ($(this), isInt, function (x) { minutes = x; }, '0')
  });
  $('#seconds').change(function () {
    validateAndUpdate ($(this), isInt, function (x) { seconds = x; }, '0')
  });
  $('#memory').change(function () {
    validateAndUpdate ($(this), isEmptyOrInt, function (x) { memory = x; }, '')
  });
  $('#jobtype').change(function () {
    jobtype = $(this).val();
    if (jobtype == 'single') {
        $('#coressection').hide();
        $('#coressectionheading').hide();
    }
    if (jobtype == 'mpi' || jobtype == 'multithreaded') {
        $('#coressection').show();
        $('#coressectionheading').show();
    }
  });
  $('#cores').change(function () {
   validateAndUpdate ($(this), isInt, function (x) { cores = x; }, '1')
  });
  $('#workdir').change(function () {
    directory = $(this).val();
  });
  $('#homedir').change(function () {
    directory = $(this).val();
  });
  $('#otherdir').change(function () {
    directory = $(this).val();
  });
  $('#makescript').click(function () {
   makeScript();
   window.scrollTo(0,document.body.scrollHeight);
  });
  $('#emailjobstart').change(function () {
   emailJobStart = !emailJobStart;
  });
  $('#emailjobend').change(function () {
   emailJobEnd = !emailJobEnd;
  });
  $('#emailjobdie').change(function () {
   emailJobDie = !emailJobDie;
  });

  // attach the click handlers to each of the help buttons
  var helpNames = ["name", "projectid", "jobtype", "cores", "memory", "time", "dir", "command", "modules", "email"];

  $.each(helpNames, function(index, value) {
   $('#show' + value + "help").click(function () {
        var buttonLabel = $(this).val();
        if (buttonLabel == "help") {
           $(this).val("hide help");
       }
       else {
           $(this).val("help");
       }
        $('#' + value + "help").toggle();
   });
  });
