Template.barChart.onCreated(function() {

  var pollId = this.data._id;

  PollSubs.subscribe('singlePollStances', pollId);

});

Template.barChart.onRendered(function () {
  var pollId = this.data._id;


  //Width and height
  var w = 600;
  var h = 250;

  var xScale = d3.scale.ordinal()
          .rangeRoundBands([0, w], 0.05);

  var yScale = d3.scale.linear()
          .range([0, h]);

  //Define key function, to be used when binding data
  var key = function(d) {
    return d._id;
  };

  //Create SVG element
  var svg = d3.select("#viewPoll-"+this.pollId)
        .attr("width", w)
        .attr("height", h);

  Deps.autorun(function(){
    if (!PollSubs.ready()) {
      return;
    }

    var modifier = {fields:{"votes.count":1, "stance":1}};

    var dataset = Stances.find({pollId: pollId},modifier).fetch();

    console.log(dataset);
    window.svg = svg;
    window.dataset = dataset;

    //Update scale domains
    xScale.domain(d3.range(dataset.length));
    yScale.domain([0, d3.max(dataset, function(d) { return d.votes.count; })]);

    //Select…
    var bars = svg.selectAll("rect")
      .data(dataset, key);

    //Enter…
    bars.enter()
      .append("rect")
      .attr("x", w)
      .attr("y", function(d) {
        return h - yScale(d.votes.count);
      })
      .attr("width", xScale.rangeBand())
      .attr("height", function(d) {
        return yScale(d.votes.count);
      })
      .attr("fill", function(d) {
        return "rgb(0, 0, " + (d.votes.count * 10) + ")";
      })
      .attr("data-id", function(d){
        return d._id;
      });

    //Update…
    bars.transition()
      // .delay(function(d, i) {
      //  return i / dataset.length * 1000;
      // }) // this delay will make transistions sequential instead of paralle
      .duration(500)
      .attr("x", function(d, i) {
        return xScale(i);
      })
      .attr("y", function(d) {
        return h - yScale(d.votes.count);
      })
      .attr("width", xScale.rangeBand())
      .attr("height", function(d) {
        return yScale(d.votes.count);
      }).attr("fill", function(d) {
        return "rgb(0, 0, " + (d.votes.count * 10) + ")";
      });

    //Exit…
    bars.exit()
      .transition()
      .duration(500)
      .attr("x", -xScale.rangeBand())
      .remove();



    //Update all labels

    //Select…
    var labels = svg.selectAll("text")
      .data(dataset, function (d) {
        return d.stance;
      });

    //Enter…
    labels.enter()
      .append("text")
      .text(function(d) {
        return d.stance;
      })
      .attr("text-anchor", "middle")
      .attr("x", w)
      .attr("y", function(d) {
        return h - yScale(d.votes.count) + 14;
      })
       .attr("font-family", "sans-serif")
       .attr("font-size", "11px")
       .attr("fill", "white");

    //Update…
    labels.transition()
      // .delay(function(d, i) {
      //  return i / dataset.length * 1000;
      // }) // this delay will make transistions sequential instead of paralle
      .duration(500)
      .attr("x", function(d, i) {
        return xScale(i) + xScale.rangeBand() / 2;
      }).attr("y", function(d) {
        return h - yScale(d.votes.count) + 14;
      }).text(function(d) {
        return d.stance;
      });

    //Exit…
    labels.exit()
      .transition()
      .duration(500)
      .attr("x", -xScale.rangeBand())
      .remove();

      console.log("here");
  });


});
