
## Availability 
*Is Spartan operating normally?*

<a href="https://spartanhpc.statuspage.io/" target="_blank">
    <span class="color-dot"></span>
    <span class="color-description"></span>
</a>

## Current Usage
*How busy is Spartan today?*

<p>
<iframe width="700" height="400" frameborder="0" scrolling="no" src="//plot.ly/~spartan_hpc/5.embed?link=false"></iframe>
</p>

<ul class="accordion">
  <li>
<span class="accordion__title">How to Interpret</span>
<div class="accordion__hidden">
<ul>
<li>This plot provides indicates how many CPUs (cores) are in-use on Spartan.</li>
<li>Utilization may occasionally exceed 100% as resources are added/removed from service (utilization is always relative to the most recent available CPU count).</li>
</ul>
</div>
</li>
</ul>

## Wait Time
*How long will my job take to start?*

<div id="graph" style="width: 50%; margin: 0 auto;"></div>

<div class="container">
  <div class="row" style="width:50%; margin: 0 auto;">
    <div class="col-sm">
      Partition: <select id="partitionSelect" class="alt"></select>
    </div>
    <div class="col-sm">
      CPUs Requested: <select id="coreSelect" class="alt"></select>
    </div>
    <div class="col-sm">
      Wall Time: <select id="wallTimeSelect" class="alt"></select>
    </div>
  </div>
</div>

<br/>

<ul class="accordion">
  <li>
<span class="accordion__title">How to Interpret</span>
<div class="accordion__hidden">
<ul>
<li>This plot provides data on how long previous jobs have taken to start, which can be used as guidance on how long your job might take to start.</li>
<li>Note however that "Past performance is no guarantee of future results"; wait times can fluctuate quickly due to changes in usage or outages, and wait time could be considerably more or less than the historic average.</li>
<li>Daily averages are shown, but points may be missing for days where there were no jobs matching the selected characteristics.</li>
</ul>
</div>
</li>
</ul>



<script>
var sp = new StatusPage.page({ page: 'zxld2sws8c9x'});

sp.summary({
  success: function(data) {
    // adds the text description to the dropdown
    $('.color-description').text(data.status.description);
    // appends the status indicator as a class name so we can use the right color for the status light thing
    $('.color-dot').addClass(data.status.indicator);
  }
});
</script>

<script>

    window.onload = function() {

        Plotly.d3.json("https://swift.rc.nectar.org.au:8888/v1/AUTH_5634a7ad82ad49579e4192f4db90191f/spartan_metrics/wait_time.json" + '?' + Math.floor(Math.random() * 1000), function (data) {

            function assignOptions(options, selector) {
                $.each(options, function (val, text) {
                    selector.append(
                        $('<option></option>').val(text).html(text)
                    );
                });
            }

            function updatePlot() {
                var graphData = [
                    {   x: data['data'][wallTimeSelect.val()][partitionSelect.val()][coreSelect.val()]['x'],
                        y: data['data'][wallTimeSelect.val()][partitionSelect.val()][coreSelect.val()]['y'],
                        text: 'hours',
                        mode: 'markers',
                        hoverinfo: 'x+text+y',
                        marker: {
                            size: 10
                        },
                        name: 'Daily Average'
                    },
                    {
                        x: data['data'][wallTimeSelect.val()][partitionSelect.val()][coreSelect.val()]['x'],
                        y: data['data'][wallTimeSelect.val()][partitionSelect.val()][coreSelect.val()]['y_rolling_average'],
                        hoverinfo: 'none',
                        line: {
                            color: 'rgb(150, 150, 150)',
                            width: 1,
                            dash: 'dash'
                        },
                        name: 'Rolling 14d Mean'
                    }
                ];

                var layout = {
                    title: 'Job Wait Time',
                    width: 700,
                    height: 400,
                    yaxis: {
                        title: 'Hours',
                        hoverformat: '.2f hours'
                    },
                    legend: {
                        x: 0.5, 
                        y: 1.2,
                        orientation: 'h',
                        xanchor: 'center',
                    }
                };
                Plotly.newPlot('graph', graphData, layout);
            }

            var partitionSelect = $('#partitionSelect');
            var coreSelect = $('#coreSelect');
            var wallTimeSelect = $('#wallTimeSelect');

            // Populate drop-down options
            assignOptions(data['options']['partitions'], partitionSelect);
            assignOptions(data['options']['cores'], coreSelect);
            assignOptions(data['options']['wall_times'], wallTimeSelect);

            // Attach listeners
            partitionSelect.change(updatePlot);
            coreSelect.change(updatePlot);
            wallTimeSelect.change(updatePlot);

            // Build initial plot
            updatePlot()

        });
    }


</script>

