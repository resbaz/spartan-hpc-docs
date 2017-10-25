
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

## Wait Time
*How long will my job take to start?*


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

