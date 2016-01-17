Template.barChart.onCreated(function() {

  Template.instance().subscribe( 'singlePollStances',
    Template.instance().data._id );

});

Template.barChart.onRendered(function () {
  var pollId = Template.instance().data._id;

  var dataMapping = {}, index = 0, loadingData = true;

  var ctx = $("#barChart-"+pollId).get(0).getContext("2d");
  var pollBarChart = new Chart(ctx).Bar({
    labels: ["Loading!"],
    datasets: [{
      fillColor: "rgba(220,220,220,0.5)",
      strokeColor: "rgba(220,220,220,0.8)",
      highlightFill: "rgba(220,220,220,0.75)",
      highlightStroke: "rgba(220,220,220,1)",
      data: [1]
    }]
  }, {});


  Template.instance().pollHandle = Stances.find({
    pollId: pollId
  }).observeChanges({
    added: function (id, stance) {
      if (dataMapping[id] !== undefined)
        return;

      dataMapping[id] = index++;
      pollBarChart.addData([stance.votes.count], stance.stance);

      if (loadingData) {
        loadingData = false;
        pollBarChart.removeData();
      }
    },
    changed: function (id, stance) {
      pollBarChart.datasets[0].bars[dataMapping[id]].value = stance.votes.count;
      pollBarChart.update();
    }
  });

});

Template.barChart.onDestroyed(function () {
  Template.instance().pollHandle.stop();
});
