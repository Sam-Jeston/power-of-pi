$(document).ready(function() {

  // Perform the daily get on page load and load the chart js
  var dailyGet = function() {
    $.get('/api/daily', function(res) {
      chartConfig(res);
    });
  }
  dailyGet();

  var weeklyGet = function() {
    $.get('/api/weekly', function(res) {
      chartConfig(res);
    });
  }

  var monthlyGet = function() {
    $.get('/api/monthly', function(res) {
      chartConfig(res);
    });
  }

  var currentConditions = function() {
    $.get('/api/current', function(res) {
      $('#brisCurrent').html(res.Brisbane);
      $('#sydCurrent').html(res.Sydney);
      $('#canCurrent').html(res.Canberra);
      $('#melCurrent').html(res.Melbourne);
      $('#hobCurrent').html(res.Hobart);
      $('#darCurrent').html(res.Darwin);
      $('#adlCurrent').html(res.Adelaide);
      $('#prtCurrent').html(res.Perth);
    })
  }
  currentConditions();


  $('#weatherSelect').change(function() {
    var selected = $('#weatherSelect option:selected').text();

    switch(selected) {
      case 'Daily':
        dailyGet();
        break;
      case 'Weekly':
        weeklyGet();
        break;
      case 'Monthly':
        monthlyGet();
        break;
    }
  });
})

var chartConfig = function(res) {
  // Create data sets for each city and create the labels
  var cits = ['brisbane', 'sydney', 'melbourne', 'canberra', 'hobart', 'darwin', 'adelaide', 'perth']

  var chartData = [];
  var cityTemps = [];

  // Loop each city and extract the relevant data from the res
  for (var i = 0; i < cits.length; i++) {
    var city = cits[i];
    var cityTemps = [];
    for (var j = 0; j < res.length; j++) {
      cityTemps.push(res[j][city])
    }
    chartData.push(cityTemps)
  }

  // Loop the res and extract the time
  var labels = []
  for (var j = 0; j < res.length; j++) {
    labels.push(moment(res[j]['date']).fromNow())
  }

  var data = {
    labels: labels.reverse(),
    datasets: [{
      label: "Brisbane",
      strokeColor: "#5C802E",
      pointColor: "#5C802E",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "#5C802E",
      data: chartData[0].reverse()
    }, {
      label: "Sydney",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: chartData[1].reverse()
    }, {
      label: "Melbourne",
      strokeColor: "#105B63",
      pointColor: "#105B63",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "#105B63",
      data: chartData[2].reverse()
    }, {
      label: "Canberra",
      strokeColor: "#FFD34E",
      pointColor: "#FFD34E",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "#FFD34E",
      data: chartData[3].reverse()
    }, {
      label: "Hobart",
      strokeColor: "#002F2F",
      pointColor: "#002F2F",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "#002F2F",
      data: chartData[4].reverse()
    }, {
      label: "Darwin",
      strokeColor: "#DB9E36",
      pointColor: "#DB9E36",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "#DB9E36",
      data: chartData[5].reverse()
    }, {
      label: "Adelaide",
      strokeColor: "#046380",
      pointColor: "#046380",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "#046380",
      data: chartData[6].reverse()
    }, {
      label: "Perth",
      strokeColor: "#BD4932",
      pointColor: "#BD4932",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "#BD4932",
      data: chartData[7].reverse()
    }]
  };

  var opts = {datasetFill : false, pointDot : false}

  // Remove the old chart
  $('#chartContainer').empty();
  $('#chartContainer').append('<canvas id="canvas" width="800" height="600"></canvas>');

  // Create new chat
  var ctx = $('#canvas').get(0).getContext("2d");
  var dailyData = new Chart(ctx).Line(data, opts);
  $('.legend').html(dailyData.generateLegend());
}
