$(document).ready(function() {
  // Perform the daily get on page load
  $.get('http://localhost:3000', function(res) {
    $('#daily-data').html(data);
  })
})