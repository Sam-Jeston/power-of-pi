$(document).ready(function() {
  // Perform the daily get on page load
  $.get('/api/daily', function(res) {
    $('#daily-data').html(data);
  })
})