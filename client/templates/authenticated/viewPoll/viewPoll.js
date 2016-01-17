Template.viewPoll.onCreated(function() {

  Template.instance().subscribe( 'singlePoll',
    FlowRouter.getParam('pollId') );
  Template.instance().subscribe( 'singlePollStances',
    FlowRouter.getParam('pollId') );

});

Template.viewPoll.onRendered(function () {

  var dataMapping = {}, index = 0, loadingData = true;

  var ctx = $("#pollBarChart").get(0).getContext("2d");
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


  Stances.find({
    pollId: FlowRouter.getParam('pollId')
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


  window.bar = pollBarChart;

});

Template.viewPoll.helpers({
  pollTitle: function () {
    var poll = Polls.findOne();
    return poll && poll.title;
  },
  pollSubtitle: function () {
    var poll = Polls.findOne();
    return poll && poll.subtitle;
  }
});
